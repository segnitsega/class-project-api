import User from "../model/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import DonationRequest from "../model/donationRequest.model.js";
import { uploadToCloudinary } from "../utils/cloudinary.util.js";

export const createUser = async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ message: "Email already in use" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const user = await User.create({ name, email, password: hashedPassword });
    const { password, refreshToken: _, ...userData } = user.toObject();
    const accessToken = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );
    const refreshToken = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: "7d" }
    );
    await User.findByIdAndUpdate(user._id, { refreshToken });
    return res.status(201).json({
      message: "user successfully created",
      user: userData,
      accessToken,
      refreshToken,
    });
  } catch (e) {
    return res.status(400).json({ message: e.message });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const { password: _, refreshToken: _rt, ...userData } = user.toObject();

    const accessToken = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );
    const refreshToken = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: "7d" }
    );
    await User.findByIdAndUpdate(user._id, { refreshToken });

    return res.json({
      message: "Login successful",
      user: userData,
      accessToken,
      refreshToken,
    });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    const usersData = [];
    users.map((user) => {
      const { password, refreshToken, ...userData } = user.toObject();
      usersData.push(userData);
    });
    return res.json({ length: usersData.length, users: usersData });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};

export const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const { password, refreshToken, ...userData } = user.toObject();
    return res.json(userData);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};

export const handleDonationRequest = async (req, res) => {
  try {
    const {
      itemName,
      itemType,
      numberOfItems,
      description,
      street,
      city,
      region,
      latitude,
      longitude,
    } = req.body;
    const userId = req.user.id;
    let profilePictureUrl = "";
    let address = {
      street,
      city,
      region,
      location: {
        latitude,
        longitude,
      },
    };

    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    const checkUser = await User.findById(userId);
    if (!checkUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const publicId = `donation_item${Date.now()}_${Math.round(
      Math.random() * 1e6
    )}`;
    const result = await uploadToCloudinary(req.file.buffer, publicId);
    profilePictureUrl = result.secure_url;

    const savedRequest = await DonationRequest.create({
      userId,
      itemName,
      itemType,
      numberOfItems,
      description,
      imageUrl: profilePictureUrl,
      address,
    });
    return res.status(201).json({
      message: "Donation request created successfully",
      donationRequest: savedRequest,
    });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};

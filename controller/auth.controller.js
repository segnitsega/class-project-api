import jwt from "jsonwebtoken";

export const authController = (req, res) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Access denied. No token provided.",
      });
    }
    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);

    const newAccessToken = jwt.sign({id: decoded.id, email: decoded.email}, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ message: "Token refreshed successfully", newAccessToken });
  } catch (e) {
    return res.status(401).json({ message: "Invalid or expired refresh token." });
  }
}
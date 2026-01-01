import mongoose from "mongoose";

const ngoShema = new mongoose.Schema(
  {
    organization_name: {
      type: String,
      required: true,
      unique: true,
    },
    license_number: {
      type: String,
      required: true,
      unique: true,
    },
    about: String,
    registrationNumber: {
      type: String,
      required: true,
      unique: true,
    },
    contact: {
      email: String,
      phone: {
        type: String,
        required: true,
      },
      website: String,
    },
    address: {
      street: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      country: {
        type: String,
        required: true,
      },
      latitude: {
        type: Number,
        required: true,
      },
      longitude: {
        type: Number,
        required: true,
      },
    },
    logoUrl: String,
    isVerified: Boolean,
    isActive: Boolean,
  },
  { timestamps: true }
);

export default mongoose.model("Organization", ngoShema);

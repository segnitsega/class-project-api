import mongoose from "mongoose";
 
const donationRequestSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    itemName: {
      type: String,
      required: true,
      trim: true,
    },
    numberOfItems: {
      type: Number,
      required: true,
      default: 1,
    },
    description: {
      type: String,
      required: true,
    },

    imageUrl: {
      type: String,
      required: true,
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
      region: {
        type: String,
        required: true,
      },

      location: {
        latitude: {
          type: Number,
          required: true,
        },
        longitude: {
          type: Number,
          required: true,
        },
      },
    },

    status: {
      type: String,
      enum: ["pending", "completed"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("DonationRequest", donationRequestSchema);

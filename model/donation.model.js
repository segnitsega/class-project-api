import mongoose from "mongoose";

const donatedItemSchema = new mongoose.Schema(
  {
    donationRequestId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DonationRequest",
      required: true,
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    organizationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organization",
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    imageUrl: {
      type: String,
      required: true,
    },

    // Original donation location (optional, for analytics)
    address: {
      street: String,
      city: String,
      country: String,
      location: {
        type: {
          type: String,
          enum: ["Point"],
          default: "Point",
        },
        coordinates: {
          type: [Number],
          required: false,
        },
      },
    },

    donatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("DonatedItem", donatedItemSchema);

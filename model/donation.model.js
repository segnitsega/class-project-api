import mongoose from "mongoose";

const donatedItemSchema = new mongoose.Schema(
  {
    donationRequest: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DonationRequest",
      required: true,
    },

    organization: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organization",
      required: true,
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
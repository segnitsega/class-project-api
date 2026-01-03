import express from "express";
import {
  getDonationRequests,
  getDonatedItems,
  getOrganizations,
  handleDonationApproval,
  handleNgoRegistration
} from "../controller/admin.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";
import { isAdmin } from "../utils/admin.checker.util.js";

export const router = express.Router();

router.use(verifyToken, isAdmin);
router.get("/donation-requests", getDonationRequests);

router.get("/donated-items", getDonatedItems);

router.get("/orgs", getOrganizations);

router.put("/accept-donation", handleDonationApproval)

router.post("/register-orgs", handleNgoRegistration)
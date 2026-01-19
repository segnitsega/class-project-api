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

/**
 * @swagger
 * /admin/donation-requests:
 *   get:
 *     summary: Get all donation requests
 *     tags:
 *       - Admin
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Donation requests fetched successfully
 *       404:
 *         description: No donation Requests
 *       500:
 *         description: Internal Server Error
 */
router.get("/donation-requests", getDonationRequests);

/**
 * @swagger
 * /admin/donated-items:
 *   get:
 *     summary: Get all donated items
 *     tags:
 *       - Admin
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Donated items fetched successfully
 *       404:
 *         description: No items donated
 *       500:
 *         description: Internal Server Error
 */
router.get("/donated-items", getDonatedItems);

/**
 * @swagger
 * /admin/orgs:
 *   get:
 *     summary: Get all registered organizations
 *     tags:
 *       - Admin
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Organizations fetched successfully
 *       404:
 *         description: No organization found
 *       500:
 *         description: Internal Server Error
 */
router.get("/orgs", getOrganizations);

/**
 * @swagger
 * /admin/accept-donation:
 *   put:
 *     summary: Approve a donation request
 *     tags:
 *       - Admin
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: donationReqId
 *         required: true
 *         schema:
 *           type: string
 *         description: Donation request ID
 *       - in: query
 *         name: orgId
 *         required: true
 *         schema:
 *           type: string
 *         description: Organization ID
 *     responses:
 *       200:
 *         description: Donation Request Approved
 *       404: 
 *         description: Donation request or Organization not found
 *       500:
 *         description: Internal Server Error
 */
router.put("/accept-donation", handleDonationApproval)

/**
 * @swagger
 * /admin/register-orgs:
 *   post:
 *     summary: Register a new organization (NGO)
 *     tags:
 *       - Organizations
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - organization_name
 *               - license_number
 *               - registrationNumber
 *               - phone
 *               - street
 *               - city
 *               - region
 *               - latitude
 *               - longitude
 *             properties:
 *               organization_name:
 *                 type: string
 *               license_number:
 *                 type: string
 *               registrationNumber:
 *                 type: string
 *               about:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               phone:
 *                 type: string
 *               website:
 *                 type: string
 *               street:
 *                 type: string
 *               city:
 *                 type: string
 *               region:
 *                 type: string
 *               latitude:
 *                 type: string
 *               longitude:
 *                 type: string
 *               logoUrl:
 *                 type: string
 *               isVerified:
 *                 type: boolean
 *               isActive:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Organization registered successfully
 *       500:
 *         description: Internal server error
 */
router.post("/register-orgs", handleNgoRegistration)
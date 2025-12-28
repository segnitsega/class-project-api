import express from "express";
import { authController } from "../controller/auth.controller.js";

const router = express.Router();

/**
 * @swagger
 * /refresh-token:
 *   get:
 *     summary: Refresh Access Token
 *     tags:
 *       - Authentication
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Token refreshed successfully
 *       401:
 *         description: Invalid or expired refresh token
 */
router.get("/", authController);

export { router };
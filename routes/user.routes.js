import express from "express";
import {
  createUserSchemaValidation,
  loginUserSchemaValidation,
  validateDonationRequest,
} from "../middleware/user.validation.js";

import {
  createUser,
  loginUser,
  getUsers,
  getUserById,
  handleDonationRequest,
} from "../controller/user.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/multer.middleware.js";

const router = express.Router();

/**
 * @swagger
 * /users/signup:
 *   post:
 *     summary: Register a new user
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Segni Tsega"
 *               email:
 *                 type: string
 *                 example: "segni@test.com"
 *               password:
 *                 type: string
 *                 minLength: 6
 *                 example: "password123"
 *               role:
 *                 type: string
 *                 example: "user"
 *     responses:
 *       201:
 *         description: User Successfully Created
 *       422:
 *         description: Validation Or Creation Error
 *       400:
 *        description: Email already in use
 */
router.post("/signup", createUserSchemaValidation, createUser);

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Login User
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: "segni@gmail.com"
 *               password:
 *                 type: string
 *                 minLength: 6
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid password
 *       404:
 *         description: User not found
 */
router.post("/login", loginUserSchemaValidation, loginUser);

router.use(verifyToken);

/**
 * @swagger
 * /users/donate:
 *   post:
 *     summary: Create a donation request
 *     tags:
 *       - Donations
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - itemName
 *               - numberOfItems
 *               - description
 *               - street
 *               - city
 *               - region
 *               - latitude
 *               - longitude
 *             properties:
 *               itemName:
 *                 type: string
 *                 example: "T-Shirts"
 *               numberOfItems:
 *                 type: number
 *                 example: 5
 *               description:
 *                 type: string
 *                 example: "Used clothes in good condition"
 *               item:
 *                 type: string
 *                 format: binary
 *                 description: Image of the donated item
 *                 example: "T-Shirts"
 *               street:
 *                 type: string
 *                 example: "Bole Road"
 *               city:
 *                 type: string
 *                 example: "Addis Ababa"
 *               region:
 *                 type: string
 *                 example: "Oromia"
 *               latitude:
 *                 type: string
 *                 example: "9.0192"
 *               longitude:
 *                 type: string
 *                 example: "38.7525"
 *
 *     responses:
 *       201:
 *         description: Donation request created successfully
 *       400:
 *         description: Validation error
 *       401:
 *        description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.post(
  "/donate",
  upload.single("item"),
  validateDonationRequest,
  handleDonationRequest
);

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all users
 *       401:
 *         description: Unauthorized
 */
router.get("/", getUsers);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get a user by ID
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: MongoDB User ID
 *     responses:
 *       200:
 *         description: User found
 *       404:
 *         description: User not found
 *       401:
 *         description: Unauthorized
 */
router.get("/:id", getUserById);

export { router };

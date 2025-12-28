import express from "express";
import {
  createUserSchemaValidation,
  loginUserSchemaValidation,
} from "../middleware/user.validation.js";

import {
  createUser,
  loginUser,
  getUsers,
  getUserById,
} from "../controller/user.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/signup", createUserSchemaValidation, createUser);
router.post("/login", loginUserSchemaValidation, loginUser);

router.use(verifyToken);
router.get("/", getUsers);
router.get("/:id", getUserById);

export { router };

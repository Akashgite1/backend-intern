import { Router } from "express";
import { registerUser, loginUser , profile } from "../controllers/user.controller.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

// Public route: Register user
router.post("/register", registerUser);
router.post("/login", loginUser);

// Protected route: Get user profile
router.get("/profile", verifyJWT, profile);

export default router;

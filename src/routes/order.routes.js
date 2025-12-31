import { Router } from "express";
import { createOrder, listUserOrders } from "../controllers/order.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

// Protected routes
router.post("/order", verifyJWT, createOrder);
router.get("/orders", verifyJWT, listUserOrders);

export default router;

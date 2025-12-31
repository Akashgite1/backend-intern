import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiErrors } from "../utils/ApiErrors.js";
import { ApiResponse } from "../utils/ApiResponce.js";
import { Order } from "../models/order.model.js";

// Create a new order
export const createOrder = asyncHandler(async (req, res) => {
    const { product_name, quantity } = req.body;

    if (!product_name || !quantity) {
        throw new ApiErrors(400, "Product name and quantity are required");
    }

    // Create order linked to logged-in user
    const order = await Order.create({
        product_name,
        quantity,
        user: req.user._id
    });

    return res.status(201).json(
        new ApiResponse(201, order, "Order created successfully")
    );
});

// List orders of the logged-in user
export const listUserOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });

    return res.status(200).json(
        new ApiResponse(200, orders, "User orders fetched successfully")
    );
});

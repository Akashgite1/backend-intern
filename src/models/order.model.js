import mongoose, { Schema } from "mongoose";

const orderSchema = new Schema({
    product_name: {
        type: String,
        required: [true, "Product name is required"],
        trim: true,
    },
    quantity: {
        type: Number,
        required: [true, "Quantity is required"],
        min: [1, "Quantity must be at least 1"]
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, { timestamps: true });

export const Order = mongoose.model("Order", orderSchema);

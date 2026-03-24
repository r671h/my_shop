import mongoose, { models } from "mongoose";

export const OrdersSchema = new mongoose.Schema({
    items: {type: Array, required: true},
    total: {type: Number, required: true},
    createdAt: { type: Date, default: Date.now }
})

export const Orders = models.Orders || mongoose.model("Orders", OrdersSchema);
import mongoose, { models } from "mongoose";

export const CartSchema = new mongoose.Schema({
    productId: { type: Number, required: true },
    title: { type: String, required: true },
    price: {type: Number, required: true},
    image: {type: String, required: true},
    quantity: { type: Number, required: true , default: 1}
})


import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    _id:{type: String, required: true, unique: true},
    title:{type: String, required: true},
    price:{type: Number, required: true},
    image:{type: String, required: true},
    description:{type: String, required: true},
    category:{type: String, required: true}
})

export const Product = mongoose.models.Product || mongoose.model("Product", ProductSchema);
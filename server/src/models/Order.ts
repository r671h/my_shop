import mongoose, { models } from "mongoose";

type Address = {
    _id: string;
    street: string,
    city: string,
    zip: string,
    country: string
};

export const OrdersSchema = new mongoose.Schema({
    items: {type: Array, required: true},
    total: {type: Number, required: false,default: 0},
    createdAt: { type: Date, default: Date.now },
    address: {type: Object, required: true}
})

export const Orders = models.Orders || mongoose.model("Orders", OrdersSchema);
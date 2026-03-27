import { Request, Response } from "express";
import { connectDB } from "../config/db";
import { User } from "../models/User";


export async function getOrders(req: Request,res: Response){
    try {
        const user = await User.findById((req as any).userId);
        if (!user) {
            return res.status(404).json({message: "User not found"});
        };
        res.json(user.orders)
    }
    catch (error) {
        res.status(500).json({message: "Error fetching aorders"});
    }
} 

export async function addOrder(req: Request,res: Response){
    try {
        const {items,total,address,createdAt} = req.body;
        const user = await User.findByIdAndUpdate(
            (req as any).userId,
            {$push: {orders: {items,total,address,createdAt}}},
            {new: true}
        );
        if (!user) return res.status(404).json({message: "User not found"});
        res.json(user.orders);
    }
    catch (error) {
        res.status(500).json({message: "Error adding order"});    
    }
}

export async function deleteOrder(req: Request,res: Response){
    try {
        const user = await User.findByIdAndUpdate(
            (req as any).userId,
            {$pull: {orders: {_id: req.params.id}}},
            {new: true}
        );
        if (!user) return res.status(404).json({error: "User not found"});
        res.json(user.orders);
    }
    catch (error) {
        res.status(500).json({message: "Error deleting order"});
    }
}
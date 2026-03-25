import { Request,Response } from "express";
import { connectDB } from "../config/db";
import { User } from "../models/User";

export async function getCart(req: Request,res: Response){
    try {
        await connectDB();
        const user = await User.findById((req as any).userId);
        if (!user) return res.status(404).json({message: "User not found"});
        res.json({items: user.cart});
    }
    catch (error) {
        res.status(500).json({message: "Error fetching cart"});
    }
}

export async function addToCart(req: Request, res: Response) {
    try {
        await connectDB();
        const { productId, title, price, image } = req.body;
        
        const userCheck = await User.findById((req as any).userId);
        if (!userCheck) return res.status(404).json({ message: "User not found" });

        const existing = userCheck.cart.find((i: any) => i.productId === productId);
        
        let user;
        if (existing) {
            user = await User.findOneAndUpdate(
                { _id: (req as any).userId, "cart.productId": productId },
                { $inc: { "cart.$.quantity": 1 } },
                { new: true }
            );
        } else {
            user = await User.findByIdAndUpdate(
                (req as any).userId,
                { $push: { cart: { productId, title, price, image, quantity: 1 } } },
                { new: true }
            );
        }
        res.json({ items: user.cart });
    } catch (error) {
        res.status(500).json({ message: "Error adding to cart" });
    }
}

export async function removeFromCart(req: Request, res: Response) {
    try {
        await connectDB();
        const productId = Number(req.params.productId);
        const user = await User.findByIdAndUpdate(
            (req as any).userId,
            { $pull: { cart: { productId } } },
            { new: true }
        );
        if (!user) return res.status(404).json({ message: "User not found" });
        res.json({ items: user.cart });
    } catch (error) {
        res.status(500).json({ message: "Error removing from cart" });
    }
}

export async function updateQuantity(req: Request, res: Response) {
    try {
        await connectDB();
        const productId = Number(req.params.productId);
        const { quantity } = req.body;

        let user;
        if (quantity < 1) {
            user = await User.findByIdAndUpdate(
                (req as any).userId,
                { $pull: { cart: { productId } } },
                { new: true }
            );
        } else {
            user = await User.findOneAndUpdate(
                { _id: (req as any).userId, "cart.productId": productId },
                { $set: { "cart.$.quantity": quantity } },
                { new: true }
            );
        }
        if (!user) return res.status(404).json({ message: "User not found" });
        res.json({ items: user.cart });
    } catch (error) {
        res.status(500).json({ message: "Error updating cart" });
    }
}

export async function clearCart(req: Request, res: Response) {
    try {
        await connectDB();
        const user = await User.findByIdAndUpdate(
            (req as any).userId,
            { $set: { cart: [] } },
            { new: true }
        );
        if (!user) return res.status(404).json({ message: "User not found" });
        res.json({ items: user.cart });
    } catch (error) {
        res.status(500).json({ message: "Error clearing cart" });
    }
}
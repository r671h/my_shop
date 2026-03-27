import { Request,Response } from "express";
import { connectDB } from "../config/db";
import { User } from "../models/User";

export async function getCart(req: Request,res: Response){
    try {
        const user = await User.findById((req as any).userId);
        if (!user) return res.status(404).json({message: "User not found"});
        res.json({items: user.cart});
    }
    catch (error) {
        res.status(500).json({message: "Error fetching cart"});
    }
}

export async function addToCart(req: Request,res: Response){
    try {

        const { productId, title, price, image } = req.body;

        const user = await User.findById((req as any).userId);
        if (!user) return res.status(404).json({message: "User not found"});
        
        const existing = user.cart.find((item: any) => item.productId === productId);

        if(existing){
            existing.quantity += 1;
        } else {
            user.cart.push({productId, title, price, image, quantity: 1});
        }

        await user.save();
        res.json({items : user.cart});

    }catch (error) {
        console.error("ERROR:", error);
        res.status(500).json({ message: "Error", detail: String(error) });;
    }
}

export async function removeFromCart(req: Request,res: Response){
    try {
        const user = await User.findById((req as any).userId);
        if (!user) return res.status(404).json({message: "User not found"});
        
        const productId = Number(req.params.productId);
        user.cart = user.cart.filter((item:any) => item.productId !== productId);
        await user.save();
        res.json({items : user.cart});
    }
    catch (error){
        console.error("ERROR:", error);
        res.status(500).json({ message: "Error", detail: String(error) });;
    }
}

export async function updateQuantity(req: Request,res: Response){
    try {
        const productId = Number(req.params.productId);
        const { quantity } = req.body;
        console.log(quantity);
        
        const user = await User.findById((req as any).userId);
        if (!user) return res.status(404).json({message: "User not found"});

        if (quantity < 1) {
            user.cart = user.cart.filter((item:any) => item.productId !== productId);
        }
        else {
            const item = user.cart.find((item: any) => item.productId === productId);
            if (item) item.quantity = quantity;
        }

        await user.save();
        res.json({items : user.cart});
    }
    catch (error){
        console.error("ERROR:", error);
        res.status(500).json({ message: "Error", detail: String(error) });;
    }
}

export async function clearCart(req:Request,res:Response){
    try{
        const user = await User.findById((req as any).userId);
        if(!user) return(res.status(404).json({ error: "user not found"}));

        user.cart = [];
        await user.save();
        res.json({items : user.cart});
    }
    catch(error){
        console.error("ERROR:", error);
        res.status(500).json({ message: "Error", detail: String(error) });
    }
}

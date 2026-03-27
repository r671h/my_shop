import { Request, Response } from "express";
import { connectDB } from "../config/db";
import { User } from "../models/User";


export async function getAddresses(req: Request,res: Response){
    try {
        const user = await User.findById((req as any).userId);
        if (!user) {
            return res.status(404).json({message: "User not found"});
        };
        res.json(user.address)
    }
    catch (error) {
        res.status(500).json({message: "Error fetching addresses"});
    }
} 

export async function addAddress(req: Request,res: Response){
    try {
        const {street,city,zip,country} = req.body;
        const user = await User.findByIdAndUpdate(
            (req as any).userId,
            {$push: {address: {street,city,zip,country}}},
            {new: true}
        );
        if (!user) return res.status(404).json({message: "User not found"});
        res.json(user.address);
    }
    catch (error) {
        res.status(500).json({message: "Error adding address"});    
    }
}

export async function deleteAddress(req: Request,res: Response){
    try {
        const user = await User.findByIdAndUpdate(
            (req as any).userId,
            {$pull: {address: {_id: req.params.id}}},
            {new: true}
        );
        if (!user) return res.status(404).json({error: "User not found"});
        res.json(user.address);
    }
    catch (error) {
        res.status(500).json({message: "Error deleting address"});
    }
}
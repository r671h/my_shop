import { Request,Response } from 'express';
import { Product } from '../models/Product';
import { User } from '../models/User';


export async function getreviews(req: Request,res: Response){
    try {
        const product = await Product.findById(req.params.id);
        if(!product) return res.status(404).json({message: "Product not found"});
        res.status(200).json(product.reviews);
    }
    catch (e){
        res.status(500).json({message: "Server error"});
    }    
}

export async function addReview(req: Request,res: Response){
    try {
        const { rating, comment } = req.body;
        const userId = (req as any).userId;

        const product = await Product.findById(req.params.id);
        if(!product) return res.status(404).json({message: "Product not found"});

        //if user already reviewed
        const existing = product.reviews.find((r: any) => r.userId === userId);
        if(existing) return res.status(400).json({message: "You already reviewed this product"});

        const user = await User.findById(userId);

        product.reviews.push({
            userId,
            userName: user.name,
            rating,
            comment
        });

        const totalRating = product.reviews.reduce((acc: number, r: any) => acc + r.rating, 0);
        product.rating.rate = Math.round((totalRating / product.reviews.length) * 10) / 10;
        product.rating.count = product.reviews.length;

        await product.save();
        res.json(product.reviews);
    }
    catch (e){
        res.status(500).json({message: "Server error"});
    }
}

export async function deleteReview(req: Request,res: Response){
    try {
        const userId = (req as any).userId;
        const product = await Product.findById(req.params.id);
        if(!product) return res.status(404).json({message: "Product not found"});

        product.reviews = product.reviews.filter((r: any) => r._id !== req.params.reviewId);
        
        //upadate rating
        if(product.reviews.length > 0){
            const totalRating = product.reviews.reduce((acc: Number, r: any) => acc + r.rating, 0);
            product.rating.rate = Math.round((totalRating / product.reviews.length) * 10) / 10;
            product.rating.count = product.reviews.length;
        } else {
            product.rating.rate = 0;
            product.rating.count = 0;
        }

        await product.save();
        res.json(product.reviews);
    }
    catch (e){
        res.status(500).json({message: "Server error"});
    }
}
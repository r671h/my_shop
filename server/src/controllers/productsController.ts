import { Request, Response } from "express";
import {Product} from "../models/Product";

export async function getProducts(req:Request, res:Response) {
    try{
        const products = await Product.find()
        res.json(products);
    }
    catch(error){
        console.error("Error fetching products", error);
        res.status(500).json({ message: "Internal server error" });
    };
}

export async function getProductById(req:Request, res:Response) {
    try{
        const product = await Product.findById(req.params.id);
        if(!product) return res.status(404).json({ message: "Product not found" });
        res.json(product);
    }
    catch(error){
        console.error("Error fetching product", error);
        res.status(500).json({ message: "Internal server error" });
    };
}


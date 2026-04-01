import { Product } from "../types";
import axios from "axios"

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL
});

export async function getProducts(): Promise<Product[]> {
    try
        {
        const res = await api.get<Product[]>("/products");
        return res.data;
    } catch(e: any) {
        console.error(`Error `,e.message)
        return []
    }
}

export async function getProduct(id: string): Promise<Product | null> {
    try
        {const res = await api.get<Product>(`/products/${id}`)
        return res.data; 
    } catch(e: any) {
        console.error(`Error `,e.message)
        return null   }
}
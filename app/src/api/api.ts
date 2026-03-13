import { Product } from "../types";
import axios from "axios"

const api = axios.create({
    baseURL: "https://fakestoreapi.com"
});

export async function getProducts(): Promise<Product[]> {
    try
        {const res = await api.get<Product[]>("/products");
        return res.data;
    } catch(e: any) {
        console.error(`Error `,e.message)
        return []
    }
}

export async function getProduct(id:number): Promise<Product | null> {
    try
        {const res = await api.get(`/products/${id}`)
        return res.data; 
    } catch(e: any) {
        console.error(`Error `,e.message)
        return null   }
}
"use client"

import { createContext, useContext, useEffect, useState } from "react";
import { Product } from "../types";
import axios from "axios";
import { useAuth } from "./AuthConext";

type CartItem = {
    productId: number;
    title: string;
    price: number;
    image: string;
    quantity: number;
};

type CartContextType = {
  items: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  isInCart: (id: number) => boolean;
  totalPrice: number;
  totalItems: number;
};

const CartContext = createContext<CartContextType | null>(null);

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL
})

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [items,setItems] = useState<CartItem[]>([]);
    const {token,loading} = useAuth();

    useEffect(() => {
        if(!loading && token){
            fetchCart();
        }
        if(!loading && !token){
            setItems([]);
        }
    },[token,loading]);

    async function fetchCart() {
        try {
            const res = await api.get("/cart",{
            headers:{ Authorization: `Bearer ${token}`}
            });
            setItems(res.data.items || []);
        }
        catch (error: any) {
            console.error("Error fetching cart", error.message);
        }
    }

    const addToCart = async (product: Product) => {
        try{
            const res = await api.post("/cart", {
                productId: product.id,
                title: product.title,
                price: product.price,
                image: product.image
            },{
                headers:{ Authorization: `Bearer ${token}`}
            });
            
            setItems(res.data.items || []);
        }
        catch (error: any) {
            console.error("Error adding to cart", error.message);
            console.error("FULL ERROR:", error)
        }
    };

    const removeFromCart = async (productId: number) => {
        try {
            
            const res = await api.delete(`/cart/${productId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setItems(res.data.items || []);
        }
        catch (error: any) {
            console.error("Error removing from cart", error.message);
            console.error("FULL ERROR:", error)
        }
    };

    const updateQuantity = async (productId: number, quantity: number) => {
        try {
            const res = await api.put(`/cart/${productId}`, { quantity }, {
                headers: { Authorization: `Bearer ${token}`}
            });
            setItems(res.data.items || [])
        }
        catch (error: any) {            
            console.error("Error updating cart", error.message);
            console.error("FULL ERROR:", error)
        }
    };

    const clearCart = async () => {
        try{
            const res = await api.delete(`/cart/clear`,{
                headers: { Authorization : `Bearer ${token}`}
            });
            setItems(res.data.items || []);
        }
        catch (error: any) {
            console.error("Error clearing cart", error.message);
        }
    }

     const isInCart = (id:number) => {
        return items.some(i => i.productId === id);
    }

    const totalPrice = items.reduce((sum, i)=> sum + i.price * i.quantity, 0);
    const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);

    return (
        <CartContext.Provider value={{ items, addToCart, removeFromCart, updateQuantity, clearCart, isInCart, totalPrice, totalItems}}>
            {children}
        </CartContext.Provider>
    );
};

export function useCart() {
    const context = useContext(CartContext);
    if (!context) throw new Error("useCart must be used with a CartProvider");
    return context;
}
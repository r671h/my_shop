"use client"

import { createContext, useContext, useState } from "react";
import { Product } from "../types";

type CartItem = {
  product: Product
  quantity: number
};

type CartContextType = {
  items: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  totalPrice: number;
  totalItems: number;
};

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [items,setItems] = useState<CartItem[]>([]);

    const addToCart = (product: Product) => {
        setItems((prev) => {
            const existing = prev.find(i => i.product.id === product.id);
            if(existing) {
                return prev.map((i)=> i.product.id === product.id
                ? {...i, quanity: i.quantity + 1}
                : i
                );
            }
            return [...prev, { product, quantity: 1 }]
        });
    };

    const removeFromCart = (id: number) => {
        setItems((prev) => prev.filter(i => i.product.id !== id));
    };

    const totalPrice = items.reduce((sum, i)=> sum + i.product.price * i.quantity, 0);
    const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);

    return (
        <CartContext.Provider value={{ items, addToCart, removeFromCart, totalPrice, totalItems}}>
            {children}
        </CartContext.Provider>
    );
};

export function useCart() {
    const context = useContext(CartContext);
    if (!context) throw new Error("useCart must be used with a CartProvider");
    return context;
}
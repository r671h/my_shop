"use client"

import { useCart } from "@/app/src/context/CartContext";
import styles from "./ProductDetails.module.scss";
import { Product } from "@/app/src/types";
import { useAuth } from "@/app/src/context/AuthContext";
import React, { useState } from "react";
import AuthModal from "../../AuthModal/AuthModal";
import Reviews from "../../Reviews/Reviews";
import ProductDetailsSkeleton from "../../Skeleton/ProductDetailsSkeleton/ProductDetailsSkeleton";


export default function ProductDetails({ product }: { product: Product }) {

  if (!product) return <ProductDetailsSkeleton />;
  
    const { isLoggedIn } = useAuth();
    const [showAuthPrompt, setAuthPrompt] = useState(false);

    const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    if (!isLoggedIn) {
      e.preventDefault();
      e.stopPropagation();
      setAuthPrompt(true);
      return;
    }
    addToCart(product);
  };

   return (
    <main className={styles.main}>
      <div className={styles.container}>
        <img
          src={product.image}
          alt={product.title}
          className={styles.image}
        />
        <div className={styles.info}>
          <h1 className={styles.title}>{product.title}</h1>
          <p className={styles.category}>{product.category}</p>
          <p className={styles.description}>{product.description}</p>
          <p className={styles.price}>${product.price}</p>
          <button 
          className={styles.button}
          onClick = {handleAddToCart}
          >Add to Cart</button>
        </div>
      </div>
      <Reviews productId={product._id} />
      <AuthModal isOpen={showAuthPrompt} onClose={() => setAuthPrompt(false)} />

    </main>
  );
}
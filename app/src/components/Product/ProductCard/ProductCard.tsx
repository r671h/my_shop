"use client"
import { Product } from "@/app/src/types";
import styles from "./ProductCard.module.scss";
import Link from "next/link";
import { useCart } from "@/app/src/context/CartContext";
import AuthModal from "../../AuthModal/AuthModal";
import { useAuth } from "@/app/src/context/AuthConext";
import { useState } from "react";

type Props = {
  product: Product;
};

export default function ProductCard({product} : Props) {

  const { isLoggedIn } = useAuth();
  const [showAuthPrompt, setShowAuthPrompt] = useState(false);

  const { addToCart, isInCart, updateQuantity, items } = useCart();
  const cartItem = items.find(i => i.productId === product!.id);
  const quantity = cartItem ? cartItem.quantity : 0;

  const handleClick = (e : React.MouseEvent) => {
    if (!isLoggedIn) {
      e.preventDefault();
      e.stopPropagation();
      setShowAuthPrompt(true);
    };
    isInCart(product!.id) ? updateQuantity(product!.id, quantity+1) : addToCart(product!);
  };
  return (
    
      <div className={styles.card}>
        <Link href={`/pages/products/${product!.id}/`} className={styles.card}>
        <img
          src={product!.image}
          alt={product!.title}
          className={styles.image}
        />
        <h2 className={styles.title}>{product!.title}</h2>
        <p className={styles.price}>${product!.price}</p>
        </Link>
        <button 
          className={styles.button}
          onClick = {handleClick}
          >Add to Cart
        </button>
        <AuthModal isOpen={showAuthPrompt} onClose={() => setShowAuthPrompt(false)} />
      </div>
    
  );
}
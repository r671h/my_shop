"use client"

import { useCart } from "@/app/src/context/CartContext";
import styles from "./ProductDetails.module.scss";
import { Product } from "@/app/src/types";

export default function ProductDetails({ product }: { product: Product }) {
    const { addToCart } = useCart();

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
          onClick = {() => addToCart(product)}
          >Add to Cart</button>
        </div>
      </div>
    </main>
  );
}
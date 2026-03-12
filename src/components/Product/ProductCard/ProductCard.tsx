"use client"
import { Product } from "@/src/types";
import styles from "./ProductCard.module.scss";
import Link from "next/link";
import { useCart } from "@/src/context/CardContext";

type Props = {
  product: Product;
};

export default function ProductCard({ product }: { product: Product }) {

  const { addToCart } = useCart();

  return (
    
      <div className={styles.card}>
        <Link href={`/pages/products/${product.id}/`} className={styles.card}>
        <img
          src={product.image}
          alt={product.title}
          className={styles.image}
        />
        <h2 className={styles.title}>{product.title}</h2>
        <p className={styles.price}>${product.price}</p>
        </Link>
        <button 
          className={styles.button}
          onClick = {() => addToCart(product)}
          >Add to Cart</button>
      </div>
    
  );
}
"use client"
import { Product } from "@/app/src/types";
import styles from "./ProductCard.module.scss";
import Link from "next/link";
import { useCart } from "@/app/src/context/CartContext";

type Props = {
  product: Product;
};

export default function ProductCard({ product }: { product: Product }) {

  const { addToCart, isInCart, updateQuantity, items } = useCart();
  const cartItem = items.find(i => i.productId === product.id);
  const quantity = cartItem ? cartItem.quantity : 0;

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
          onClick = {() => isInCart(product.id) ? updateQuantity(product.id, quantity+1) : addToCart(product)}
          >Add to Cart</button>
      </div>
    
  );
}
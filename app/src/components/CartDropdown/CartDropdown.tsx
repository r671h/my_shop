"use client";

import Link from "next/link";
import styles from "./CartDropdown.module.scss";
import { useCart } from "@/app/src/context/CartContext";

export default function CartDropdown() {
  const { items, totalItems, totalPrice, removeFromCart, updateQuantity } = useCart();

  return (
    <div className={styles.wrapper}>
      <Link href="/pages/cart">
        <span className={styles.cartBtn}>
          Cart {totalItems > 0 && (
            <span className={styles.badge}>{totalItems}</span>
          )}
        </span>
      </Link>

      <div className={styles.dropdown}>
        <p className={styles.title}>Cart</p>

        {items.length === 0 ? (
          <p className={styles.empty}>Cart is empty</p>
        ) : (
          <>
            {items.map(({ product, quantity }) => (
              <div key={product.id} className={styles.item}>
                <img src={product.image} alt={product.title} />
                <div className={styles.itemInfo}>
                  <p>{product.title}</p>
                  <span>${product.price} × {quantity}</span>
                  <div className={styles.quantityControl}>
                    <button onClick={() => updateQuantity(product.id, quantity - 1)}>−</button>
                    <span>{quantity}</span>
                    <button onClick={() => updateQuantity(product.id, quantity + 1)}>+</button>
                  </div>
                </div>
                <button
                className={styles.removeBtn}
                onClick={()=> removeFromCart(product.id)}
                >✕</button>
              </div>
            ))}
            <p className={styles.total}>
              Total: <span>${totalPrice.toFixed(2)}</span>
            </p>
            <Link href="/pages/cart" className={styles.link}>
              View Cart
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
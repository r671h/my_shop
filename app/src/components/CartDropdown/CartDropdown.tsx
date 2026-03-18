"use client";

import Link from "next/link";
import styles from "./CartDropdown.module.scss";
import { useCart } from "@/app/src/context/CartContext";

export default function CartDropdown() {
  const { items, totalItems, totalPrice, removeFromCart, updateQuantity } = useCart();

  return (
    <div className={styles.wrapper}>
      <span className={styles.cartBtn}>
         Cart {totalItems > 0 && (
          <span className={styles.badge}>{totalItems}</span>
        )}
      </span>

      <div className={styles.dropdown}>
        <p className={styles.title}>Cart</p>

        {items.length === 0 ? (
          <p className={styles.empty}>Cart is empty</p>
        ) : (
          <>
            {items.map((item) => (
              <div key={item.productId} className={styles.item}>
                <img src={item.image} alt={item.title} />
                <div className={styles.itemInfo}>
                  <p>{item.title}</p>
                  <span>${item.price} × {item.quantity}</span>
                </div>
                <div className={styles.quantityControl}>
                  <button onClick={() => updateQuantity(item.productId, item.quantity - 1)}>−</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.productId, item.quantity + 1)}>+</button>
                </div>
                <button
                  className={styles.removeBtn}
                  onClick={() => removeFromCart(item.productId)}
                >
                  ✕
                </button>
              </div>
            ))}
            <p className={styles.total}>
              Total: <span>${totalPrice.toFixed(2)}</span>
            </p>
            <Link href="/pages/cart" className={styles.link}>
              Go to Cart
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
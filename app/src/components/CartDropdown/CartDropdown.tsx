"use client";

import Link from "next/link";
import styles from "./CartDropdown.module.scss";
import { useCart } from "@/app/src/context/CartContext";

type Props = {
  onRequireAuth:() => void,
  isLoggedIn: boolean;
}

export default function CartDropdown({isLoggedIn,onRequireAuth}:Props) {
  const { items, totalItems, totalPrice, removeFromCart, updateQuantity } = useCart();

  const handleClick = (e: React.MouseEvent) => {
    if(!isLoggedIn){
      e.preventDefault();
      onRequireAuth();
    }
  }

  return (
  <div className={styles.wrapper}>
      {/* Mobile — just a link */}
      <Link href="/pages/cart" className={styles.mobileLink} onClick={handleClick}>
        Cart {totalItems > 0 && <span className={styles.badge}>{totalItems}</span>}
      </Link>

      {/* Desktop — full dropdown */}
      <div className={styles.desktopWrapper}>
        <Link href="/pages/cart" onClick={handleClick}>
          <span className={styles.cartBtn}>
            Cart {totalItems > 0 && <span className={styles.badge}>{totalItems}</span>}
          </span>
        </Link>

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
                  >✕</button>
                </div>
              ))}
              <p className={styles.total}>
                Total: <span>${totalPrice.toFixed(2)}</span>
              </p>
              <Link href="/pages/cart" className={styles.link} onClick={handleClick}>
                Go to Cart
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
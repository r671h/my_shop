"use client"

import { useCart } from "@/app/src/context/CartContext"
import styles from "./page.module.scss";

export default function CartPage() {
    const {items,removeFromCart,totalItems,totalPrice,updateQuantity} = useCart();

    if (items.length === 0) {
    return (
      <main className={styles.main}>
        <h1 className={styles.title}>Cart</h1>
        <p className={styles.empty}>Your cart is empty.</p>
      </main>
    );
  }

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Cart ({totalItems} Product)</h1>
      <div className={styles.list}>
        {items.map(({ product, quantity }) => (
          <div key={product.id} className={styles.item}>
            <img src={product.image} alt={product.title} className={styles.image} />
            <div className={styles.info}>
              <h2 className={styles.name}>{product.title}</h2>
              <p className={styles.price}>${product.price}</p>
              <p className={styles.quantity}>Quantity: {quantity}</p>

            </div>
            <button
              className={styles.remove}
              onClick={() => removeFromCart(product.id)}
            >
              Delete
            </button>
            <div className={styles.quantityControl}>
                <button onClick={() => updateQuantity(product.id, quantity - 1)}>−</button>
                <span>{quantity}</span>
                <button onClick={() => updateQuantity(product.id, quantity + 1)}>+</button>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.total}>
        Total: <span>${totalPrice.toFixed(2)}</span>
      </div>
    </main>
  );

}
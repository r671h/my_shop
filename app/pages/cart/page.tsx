"use client"

import { useCart } from "@/src/context/CardContext"
import styles from "./page.module.scss";

export default function CartPage() {
    const {items,removeFromCart,totalItems,totalPrice} = useCart();

    if (items.length === 0) {
    return (
      <main className={styles.main}>
        <h1 className={styles.title}>Warenkorb</h1>
        <p className={styles.empty}>Dein Warenkorb ist leer.</p>
      </main>
    );
  }

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Warenkorb ({totalItems} Artikel)</h1>
      <div className={styles.list}>
        {items.map(({ product, quantity }) => (
          <div key={product.id} className={styles.item}>
            <img src={product.image} alt={product.title} className={styles.image} />
            <div className={styles.info}>
              <h2 className={styles.name}>{product.title}</h2>
              <p className={styles.price}>${product.price}</p>
              <p className={styles.quantity}>Menge: {quantity}</p>
            </div>
            <button
              className={styles.remove}
              onClick={() => removeFromCart(product.id)}
            >
              Entfernen
            </button>
          </div>
        ))}
      </div>
      <div className={styles.total}>
        Gesamt: <span>${totalPrice.toFixed(2)}</span>
      </div>
    </main>
  );

}
"use client"

import {useState} from "react"
import CheckoutModal from "@/app/src/components/CheckOutModal/CheckOutModal";

import { useCart } from "@/app/src/context/CartContext"
import styles from "./page.module.scss";

export default function CartPage() {
    const {items,removeFromCart,totalItems,totalPrice,updateQuantity} = useCart();
    const [showCheckout, setShowCheckout] = useState(false);

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
        {items.map(({ productId, title, image, price, quantity }) => (
          <div key={productId} className={styles.item}>
            <img src={image} alt={title} className={styles.image} />
            <div className={styles.info}>
              <h2 className={styles.name}>{title}</h2>
              <p className={styles.price}>${price}</p>
              <p className={styles.quantity}>Quantity: {quantity}</p>

            </div>
            <button
              className={styles.remove}
              onClick={() => removeFromCart(productId)}
            >
              Delete
            </button>
            <div className={styles.quantityControl}>
                <button onClick={() => updateQuantity(productId, quantity - 1)}>−</button>
                <span>{quantity}</span>
                <button onClick={() => updateQuantity(productId, quantity + 1)}>+</button>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.total}>
        Total: <span>${totalPrice.toFixed(2)}</span>
      </div>
      <button
            onClick={() => setShowCheckout(true)}
            style={{
              padding: "12px 32px",
              background: "#111",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              fontSize: "15px",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Buy now
          </button>
          <CheckoutModal
          isOpen={showCheckout}
          onClose={()=> setShowCheckout(false)}
          cartItems={items}
          total={totalItems}
          />
    </main>
  );

}
"use client"

import { useState } from "react"
import CheckoutModal from "@/app/src/components/CheckOutModal/CheckOutModal";
import { useCart } from "@/app/src/context/CartContext"
import styles from "./page.module.scss";

export default function CartPage() {
  const { items, removeFromCart, totalItems, totalPrice, updateQuantity } = useCart();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  if (items.length === 0) {
    return (
      <main className={styles.main}>
        <div className={styles.header}>
          <h1 className={styles.title}>Cart</h1>
        </div>
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>Cart</div>
          <h2 className={styles.emptyTitle}>Your cart is empty</h2>
          <p className={styles.empty}>Add some products to get started.</p>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.main}>
      {/* ── Page Header ─────────────────────────────────── */}
      <div className={styles.header}>
        <h1 className={styles.title}>Cart</h1>
        <span className={styles.itemCount}>{totalItems} item{totalItems !== 1 ? "s" : ""}</span>
      </div>

      {/* ── Two-column layout ────────────────────────────── */}
      <div className={styles.layout}>

        <div className={styles.list}>
          {items.map(({ productId, title, image, price, quantity }) => (
            <div key={productId} className={styles.item}>

              {/* Image */}
              <div className={styles.imageWrap}>
                <img src={image} alt={title} className={styles.image} />
              </div>

              {/* Info */}
              <div className={styles.info}>
                <h2 className={styles.name}>{title}</h2>
                <p className={styles.price}>${price}</p>
              </div>

              {/* Remove */}
              <button
                className={styles.remove}
                onClick={() => removeFromCart(productId)}
                aria-label={`Remove ${title} from cart`}
              >
                ✕
              </button>

              {/* Quantity + Subtotal */}
              <div className={styles.quantityControl}>
                <span className={styles.subtotal}>
                  Subtotal: <span>${(price * quantity).toFixed(2)}</span>
                </span>
                <div className={styles.qtyButtons}>
                  <button
                    onClick={() => updateQuantity(productId, quantity - 1)}
                    aria-label="Decrease quantity"
                  >
                    −
                  </button>
                  <span>{quantity}</span>
                  <button
                    onClick={() => updateQuantity(productId, quantity + 1)}
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* ── Summary Card (desktop / tablet) ─────────────── */}
        <aside className={styles.summary}>
          <h2 className={styles.summaryTitle}>Order Summary</h2>
          <div className={styles.summaryRow}>
            <span>Items ({totalItems})</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
          <div className={styles.summaryRow}>
            <span>Shipping</span>
            <span>Free</span>
          </div>
          <div className={styles.summaryDivider} />
          <div className={styles.summaryTotal}>
            <span>Total</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
          <button
            onClick={() => setIsCheckoutOpen(true)}
            className={styles.btnCheckout}
          >
            Proceed to Checkout
          </button>
        </aside>
      </div>

      {/* ── Sticky Footer (mobile only) ──────────────────── */}
      <div className={styles.stickyFooter}>
        <div className={styles.stickyTotal}>
          <span>Total</span>
          <span>${totalPrice.toFixed(2)}</span>
        </div>
        <button
          onClick={() => setIsCheckoutOpen(true)}
          className={styles.btnCheckout}
        >
          Proceed to Checkout
        </button>
      </div>

      <CheckoutModal isOpen={isCheckoutOpen} onClose={() => setIsCheckoutOpen(false)} />
    </main>
  );
}
"use client";

import { useState } from "react";
import styles from "./CheckOutModal.module.scss";
import Addresses from "../Profile/Addresses/Addresses";
import { useAuth } from "../../context/AuthConext";

interface CartItem {
  productId: number;
  title: string;
  price: number;
  image: string,
  quantity: number;
}

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  total: number;
}

type Step = "delivery" | "payment" | "confirm";

export default function CheckoutModal({
  isOpen,
  onClose,
  cartItems,
  total,
}: CheckoutModalProps) {
  const [step, setStep] = useState<Step>("delivery");
  const [submitted, setSubmitted] = useState(false);
  const {token} = useAuth();
  const [delivery, setDelivery] = useState({
    fullName: "",
    street: "",
    city: "",
    zip: "",
    country: "",
  });

  const [payment, setPayment] = useState({
    method: "card" as "card" | "paypal",
    cardNumber: "",
    expiry: "",
    cvv: "",
    cardHolder: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!isOpen) return null;

  const validateDelivery = () => {
    const e: Record<string, string> = {};
    if (!delivery.fullName.trim()) e.fullName = "Full name is required";
    if (!delivery.street.trim()) e.street = "Street address is required";
    if (!delivery.city.trim()) e.city = "City is required";
    if (!delivery.zip.trim()) e.zip = "ZIP code is required";
    if (!delivery.country.trim()) e.country = "Country is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validatePayment = () => {
    const e: Record<string, string> = {};
    if (payment.method === "card") {
      if (!payment.cardHolder.trim()) e.cardHolder = "Card holder name is required";
      if (!/^\d{16}$/.test(payment.cardNumber.replace(/\s/g, "")))
        e.cardNumber = "Enter a valid 16-digit card number";
      if (!/^\d{2}\/\d{2}$/.test(payment.expiry)) e.expiry = "Format: MM/YY";
      if (!/^\d{3,4}$/.test(payment.cvv)) e.cvv = "Enter 3 or 4 digit CVV";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleDeliveryNext = () => {
    if (validateDelivery()) {
      setErrors({});
      setStep("payment");
    }
  };

  const handlePaymentNext = () => {
    if (validatePayment()) {
      setErrors({});
      setStep("confirm");
    }
  };

  const handlePlaceOrder = () => {
    setSubmitted(true);
  };

  const handleClose = () => {
    setStep("delivery");
    setSubmitted(false);
    setErrors({});
    onClose();
  };

  const formatCardNumber = (val: string) => {
    return val
      .replace(/\D/g, "")
      .slice(0, 16)
      .replace(/(.{4})/g, "$1 ")
      .trim();
  };

  const formatExpiry = (val: string) => {
    const digits = val.replace(/\D/g, "").slice(0, 4);
    if (digits.length >= 3) return digits.slice(0, 2) + "/" + digits.slice(2);
    return digits;
  };

  const stepIndex = { delivery: 0, payment: 1, confirm: 2 }[step];

  return (
    <div className={styles.overlay} onClick={(e) => e.target === e.currentTarget && handleClose()}>
      <div className={styles.modal}>
        {/* Header */}
        <div className={styles.header}>
          <h2 className={styles.title}>Checkout</h2>
          <button className={styles.closeBtn} onClick={handleClose} aria-label="Close">
            ✕
          </button>
        </div>

        {/* Steps */}
        {!submitted && (
          <div className={styles.steps}>
            {["Delivery", "Payment", "Review"].map((label, i) => (
              <div key={label} className={`${styles.step} ${i <= stepIndex ? styles.active : ""}`}>
                <div className={styles.stepDot}>{i + 1}</div>
                <span className={styles.stepLabel}>{label}</span>
                {i < 2 && <div className={`${styles.stepLine} ${i < stepIndex ? styles.done : ""}`} />}
              </div>
            ))}
          </div>
        )}

        {/* Body */}
        <div className={styles.body}>
          {submitted ? (
            <div className={styles.success}>
              <div className={styles.successIcon}>✓</div>
              <h3>Order placed!</h3>
              <p>
                Thank you, <strong>{delivery.fullName}</strong>. Your order will be delivered to{" "}
                <strong>{delivery.street}, {delivery.city}</strong>.
              </p>
              <button className={styles.btnPrimary} onClick={handleClose}>
                Back to shop
              </button>
            </div>
          ) : step === "delivery" ? (
            <div className={styles.form}>
              <h3 className={styles.sectionTitle}>Delivery address</h3>
              <div className={styles.field}>
                <Addresses token={token || ""}></Addresses>
                {errors.country && <span className={styles.error}>{errors.country}</span>}
              </div>
              <div className={styles.actions}>
                <button className={styles.btnSecondary} onClick={handleClose}>
                  Cancel
                </button>
                <button className={styles.btnPrimary} onClick={handleDeliveryNext}>
                  Next: Payment →
                </button>
              </div>
            </div>
          ) : step === "payment" ? (
            <div className={styles.form}>
              <h3 className={styles.sectionTitle}>Payment method</h3>
              <div className={styles.methodToggle}>
                <button
                  className={payment.method === "card" ? styles.methodActive : ""}
                  onClick={() => setPayment({ ...payment, method: "card" })}
                >
                  Credit / Debit card
                </button>
                <button
                  className={payment.method === "paypal" ? styles.methodActive : ""}
                  onClick={() => setPayment({ ...payment, method: "paypal" })}
                >
                  PayPal
                </button>
              </div>

              {payment.method === "card" ? (
                <>
                  <div className={styles.field}>
                    <label>Card holder</label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      value={payment.cardHolder}
                      onChange={(e) => setPayment({ ...payment, cardHolder: e.target.value })}
                    />
                    {errors.cardHolder && <span className={styles.error}>{errors.cardHolder}</span>}
                  </div>
                  <div className={styles.field}>
                    <label>Card number</label>
                    <input
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      value={payment.cardNumber}
                      maxLength={19}
                      onChange={(e) =>
                        setPayment({ ...payment, cardNumber: formatCardNumber(e.target.value) })
                      }
                    />
                    {errors.cardNumber && <span className={styles.error}>{errors.cardNumber}</span>}
                  </div>
                  <div className={styles.row}>
                    <div className={styles.field}>
                      <label>Expiry (MM/YY)</label>
                      <input
                        type="text"
                        placeholder="09/27"
                        value={payment.expiry}
                        maxLength={5}
                        onChange={(e) =>
                          setPayment({ ...payment, expiry: formatExpiry(e.target.value) })
                        }
                      />
                      {errors.expiry && <span className={styles.error}>{errors.expiry}</span>}
                    </div>
                    <div className={styles.field}>
                      <label>CVV</label>
                      <input
                        type="password"
                        placeholder="•••"
                        value={payment.cvv}
                        maxLength={4}
                        onChange={(e) =>
                          setPayment({ ...payment, cvv: e.target.value.replace(/\D/g, "") })
                        }
                      />
                      {errors.cvv && <span className={styles.error}>{errors.cvv}</span>}
                    </div>
                  </div>
                </>
              ) : (
                <div className={styles.paypalNotice}>
                  <p>You will be redirected to PayPal to complete your payment securely.</p>
                </div>
              )}

              <div className={styles.actions}>
                <button className={styles.btnSecondary} onClick={() => setStep("delivery")}>
                  ← Back
                </button>
                <button className={styles.btnPrimary} onClick={handlePaymentNext}>
                  Next: Review →
                </button>
              </div>
            </div>
          ) : (
            <div className={styles.form}>
              <h3 className={styles.sectionTitle}>Order review</h3>

              <div className={styles.reviewSection}>
                <div className={styles.reviewLabel}>
                  Deliver to
                  <button className={styles.editLink} onClick={() => setStep("delivery")}>
                    Edit
                  </button>
                </div>
                <p className={styles.reviewValue}>
                  {delivery.fullName}, {delivery.street}, {delivery.zip} {delivery.city},{" "}
                  {delivery.country}
                </p>
              </div>

              <div className={styles.reviewSection}>
                <div className={styles.reviewLabel}>
                  Payment
                  <button className={styles.editLink} onClick={() => setStep("payment")}>
                    Edit
                  </button>
                </div>
                <p className={styles.reviewValue}>
                  {payment.method === "card"
                    ? `Card ending in ${payment.cardNumber.slice(-4)}`
                    : "PayPal"}
                </p>
              </div>

              <div className={styles.itemsList}>
                {cartItems.map((item) => (
                  <div key={item.productId} className={styles.itemRow}>
                    <span className={styles.itemName}>
                      {item.title} <span className={styles.itemQty}>× {item.quantity}</span>
                    </span>
                    <span className={styles.itemPrice}>
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
                <div className={styles.totalRow}>
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <div className={styles.actions}>
                <button className={styles.btnSecondary} onClick={() => setStep("payment")}>
                  ← Back
                </button>
                <button className={styles.btnPrimary} onClick={handlePlaceOrder}>
                  Place order
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
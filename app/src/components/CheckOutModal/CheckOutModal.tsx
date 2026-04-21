"use client";

import { useState } from "react";
import { useCart } from "@/app/src/context/CartContext";
import { useAddress } from "@/app/src/context/AddressesContext";
import { useOrders } from "@/app/src/context/OrdersContext";
import { useAuth } from "@/app/src/context/AuthContext";
import styles from "./CheckOutModal.module.scss";
import { Address } from "@/app/src/types";

type Step = "delivery" | "payment" | "confirm";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function CheckoutModal({ isOpen, onClose }: Props) {
  const { items, totalPrice, clearCart } = useCart();
  const { addresses,handleAddAddress } = useAddress();
  const { order, handleAddOrder } = useOrders();
  const { user } = useAuth();

  const [step, setStep] = useState<Step>("delivery");
  const [submitted, setSubmitted] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [useNewAddress, setUseNewAddress] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [delivery, setDelivery] = useState({
    fullName: user?.name || "",
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

  if (!isOpen && !submitted) return null;

  const validateDelivery = () => {
    const e: Record<string, string> = {};
    if (!selectedAddress && !useNewAddress) {
      e.address = "Please select an address or enter a new one";
    }
    if (useNewAddress) {
      if (!delivery.street.trim()) e.street = "Street is required";
      if (!delivery.city.trim()) e.city = "City is required";
      if (!delivery.zip.trim()) e.zip = "ZIP is required";
      if (!delivery.country.trim()) e.country = "Country is required";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validatePayment = () => {
    const e: Record<string, string> = {};
    if (payment.method === "card") {
      if (!payment.cardHolder.trim()) e.cardHolder = "Card holder is required";
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

  const handlePlaceOrder = async () => {
    const address = useNewAddress
      ? { _id: "", street: delivery.street, city: delivery.city, zip: delivery.zip, country: delivery.country }
      : selectedAddress!;

    const newOrder = {
      _id: "",
      items: items,
      total: totalPrice,
      address: address,
      createdAt: new Date().toString(),
    };

    await handleAddAddress(address);
    await handleAddOrder(newOrder);
    await clearCart();
    setSubmitted(true);
  };

  const handleClose = () => {
    setStep("delivery");
    setSubmitted(false);
    setErrors({});
    setSelectedAddress(null);
    setUseNewAddress(false);
    onClose();
  };

  const formatCardNumber = (val: string) =>
    val.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();

  const formatExpiry = (val: string) => {
    const digits = val.replace(/\D/g, "").slice(0, 4);
    if (digits.length >= 3) return digits.slice(0, 2) + "/" + digits.slice(2);
    return digits;
  };

  const stepIndex = { delivery: 0, payment: 1, confirm: 2 }[step];

  const finalAddress = useNewAddress
    ? `${delivery.street}, ${delivery.zip} ${delivery.city}, ${delivery.country}`
    : selectedAddress
    ? `${selectedAddress.street}, ${selectedAddress.zip} ${selectedAddress.city}, ${selectedAddress.country}`
    : "";

  return (
    <div className={styles.overlay} onClick={(e) => e.target === e.currentTarget && handleClose()}>
      <div className={styles.modal}>

        {/* Header */}
        <div className={styles.header}>
          <h2 className={styles.title}>Checkout</h2>
          <button className={styles.closeBtn} onClick={handleClose}>✕</button>
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

        <div className={styles.body}>

          {/* Success */}
          {submitted ? (
            <div className={styles.success}>
              <div className={styles.successIcon}>✓</div>
              <h3>Order placed!</h3>
              <p>Thank you, <strong>{user?.name}</strong>. Your order will be delivered to <strong>{finalAddress}</strong>.</p>
              <button className={styles.btnPrimary} onClick={handleClose}>Back to shop</button>
            </div>

          ) : step === "delivery" ? (
            <div className={styles.form}>
              <h3 className={styles.sectionTitle}>Delivery address</h3>

              {/* Saved addresses */}
              {addresses.length > 0 && (
                <div className={styles.savedAddresses}>
                  <p className={styles.savedLabel}>Your saved addresses:</p>
                  {addresses.map((addr) => (
                    <div
                      key={addr._id}
                      className={`${styles.addressOption} ${selectedAddress?._id === addr._id && !useNewAddress ? styles.addressSelected : ""}`}
                      onClick={() => { setSelectedAddress(addr); setUseNewAddress(false); }}
                    >
                      <div className={styles.radioCircle}>
                        {selectedAddress?._id === addr._id && !useNewAddress && <div className={styles.radioDot} />}
                      </div>
                      <span>{addr.street}, {addr.zip} {addr.city}, {addr.country}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* New address toggle */}
              <div
                className={`${styles.addressOption} ${useNewAddress ? styles.addressSelected : ""}`}
                onClick={() => { setUseNewAddress(true); setSelectedAddress(null); }}
              >
                <div className={styles.radioCircle}>
                  {useNewAddress && <div className={styles.radioDot} />}
                </div>
                <span>Enter a new address</span>
              </div>

              {errors.address && <span className={styles.error}>{errors.address}</span>}

              {/* New address form */}
              {useNewAddress && (
                <>
                  <div className={styles.field}>
                    <label>Street</label>
                    <input
                      type="text"
                      placeholder="123 Main St"
                      value={delivery.street}
                      onChange={(e) => setDelivery({ ...delivery, street: e.target.value })}
                    />
                    {errors.street && <span className={styles.error}>{errors.street}</span>}
                  </div>
                  <div className={styles.row}>
                    <div className={styles.field}>
                      <label>City</label>
                      <input
                        type="text"
                        placeholder="Berlin"
                        value={delivery.city}
                        onChange={(e) => setDelivery({ ...delivery, city: e.target.value })}
                      />
                      {errors.city && <span className={styles.error}>{errors.city}</span>}
                    </div>
                    <div className={styles.field}>
                      <label>ZIP</label>
                      <input
                        type="text"
                        placeholder="10115"
                        value={delivery.zip}
                        onChange={(e) => setDelivery({ ...delivery, zip: e.target.value })}
                      />
                      {errors.zip && <span className={styles.error}>{errors.zip}</span>}
                    </div>
                  </div>
                  <div className={styles.field}>
                    <label>Country</label>
                    <select
                      value={delivery.country}
                      onChange={(e) => setDelivery({ ...delivery, country: e.target.value })}
                    >
                      <option value="">Select country…</option>
                      <option>Germany</option>
                      <option>Austria</option>
                      <option>Switzerland</option>
                      <option>United States</option>
                      <option>United Kingdom</option>
                      <option>France</option>
                      <option>Poland</option>
                      <option>Ukraine</option>
                      <option>Netherlands</option>
                      <option>Other</option>
                    </select>
                    {errors.country && <span className={styles.error}>{errors.country}</span>}
                  </div>
                </>
              )}

              <div className={styles.actions}>
                <button className={styles.btnSecondary} onClick={handleClose}>Cancel</button>
                <button className={styles.btnPrimary} onClick={handleDeliveryNext}>Next: Payment →</button>
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
                      onChange={(e) => setPayment({ ...payment, cardNumber: formatCardNumber(e.target.value) })}
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
                        onChange={(e) => setPayment({ ...payment, expiry: formatExpiry(e.target.value) })}
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
                        onChange={(e) => setPayment({ ...payment, cvv: e.target.value.replace(/\D/g, "") })}
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
                <button className={styles.btnSecondary} onClick={() => setStep("delivery")}>← Back</button>
                <button className={styles.btnPrimary} onClick={handlePaymentNext}>Next: Review →</button>
              </div>
            </div>

          ) : (
            <div className={styles.form}>
              <h3 className={styles.sectionTitle}>Order review</h3>

              <div className={styles.reviewSection}>
                <div className={styles.reviewLabel}>
                  Deliver to
                  <button className={styles.editLink} onClick={() => setStep("delivery")}>Edit</button>
                </div>
                <p className={styles.reviewValue}>{finalAddress}</p>
              </div>

              <div className={styles.reviewSection}>
                <div className={styles.reviewLabel}>
                  Payment
                  <button className={styles.editLink} onClick={() => setStep("payment")}>Edit</button>
                </div>
                <p className={styles.reviewValue}>
                  {payment.method === "card"
                    ? `Card ending in ${payment.cardNumber.slice(-4)}`
                    : "PayPal"}
                </p>
              </div>

              <div className={styles.itemsList}>
                {items.map((item) => (
                  <div key={item.productId} className={styles.itemRow}>
                    <span className={styles.itemName}>
                      {item.title} <span className={styles.itemQty}>× {item.quantity}</span>
                    </span>
                    <span className={styles.itemPrice}>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
                <div className={styles.totalRow}>
                  <span>Total</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
              </div>

              <div className={styles.actions}>
                <button className={styles.btnSecondary} onClick={() => setStep("payment")}>← Back</button>
                <button className={styles.btnPrimary} onClick={handlePlaceOrder}>Place order</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
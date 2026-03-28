"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./AuthModal.module.scss";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function AuthModal({ isOpen, onClose }: Props) {
  const router = useRouter();

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleLogin = () => {
    onClose();
    router.push("/pages/auth/login");
  };

  const handleRegister = () => {
    onClose();
    router.push("/pages/auth/register");
  };

  return (
    <div
      className={styles.overlay}
      onClick={(e) => e.target === e.currentTarget && onClose()}
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-prompt-title"
    >
      <div className={styles.modal}>
        <div className={styles.icon}>Cart</div>

        <h2 id="auth-prompt-title" className={styles.title}>
          Sign in to view your cart
        </h2>
        <p className={styles.subtitle}>
          You need an account to add items and place orders.
          It only takes a few seconds!
        </p>

        <div className={styles.actions}>
          <button className={styles.btnLogin} onClick={handleLogin}>
            Log in
          </button>

          <div className={styles.divider}>or</div>

          <button className={styles.btnRegister} onClick={handleRegister}>
            Create an account
          </button>

          <button className={styles.closeBtn} onClick={onClose}>
            Maybe later
          </button>
        </div>
      </div>
    </div>
  );
}
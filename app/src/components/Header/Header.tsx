"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./Header.module.scss";
import CartDropdown from "../CartDropdown/CartDropdown";
import { useAuth } from "../../context/AuthContext";
import AuthModal from "../AuthModal/AuthModal";

export default function Header() {
  const { isLoggedIn, logOut, user } = useAuth();
  const [showAuthPrompt, setShowAuthPrompt] = useState(false);

  const handleCartClick = (e: React.MouseEvent) => {
    if (!isLoggedIn) {
      e.preventDefault();       
      e.stopPropagation();
      setShowAuthPrompt(true);
    }
  
  };

  return (
    <>
      <header className={styles.header}>
        <Link href="/" className={styles.link}>
          <div className={styles.logo}>MyShop</div>
        </Link>

        <nav className={styles.nav}>
          <Link href="/" className={styles.link}>Home</Link>
          <Link href="/pages/about-us" className={styles.link}>About us</Link>

          {isLoggedIn ? (
            <>
              <Link href="/pages/profile" className={styles.link}>
                {user?.name}
              </Link>
              <button className={styles.logoutBtn} onClick={logOut}>
                Logout
              </button>
            </>
          ) : (
            <Link href="/pages/auth/login" className={styles.link}>Login</Link>
          )}

          <div
            onClick={handleCartClick}
            style={!isLoggedIn ? { cursor: "pointer" } : undefined}
          >
            <CartDropdown isLoggedIn={isLoggedIn} onRequireAuth={() => setShowAuthPrompt(true)}/>
          </div>
        </nav>
      </header>

      <AuthModal
        isOpen={showAuthPrompt}
        onClose={() => setShowAuthPrompt(false)}
      />
    </>
  );
}
"use client"
import Link from "next/link";
import styles from "./Header.module.scss";
import { useCart } from "@/app/src/context/CardContext";
import CartDropdown from "../CartDrowdown/CartDropdown";
import { useAuth } from "../../context/AuthConext";

export default function Header() {

    const {isLoggedIn,logOut,user} = useAuth();

    return (
        <header className={styles.header}>
            <div className={styles.logo}>MyShop</div>
             <nav className={styles.nav}>
                <Link href="/" className={styles.link}>Home</Link>
                <Link href="/pages/about-us" className={styles.link}>About us</Link>
                {isLoggedIn ? (
                    <>
                        <Link href="/pages/profile" className={styles.link}>{user?.name}</Link>
                        <button className={styles.logoutBtn} onClick={logOut}>Logout</button>
                    </>
                ):(
                    <>
                        <Link href="/pages/auth/login" className={styles.link}>Login</Link>
                    </>
                )}
                <CartDropdown/>
            </nav>
        </header>
    );
}
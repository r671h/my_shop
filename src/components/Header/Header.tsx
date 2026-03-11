"use client"
import Link from "next/link";
import styles from "./Header.module.scss";
import { useCart } from "@/src/context/CardContext";

export default function Header() {

    const {totalItems} = useCart();

    return (
        <header className={styles.header}>
            <div className={styles.logo}>MyShop</div>
             <nav className={styles.nav}>
                <Link href="/" className={styles.link}>Home</Link>
                <Link href="/pages/about-us" className={styles.link}>About us</Link>
                <Link href="/pages/products" className={styles.link}>Products</Link>
                <Link href="/pages/cart" className={styles.link}>
                {totalItems > 0 && <span className={styles.badge}>{totalItems}</span>}
                </Link>
            </nav>
        </header>
    );
}
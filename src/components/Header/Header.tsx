import Link from "next/link";
import styles from "./Header.module.scss";

export default function Header() {
    return (
        <header className={styles.header}>
            <div className={styles.logo}>MyShop</div>
             <nav className={styles.nav}>
                <Link href="/" className={styles.link}>Home</Link>
                <Link href="/pages/about-us" className={styles.link}>About us</Link>
                <Link href="/pages/products" className={styles.link}>Products</Link>
            </nav>
        </header>
    );
}
import styles from "./Footer.module.scss";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p className={styles.text}>
        © 2026 MyShop — All rights reserved. Developed by Ruslan Hryshchenko. Powered by Next.js.
      </p>
    </footer>
  );
}
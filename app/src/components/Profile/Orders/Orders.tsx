import styles from "@/app/pages/profile/page.module.scss";

export default function Orders() {
  return (
    <div className={styles.card}>
      <h2 className={styles.cardTitle}>Order History</h2>
      <p className={styles.empty}>No orders yet.</p>
    </div>
  );
}
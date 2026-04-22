import styles from "./ProductsSkeleton.module.scss";

export default function ProductsSkeleton() {
  return (
    <div className={styles.card}>
      <div className={styles.image} />
      <div className={styles.title} />
      <div className={styles.titleShort} />
      <div className={styles.price} />
      <div className={styles.button} />
    </div>
  );
}
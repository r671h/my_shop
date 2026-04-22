import styles from "./ProductSkeleton.module.scss";

export default function ProductSkeleton() {
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
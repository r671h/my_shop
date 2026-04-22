import styles from "../../Product/ProductDetails/ProductDetails.module.scss";

export default function ProductDetailsSkeleton() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={`${styles.image} ${styles.skeleton}`} />

        <div className={styles.info}>
          <div className={`${styles.title} ${styles.skeleton}`} />
          <div className={`${styles.category} ${styles.skeleton}`} />
          <div className={`${styles.description} ${styles.skeleton}`} />
          <div className={`${styles.price} ${styles.skeleton}`} />
          <div className={`${styles.button} ${styles.skeleton}`} />
        </div>
      </div>

      <div className={styles.reviewsSkeleton}>
        <div className={styles.skeleton} />
        <div className={styles.skeleton} />
        <div className={styles.skeleton} />
      </div>
    </main>
  );
}
import { Product } from "@/src/types";
import styles from "./ProductCard.module.scss";
import Link from "next/link";

type Props = {
  product: Product;
};

export default function ProductCard({ product }: Props) {
  return (
    <Link href={`/pages/products/${product.id}/`} className={styles.card}>
      <div className={styles.card}>
        <img
          src={product.image}
          alt={product.title}
          className={styles.image}
        />
        <h2 className={styles.title}>{product.title}</h2>
        <p className={styles.price}>${product.price}</p>
        <button className={styles.button}>In den Warenkorb</button>
      </div>
    </Link>
  );
}
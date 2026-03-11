
import { getProducts } from "../src/api/api";
import ProductCard from "../src/components/ProductCard/ProductCard";
import styles from "./page.module.scss";

export default async function Home() {
  const products = await getProducts();

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>My Online Shop</h1>
      <div className={styles.grid}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
}
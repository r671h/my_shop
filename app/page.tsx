
import { getProducts } from "../src/api/api";
import ProductCard from "../src/components/Product/ProductCard/ProductCard";
import styles from "./page.module.scss";
import ProductList from "@/src/components/Product/ProductList/ProductList";

export default async function Home() {
  const products = await getProducts();

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>My Online Shop</h1>
      <ProductList products={products} />
    </main>
  );
}
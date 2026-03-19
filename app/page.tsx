
import { getProducts } from "./src/api/api";
import ProductCard from "./src/components/Product/ProductCard/ProductCard";
import styles from "./page.module.scss";
import ProductList from "@/app/src/components/Product/ProductList/ProductList";

export default async function Home() {

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>My Online Shop</h1>
      <ProductList/>
    </main>
  );
}
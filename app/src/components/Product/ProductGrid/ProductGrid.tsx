import { Product } from "@/app/src/types";
import ProductCard from "@/app/src/components/Product/ProductCard/ProductCard";
import styles from "./ProductGrid.module.scss";

type Props = {
  products: Product[];
};

export default function ProductGrid({ products }: Props) {
  if (products.length === 0) {
    return <p className={styles.empty}>No products found.</p>;
  }


  return (
    <div className={styles.grid}>
      {products.map((product) => (
        <ProductCard key={product._id} product= {product} />
      ))}
    </div>
  );
}
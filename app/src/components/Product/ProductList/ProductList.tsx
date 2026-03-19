"use client"
import {Product} from "@/app/src/types";
import { useState } from "react";
import ProductGrid from "../ProductGrid/ProductGrid";
import Sidebar from "../../SideBar/SideBar";
import styles from "./ProductList.module.scss";
import { useEffect } from "react";
import { getProducts } from "@/app/src/api/api";

export default function Productlist(){
    const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProducts().then((data) => {
      setProducts(data);
      setLoading(false);
    });
  }, []);

  const categories = ["all", ...Array.from(new Set(products.map((p) => p.category)))];

  const filtered = products.filter((p) => {
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === "all" || p.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  if (loading) return <p>Loading products...</p>;

  return (
    <div className={styles.layout}>
      <Sidebar
        categories={categories}
        activeCategory={activeCategory}
        onSelect={setActiveCategory}
      />
      <div className={styles.content}>
        <input
          type="text"
          placeholder="Search product..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={styles.search}
        />
        <ProductGrid products={filtered} />
      </div>
    </div>
  );

}
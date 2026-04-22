"use client"
import {Product} from "@/app/src/types";
import { useState } from "react";
import ProductGrid from "../ProductGrid/ProductGrid";
import Sidebar from "../../SideBar/SideBar";
import styles from "./ProductList.module.scss";
import { useProducts } from "@/app/src/hooks/useProducts";
import ProductSkeleton from "../../Skeleton/ProductSkeleton";

export default function Productlist(){
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const {products=[], loading, error} = useProducts();

  const categories = ["all", ...Array.from(new Set(products.map((p) => p.category)))];

  const filtered = products.filter((p) => {
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === "all" || p.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  if (loading) {
  return (
    <div className={styles.layout}>
      <div className={styles.sidebarSkeleton} />
      <div className={styles.content}>
        <div className={styles.searchSkeleton} />
        <div className={styles.grid}>
          {Array.from({ length: 8 }).map((_, i) => (
            <ProductSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
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
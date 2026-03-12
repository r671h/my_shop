"use client"
import {Product} from "@/src/types";
import { useState } from "react";
import ProductGrid from "../ProductGrid/ProductGrid";
import Sidebar from "../../SideBar/SideBar";
import styles from "./ProductList.module.scss";

type Props = {
    products: Product[];
}

export default function Productlist({products}: Props){
    const [search,setSearch] = useState("");
    const [activeCategory, setActiveCategory] = useState("all");

    const categories = ["all",...Array.from(new Set(products.map(p => p.category)))];

    const filtered = products.filter((p) =>{
        const matchesSearch = p.title.toLocaleLowerCase().includes(search.toLocaleLowerCase());
        const matchesCategory = activeCategory === "all" || p.category === activeCategory;
        return matchesSearch && matchesCategory;
    });

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
          placeholder="Produkt suchen..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={styles.search}
        />
        <ProductGrid products={filtered} />
      </div>
    </div>
  );

}
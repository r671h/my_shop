"use client"

import styles from "./SideBar.module.scss";

type Props = {
    categories: string[],
    activeCategory: string,
    onSelect: (category:string) => void
};

export default function SideBar({categories, activeCategory, onSelect}: Props) {
    return (
    <aside className={styles.sidebar}>
      <h2 className={styles.title}>Kategorien</h2>
      <ul className={styles.list}>
        {categories.map((category) => (
          <li
            key={category}
            className={`${styles.item} ${activeCategory === category ? styles.active : ""}`}
            onClick={() => onSelect(category)}
          >
            {category === "all" ? "all" : category}
          </li>
        ))}
      </ul>
    </aside>
  );
}

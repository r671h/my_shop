import styles from "./page.module.scss";

export default function AboutPage() {
  return (
    <main className={styles.main}>

      <section className={styles.section}>
        <h1 className={styles.title}>About MyShop</h1>
        <p className={styles.text}>
          MyShop is a personal project built with Next.js, TypeScript and Node.js.
          It started as a way to practice full-stack development and grew into a
          fully functional online store with authentication, cart and user profiles.
        </p>
        <p className={styles.text}>
          The project uses React for the frontend, Express and MongoDB for the backend,
          and is deployed on Vercel and Render.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.subtitle}>Tech Stack</h2>
        <div className={styles.stack}>
          <span className={styles.tag}>Next.js</span>
          <span className={styles.tag}>TypeScript</span>
          <span className={styles.tag}>SCSS</span>
          <span className={styles.tag}>Node.js</span>
          <span className={styles.tag}>Express</span>
          <span className={styles.tag}>MongoDB</span>
          <span className={styles.tag}>Vercel</span>
          <span className={styles.tag}>Render</span>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.subtitle}>Contact</h2>
        
      </section>

    </main>
  );
}
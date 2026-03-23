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
        <div className={styles.socialLinks}>
          <a
            href="https://github.com/r671h"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialLink}
            aria-label="GitHub profile"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              width="22"
              height="22"
              aria-hidden="true"
            >
              <path d="M12 0C5.37 0 0 5.373 0 12c0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.757-1.333-1.757-1.089-.745.083-.729.083-.729 1.205.084 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.762-1.605-2.665-.3-5.466-1.334-5.466-5.93 0-1.31.468-2.382 1.236-3.222-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.3 1.23a11.5 11.5 0 0 1 3.003-.404c1.02.005 2.047.138 3.003.404 2.29-1.552 3.296-1.23 3.296-1.23.654 1.653.243 2.873.12 3.176.77.84 1.234 1.912 1.234 3.222 0 4.61-2.804 5.625-5.476 5.922.43.372.814 1.103.814 2.222 0 1.606-.015 2.898-.015 3.293 0 .322.216.697.825.578C20.565 21.796 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
            </svg>
            GitHub
          </a>
 
          <a
            href="www.linkedin.com/in/ruslan-hryshchenko"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialLink}
            aria-label="LinkedIn profile"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              width="22"
              height="22"
              aria-hidden="true"
            >
              <path d="M20.447 20.452H16.89v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a1.98 1.98 0 0 1-1.98-1.98 1.98 1.98 0 0 1 1.98-1.98 1.98 1.98 0 0 1 1.98 1.98 1.98 1.98 0 0 1-1.98 1.98zm1.992 13.019H3.34V9h3.989v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
            LinkedIn
          </a>
        </div>
      </section>

    </main>
  );
}
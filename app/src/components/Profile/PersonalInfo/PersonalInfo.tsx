"use client";

import styles from "@/app/pages/profile/page.module.scss";

type Props = {
    user: any;
}

export default function PersonalInfo({user} : Props) {
     return (
    <div className={styles.card}>
      <h2 className={styles.cardTitle}>Personal Info</h2>
      <div className={styles.form}>
        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label>Name</label>
          </div>
          <div className={styles.formGroup}>
            <label>Email</label>
          </div>
        </div>
      </div>
    </div>
  );
}

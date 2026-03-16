'use client';

import { useAuth } from "@/app/src/context/AuthConext";
import styles from "./page.module.scss";

export default function ProfilePage() {
    const {user} = useAuth();
    return (
        <main className={styles.main}>
            <h1>Profile</h1>
            <p>Name: {user?.name}</p>
            <p>Email: {user?.email}</p>
        </main>
    );

}
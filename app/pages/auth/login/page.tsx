"use client";

import axios from "axios";
import Link from "next/dist/client/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from "./page.module.scss";
import { useAuth } from "@/app/src/context/AuthConext";


export default function LoginPage() {

    const {login} = useAuth();
    const router = useRouter();
    const [form, setForm] = useState({
        email: "",
        password: ""
    });
    const [error,setError] = useState("");
    const [loading,setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({...form, [e.target.name]: e.target.value});
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        const api = await axios.create({
          baseURL:process.env.NEXT_PUBLIC_API_URL
        })

        try{
            const res = await api.post("/auth/login", form);
            login(res.data.user,res.data.token);
            router.push("/");
        }
        catch (err:any){
            setError(err.respnse?.data?.error || "Something went wrong");
        }
        finally {
            setLoading(false);
        }
    };

      return (
    <main className={styles.main}>
      <div className={styles.card}>
        <h1 className={styles.title}>Login</h1>
        {error && <p className={styles.error}>{error}</p>}
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.field}>
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="your@email.com"
              required
            />
          </div>
          <div className={styles.field}>
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
            />
          </div>
          <button type="submit" className={styles.button} disabled={loading}>
            {loading ? "Loading..." : "Login"}
          </button>
        </form>
        <p className={styles.link}>
          Don't have an account? <Link href="/pages/auth/register">Register</Link>
        </p>
      </div>
    </main>
  );
}

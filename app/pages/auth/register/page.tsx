"use client";

import axios from "axios";
import { useState} from "react";
import { useRouter } from "next/navigation";
import Link from "next/dist/client/link";
import styles from "./page.module.scss";


export default async function RegisterPage() {

    const [form,setForm] = useState({
        name: "",
        email: "",
        password: ""
    });
    const [error,setError] = useState("");
    const [loading,setLoading] = useState(false);
    const router = useRouter();

    const api = await axios.create({
          baseURL:process.env.NEXT_PUBLIC_API_URL
        })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({...form, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try{
            const res = await api.post("/api/auth/register", form);
            localStorage.setItem("token",res.data.token);
            localStorage.setItem("user",JSON.stringify(res.data.user));
            router.push("/");
        }
        catch (err:any){
            setError(err.response?.data?.error || "Something went wrong");
        }
        finally {
            setLoading(false);
        }
    }

    return(
        <main className={styles.main}>
      <div className={styles.card}>
        <h1 className={styles.title}>Register</h1>
        {error && <p className={styles.error}>{error}</p>}
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.field}>
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your name"
              required
            />
          </div>
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
            {loading ? "Loading..." : "Register"}
          </button>
        </form>
        <p className={styles.link}>
          Already have an account? <Link href="/pages/auth/login">Login</Link>
        </p>
      </div>
    </main>
    )

}
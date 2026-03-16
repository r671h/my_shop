"use client";

import axios from "axios";
import { useState, useEffect } from "react";
import styles from "@/app/pages/profile/page.module.scss";

type Address = {
    _id: string;
    street: string,
    city: string,
    zip: string,
    country: string
};

const api = axios.create({
    baseURL: "http://localhost:5000/api",
})

export default function Addresses({token}:{token: string}) {
    const [addresses,setAddresses] = useState<Address[]>([]);
    const [form,setForm] = useState({street: "", city: "", zip: "", country: ""});
    const [loading,setLoading] = useState(false);

    async function fetchAddresses(){
        try{
            const res = await api.get("/addresses", {
                headers: {Authorization: `Bearer ${token}`}
            });
            setAddresses(res.data);
        }
        catch (error: any) {
            console.error("Error fetching addresses:", error.message)
        }
    };

    useEffect(()=>{
      if(token) {
        fetchAddresses();
      };
    },[token]);
 
    async function handleAdd(){
        setLoading(true);
        try {
            const res = await api.post("/addresses", form, {
                headers: {Authorization: `Bearer ${token}`}
            });
            setAddresses(res.data);
            setForm({street: "", city: "", zip: "", country: ""});
        }
        catch (error: any) {
            console.error("Error adding address:", error.message);
        }
        finally{
            setLoading(false);
        }
    };

    async function handleDelete(id: string){
        try {
            const res = await api.delete(`/addresses/${id}`, {
                headers: {Authorization: `Bearer ${token}`}
            });
            setAddresses(res.data);
        }
        catch (error: any) {
            console.error("Error deleting address:",error.message);
        }
    };
    

    return (
    <div className={styles.card}>
      <h2 className={styles.cardTitle}>Saved Addresses</h2>

      {/* Address List */}
      <div className={styles.addressList}>
        {addresses.length === 0 ? (
          <p className={styles.empty}>No saved addresses yet.</p>
        ) : (
          addresses.map((addr) => (
            <div key={addr._id} className={styles.addressItem}>
              <div className={styles.addressInfo}>
                <p>{addr.street}</p>
                <p>{addr.zip} {addr.city}</p>
                <p>{addr.country}</p>
              </div>
              <button
                className={styles.deleteBtn}
                onClick={() => handleDelete(addr._id)}
              >
                ✕
              </button>
            </div>
          ))
        )}
      </div>

      {/* Add Address Form */}
      <h3 className={styles.subTitle}>Add New Address</h3>
      <div className={styles.form}>
        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label>Street</label>
            <input
              value={form.street}
              onChange={(e) => setForm({ ...form, street: e.target.value })}
              placeholder="123 Main St"
            />
          </div>
          <div className={styles.formGroup}>
            <label>City</label>
            <input
              value={form.city}
              onChange={(e) => setForm({ ...form, city: e.target.value })}
              placeholder="Berlin"
            />
          </div>
        </div>
        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label>ZIP Code</label>
            <input
              value={form.zip}
              onChange={(e) => setForm({ ...form, zip: e.target.value })}
              placeholder="10115"
            />
          </div>
          <div className={styles.formGroup}>
            <label>Country</label>
            <input
              value={form.country}
              onChange={(e) => setForm({ ...form, country: e.target.value })}
              placeholder="Germany"
            />
          </div>
        </div>
        <button
          className={styles.saveBtn}
          onClick={handleAdd}
          disabled={loading}
        >
          {loading ? "Saving..." : "Save Address"}
        </button>
      </div>
    </div>
  );

}
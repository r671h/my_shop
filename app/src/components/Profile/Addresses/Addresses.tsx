"use client";

import { useAddress } from "@/app/src/context/AddressesContext";
import styles from "@/app/pages/profile/page.module.scss";
import { useEffect } from "react";

export default function Addresses() {
    
  const {addresses,addAddress,deleteAddress,loading,form,setForm,setLoading} = useAddress()

  useEffect(()=>{
    
  },addresses)
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
                onClick={() => deleteAddress(addr._id)}
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
          onClick={addAddress}
          disabled={loading}
        >
          {loading ? "Saving..." : "Save Address"}
        </button>
      </div>
    </div>
  );

}
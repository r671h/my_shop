"use client"

import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "./AuthConext";
import { Dispatch,SetStateAction } from "react";
import { Address } from "../types";
import next from "next";

type AdressesContextType = {
  addresses: Address[];
  addAddress: () => void;
  handleAddAddress: (address:Address) => void
  deleteAddress: (id: string) => void;
  form: {street: string, city: string, zip: string, country: string};
  setForm: Dispatch<SetStateAction<{ street: string; city: string; zip: string; country: string; }>>;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
};

const AddressContext = createContext<AdressesContextType | null>(null);

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL
})

export function AddressProvider({ children }: { children: React.ReactNode }) {
    const {token} = useAuth();
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
                console.error("Error fetching addresses:", error.message);
            }
        };
    
        useEffect(() => {
            if(!loading && token){
                fetchAddresses();
            }
            if(!loading && !token){
                setAddresses([]);
            }
        },[token,loading]);
     
        async function addAddress(){
            setLoading(true);
            try {
                const res = await api.post("/addresses", form, {
                    headers: {Authorization: `Bearer ${token}`}
                });
                const exists = addresses.some((addr) => 
                addr.street === form.street &&
                    addr.city === form.city &&
                    addr.zip === form.zip);
                
                if (exists) {
                    console.log("Address already exists");
                    return;
                }

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

        async function handleAddAddress(address: Address) {
            setLoading(true);

            try {
                const exists = addresses.some((addr) =>
                    addr.street === address.street &&
                    addr.city === address.city &&
                    addr.zip === address.zip
                );

                if (exists) {
                    console.log("Address already exists");
                    return;
                }

                const res = await api.post("/addresses", address, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                setAddresses(res.data);

            } catch (error: any) {
                console.error("Error adding address:", error.message);
            } finally {
                setLoading(false);
            }
        }
    
        async function deleteAddress(id: string){
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
        <AddressContext.Provider value={{ addresses, addAddress, handleAddAddress, deleteAddress, loading, form, setForm, setLoading }}>
            {children}
        </AddressContext.Provider>
    );
};

export function useAddress() {
    const context = useContext(AddressContext);
    if (!context) throw new Error("useAddress must be used with a AddressProvider");
    return context;
}
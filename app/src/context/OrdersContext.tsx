"use client"

import styles from "@/app/pages/profile/page.module.scss";
import axios from "axios";
import React, { Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import { createContext } from "react";
import { useAuth } from "./AuthConext";
import { Address } from "../types";


const api = axios.create({baseURL: process.env.NEXT_PUBLIC_API_URL })

type Order = {
    _id: string;
    items: [],
    total: number,
    address: Address,
    createdAt: string
};

type OrdersContextType = {
    orders: Order[];
    order: Order;
    loading: boolean
    setOrder: Dispatch<SetStateAction<Order>>
    setOrders: Dispatch<SetStateAction<Order[]>>;
    setLoading: Dispatch<SetStateAction<boolean>>;
    handleAddOrder: () => void;
    handleDeleteOrder: (id:string) => void;
};

const OrdersContext = createContext<OrdersContextType | null>(null);


export function OrdersProvider({children}:{ children : React.ReactNode}) {

  const [orders,setOrders] = useState<Order[]>([]);
  const [order,setOrder] = useState<Order>({_id:"",items:[],total:0,address:{_id:"" ,street: "", city: "", zip: "", country: ""},createdAt: Date.now().toString()});
  const [loading,setLoading] = useState(false);
  const {token} = useAuth();

  async function fetchOrders(){
    try{
        const res = await api.get("/orders", {
            headers: {Authorization: `Bearer ${token}`}
        });
        setOrder(res.data);
    }
    catch (error: any) {
        console.error("Error fetching orders:", error.message);
    }

  };

  useEffect(()=>{
    if(token){
      fetchOrders();
    }
  },[token]);

  async function handleAddOrder() {
    setLoading(true);
    try{
      const res = await api.post("/orders",order, {
        headers:{Authorization: `Bearer ${token}`}
      });
      setOrders(res.data);
    }
    catch(e: any){
      console.error("Error adding order:", e.message);
    }
    finally{
      setLoading(false);
    }
  };

  async function handleDeleteOrder(id: string) {
    try{
      const res = await api.delete(`/orders/${id}`,{
        headers:{Authorization:`Bearer ${token}`}
      });
      setOrders(res.data);
    }
    catch(e: any){
      console.error("Error deleting  order:", e.message);
    }
  }

  return (
    <OrdersContext.Provider value={{orders,handleAddOrder,handleDeleteOrder,loading,order,setLoading,setOrder,setOrders}}>
        {children}
    </OrdersContext.Provider>
  );
}

export function useOrders() {
    const context = useContext(OrdersContext);
    if (!context) throw new Error("useAddress must be used with a OrdersProvider");
    return context;
}
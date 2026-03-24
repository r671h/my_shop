import styles from "@/app/pages/profile/page.module.scss";
import axios from "axios";
import { useEffect, useState } from "react";

const api = axios.create({baseURL: process.env.NEXT_PUBLIC_API_URL })

type Order = {
    _id: string;
    items: [],
    total: number,
    createdAt: Date
};

export default function Orders({token}:{token:string}) {

  const [orders,setOrders] = useState<Order[]>([]);
  const [order,setOrder] = useState({items:[],total:0,createdAt: Date.now()});
  const [loading,setLoading] = useState(false);

  async function fetchOrders(){
    try{
        const res = await api.get("/addresses", {
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
    }
    catch(e: any){
      console.error("Error adding order:", e.message);
    }
    finally{
      setLoading(false);
    }
  };

  async function handleDelteOrder(id: string) {
    try{
      const res = await api.delete(`/orders/${id}`,{
        headers:{Authorization:`Bearer ${token}`}
      });
    }
    catch(e: any){
      console.error("Error deleting  order:", e.message);
    }
  }

  return (
    <div className={styles.card}>
      <h2 className={styles.cardTitle}>Order History</h2>
      {orders ? orders.map((order)=> <div>{order.createdAt.toString()}</div>) : <p className={styles.empty}>No orders yet.</p>}
    </div>
  );
}
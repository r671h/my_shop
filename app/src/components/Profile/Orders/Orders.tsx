import styles from "@/app/pages/profile/page.module.scss";
import { useAuth } from "@/app/src/context/AuthContext";
import { useOrders } from "@/app/src/context/OrdersContext";
import { useEffect } from "react";

export default function Orders() {
  const { orders } = useOrders();
  const { token } = useAuth()

  useEffect(()=>{

  },[token]);

  return (
    <div className={styles.card}>
      <h2 className={styles.cardTitle}>Order History</h2>

      {orders && orders.length > 0 ? (
        <div className={styles.orderList}>
          {orders.map((ord) => (
            <div key={ord._id} className={styles.orderItem}>

              
              <div className={styles.orderInfo}>
                <span className={styles.orderDate}>
                  🗓{" "}
                  {new Date(ord.createdAt).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
                <span className={styles.orderItems}>
                  {ord.items.length} item{ord.items.length !== 1 ? "s" : ""}
                </span>
                <span className={styles.orderItemNames}>
                  {ord.items.map((i) => `${i.title} ×${i.quantity}`).join(", ")}
                </span>
              </div>

              
              <div className={styles.orderRight}>
                
                <span className={styles.orderAddress}>
                   {ord.address.street}, {ord.address.city}
                </span>
                <span className={styles.orderTotal}>
                  ${ord.total.toFixed(2)}
                </span>
              </div>

            </div>
          ))}
        </div>
      ) : (
        <p className={styles.empty}>No orders yet.</p>
      )}
    </div>
  );
}
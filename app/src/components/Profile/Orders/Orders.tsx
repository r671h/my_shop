import styles from "@/app/pages/profile/page.module.scss";
import { useOrders } from "@/app/src/context/OrdersContext";


export default function Orders() {

  const {orders} = useOrders();

  return (
    <div className={styles.card}>
      <h2 className={styles.cardTitle}>Order History</h2>
      {orders ? orders.map((ord)=> <div>{ord.createdAt.toString()}</div>) : <p className={styles.empty}>No orders yet.</p>}
    </div>
  );
}
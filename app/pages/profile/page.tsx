'use client';

import { useAuth } from "@/app/src/context/AuthConext";
import styles from "./page.module.scss";
import Addresses from "@/app/src/components/Profile/Addresses/Addresses";
import PersonalInfo from "@/app/src/components/Profile/PersonalInfo/PersonalInfo";
import Orders from "@/app/src/components/Profile/Orders/Orders";

export default function ProfilePage() {
    const {user,token,loading} = useAuth();

    if(loading){
        return <div className={styles.main}>Loading...</div>
    }

    return (
        <main className={styles.main}>
            <PersonalInfo user={user}></PersonalInfo>
            <Orders token={token}></Orders>
            <Addresses token={token || ""}></Addresses>
        </main>
        
    );

}
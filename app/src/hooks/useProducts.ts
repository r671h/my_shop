import { useEffect, useState } from "react";
import { Product } from "../types";
import { getProducts } from "../api/api";


export function useProducts(){
    const [products,setProducts] = useState<Product[]>([]);
    const [loading,setLoading] = useState(true);
    const [error,setError] = useState<string | null>(null);

    useEffect(()=>{
        getProducts()
        .then((data)=>{
            setProducts(data);
        })
        .catch((e)=>{
            setError(e.message);
        })
        .finally(() => {
            setLoading(false);
        })
    },[])

    return {products,loading,error};
}
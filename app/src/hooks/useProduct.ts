import { useEffect, useState } from "react";
import { Product } from "../types";
import { getProduct } from "../api/api";

export function useProduct(id : Number){
    const [product,setProduct] = useState<Product | null>();
    const [loading,setLoading] = useState(true);
    const [error,setError] = useState<string | null>(null);

    useEffect(()=>{
        if(!id){
            return;
        }
        getProduct(id)
        .then((data)=>{
            setProduct(data);
        })
        .catch((e)=>{
            setError(e.message);
        })
        .finally(() => {
            setLoading(false);
        })
    },[id])

    return {product,loading,error};
}
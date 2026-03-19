import { useEffect, useState } from "react";
import { Product } from "../types";
import { getProduct } from "../api/api";

type Props = {
    id : Number
};

export function useProduct({id} : Props){
    const [product,setProduct] = useState<Product | null>();
    const [loading,setLoading] = useState(true);
    const [error,setError] = useState<string | null>(null);

    useEffect(()=>{
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
    },[])

    return {product,loading,error};
}
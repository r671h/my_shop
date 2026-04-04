import { useEffect, useState } from "react";
import { Product } from "../types";
import { getProduct } from "../api/api";
import axios from "axios";
import useSWR from "swr";

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL
})

const fetcher = (url: string) => api.get<Product>(url).then(res => res.data);

export function useProduct(id : string){
    const { data, error, isLoading } = useSWR(
        id ? `/products/${id}` : null, 
        fetcher, {
        revalidateOnFocus: false,
        refreshInterval: 60000
    });

    return {
        product: data,
        loading: false,
        error: error?.message || null
    };
}
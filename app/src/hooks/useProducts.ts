import { useEffect, useState } from "react";
import { Product } from "../types";
import { getProducts } from "../api/api";
import axios from "axios";
import useSWR from "swr";

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

const fetcher = (url: string) => api.get<Product[]>(url).then(res => res.data);

export function useProducts(){
    const { data, error, isLoading } = useSWR("/products", fetcher, {
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
        refreshInterval: 60000
    });

    return {
        products: data ?? [],
        loading: isLoading,
        error: error?.message || null
    };
}
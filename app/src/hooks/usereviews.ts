import axios from "axios";
import useSWR, { mutate } from "swr";
import { Review } from "../types";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

const fetcher = (url: string) => api.get<Review[]>(url).then(res => res.data);

export function useReviews(productId: string) {
    const { data, error, isLoading } = useSWR(productId ? `/products/${productId}/reviews` : null, 
        fetcher, 
    {
        revalidateOnFocus: false
    });

    return {
        reviews: data ?? [],
        loading: isLoading,
        error: error?.message || null,
        mutate,
    };
}
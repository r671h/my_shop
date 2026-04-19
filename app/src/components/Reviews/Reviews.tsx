import axios from 'axios';
import { useReviews } from '../../hooks/usereviews';
import { useAuth } from '../../context/AuthConext';
import { useState } from 'react';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

type Props = {
  productId: string;
};

export default function Reviews({ productId }: Props) {
    const { reviews, loading, mutate } = useReviews(productId);
    const { token, user, isLoggedIn} = useAuth();
    const [rating, setRating] = useState("");
    const [comment, setComment] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");
}
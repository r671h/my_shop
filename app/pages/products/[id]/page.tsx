"use client";

import { getProduct } from "@/app/src/api/api";
import ProductDetails from "@/app/src/components/Product/ProductDetails/ProductDetails";
import { useProduct } from "@/app/src/hooks/useProduct";
import axios from "axios";
import { use } from "react";

type Props = {
  params: Promise<{ id: string }>;
};

export default function ProductPage({ params }: Props) {
  const { id } =  use(params); 
  const {product,loading,error} = useProduct(Number(id))

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!product) return <p>Product not found.</p>;

  return (
    <ProductDetails product={product} />
  );
}
"use client";

import ProductDetails from "@/app/src/components/Product/ProductDetails/ProductDetails";
import ProductDetailsSkeleton from "@/app/src/components/Skeleton/ProductDetailsSkeleton/ProductDetailsSkeleton";
import { useProduct } from "@/app/src/hooks/useProduct";
import { use } from "react";

type Props = {
  params: Promise<{ id: string }>;
};

export default function ProductPage({ params }: Props) {
  const { id } =  use(params); 
  const {product,loading,error} = useProduct(id)

  if (loading) return <ProductDetailsSkeleton />;
  if (error) return <p>Error: {error}</p>;
  if (!product) return <p>Product not found.</p>;

  return (
    <ProductDetails product={product} />
  );
}
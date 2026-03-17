import { getProduct } from "@/app/src/api/api";
import ProductDetails from "@/app/src/components/Product/ProductDetails/ProductDetails";
import axios from "axios";

type Props = {
  params: {
    id: string;
  };
};

export default async function ProductPage({ params }: Props) {
  const { id } = await params;
  const product = await getProduct(Number(id));

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <ProductDetails product={product} />
  );
}
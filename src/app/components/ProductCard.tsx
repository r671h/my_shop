import { Product } from "../types"

type Props = {
    product:Product
}

export default function ProductCard({product}:Props){
    return(
        <div className="bg-white rounded-xl shadow p-4 flex flex-col gap-3">
      <img
        src={product.image}
        alt={product.title}
        className="h-48 object-contain mx-auto"
      />
      <h2 className="text-sm font-semibold text-gray-800 line-clamp-2">
        {product.title}
      </h2>
      <p className="text-blue-600 font-bold">${product.price}</p>
      <button className="mt-auto bg-blue-600 text-white rounded-lg py-2 hover:bg-blue-700 transition">
        In den Warenkorb
      </button>
    </div>
    );
}
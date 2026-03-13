import {getProducts} from '@/app/src/api/api'
import ProductCard from '../../src/components/Product/ProductCard/ProductCard'
import styles from "./page.module.scss"

export default async function Page(){
    const products = await getProducts()
   
    return  <main className="p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        My Online Shop 
      </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product)=>(
                <ProductCard key={product.id} product={product}/>
            ))}
        </div>
    </main>
}
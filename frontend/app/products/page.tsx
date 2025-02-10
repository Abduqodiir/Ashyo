"use client"
import ProductFilter from '@/components/ProductFilter'
import ProductItem from '@/components/ProductItem'
import ProductItemSkeleton from '@/components/ProductItemSkeleton'
import { getProductsV2 } from '@/service/getProducts'
import { ProductItemType } from '@/types/ProductsType'
import React, { useState } from 'react'

const Products = () => {
  // const {products, isLoading} = getProducts("/product-item")
  const [minPrice, setMinPrice] = useState<number>(0)
  const [maxPrice, setMaxPrice] = useState<number>(0)
  const [brandId, setBrandId] = useState<number | null>(null)

  const {products, isLoading} = getProductsV2(minPrice, maxPrice, brandId)

  return (
    <div className='flex flex-col sm:flex-row containers gap-[20px]'>
      <ProductFilter setBrandId={setBrandId} setMinPrice={setMinPrice} setMaxPrice={setMaxPrice}/>
      <div className='sm:w-[75%]  !h-[800px] overflow-y-auto grid grid-cols-2 sm:flex flex-wrap justify-between gap-[20px]'>
        {isLoading ? <ProductItemSkeleton extraClass='!flex-wrap !justify-between !gap-[20px] !space-x-0'/> : products.map((item:ProductItemType) => <ProductItem  key={item.id} item={item}/>)}
      </div>
    </div>
  )
}

export default Products
"use client"

import { IMAGE_API } from '@/hooks/getEnv'
import { ProductItemType } from '@/types/ProductsType'
import Image from 'next/image'
import React, { FC, useState } from 'react'
import Button from './Button'
import { BasketCartIcon, CompareIcon, LikeIcon } from '@/icons'
import getToken from '@/hooks/getToken'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { instance } from '@/hooks/instance'
import { useRouter } from 'next/navigation'
import { FcLike } from "react-icons/fc";

const ProductItemV2:FC<{item:ProductItemType}> = ({item}) => {
    const router = useRouter()
    const {token, userId} = getToken()
    const queryClient = useQueryClient()

    const likeMutation = useMutation({
        mutationFn:(data:{productId:number, userId:number}) => instance().post("/like/toggle", data, {
            headers:{
                "Authorization":`Bearer ${token}`
            }
        }),
        onSuccess:(() => {
            queryClient.invalidateQueries({queryKey:['products-items']})
            queryClient.invalidateQueries({queryKey:['like_list']})
        })
    })
    const cartMutation = useMutation({
        mutationFn:(data:{product_id:number, user_id:number, quantity:number,price:number }) => instance().post("/cart-item", data, {
            headers:{
                "Authorization":`Bearer ${token}`
            }
        }),
        onSuccess:() => {
            queryClient.invalidateQueries({queryKey:['products-items']})
            queryClient.invalidateQueries({queryKey:['carts_list']})
        }
    })

    function handleCartClick(item: ProductItemType) {
        const newData = {product_id:item.product.id, user_id:userId, quantity:1, price:1}
        cartMutation.mutate(newData)
    }

    function handleLikeClick(productId:number){
        const data = {productId, userId}
        likeMutation.mutate(data)
    }
  return (
   <div className='w-full sm:w-[273px] relative product-item duration-300'>
        <div className='bg-[#EBEFF3] relative rounded-[8px] mb-[16px] flex items-center justify-center h-[280px]'>
            <Image onClick={() => router.push(`/products/${item.id}`)} className='product-img duration-300' style={{width:"202px" , height:"202px"}} src={`${IMAGE_API}/${item.image}`} width={202} height={202} alt='Product img' priority/>
             {/* <span className='bg-white px-[10px] py-[7px] rounded-[5px] font-semibold text-[14px] text-[#E81504] absolute top-[15px] left-[15px]'>Aksiyada</span> */}
        </div>
        <p className='text-[18px] font-normal leading-[19px] text-[#545D6A] mb-[28px]'>{item.product ? item.product.name : item.name}</p>
        <div className='flex justify-between'>
            <strong className='text-[20px] leading-[26px] line-clamp-2 font-bold'>{item.price} usz</strong>
            <div className='flex gap-[10px]'>
                <Button extrClass='!w-[52px] !h-[44px] !p-0 !bg-transparent border-[2px] border-[#EBEFF3] !text-slate-500' type='button' icon={<CompareIcon/>} iconPostion='left'/>
                <Button onClick={() => handleCartClick(item)} extrClass='!w-[52px] !h-[44px] !p-0 text-white' type='button' icon={<BasketCartIcon/>} iconPostion='left'/>
            </div>
        </div>
        <button onClick={() => handleLikeClick(item.id)} className={`absolute top-[15px] right-[15px]`}>
              <FcLike size={25} className="text-red-500" /> 
</button>
 </div>
  )
}


export default ProductItemV2;
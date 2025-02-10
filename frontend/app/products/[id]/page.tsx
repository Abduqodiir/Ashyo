"use client"
import Button from '@/components/Button'
import { IMAGE_API } from '@/hooks/getEnv'
import { LikeIcon } from '@/icons'
import { getSingleProduct } from '@/service/getProducts'
import { CarIcon } from 'lucide-react'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import React, { useState } from 'react'
import Products from '../../../components/Products'

const SingleProducts = () => {
    const {id} = useParams()
    const [showComment, setShowComment] = useState<"Varation" | "Comments">("Varation")
    const productid = Array.isArray(id) ? id[0] : id
    const {singleProducts} = getSingleProduct(productid)

  return (
    <div className='containers !pt-10'>
        <h2 className='font-bold text-[32px] leading-[41px] mb-[31px]'>{singleProducts?.product?.name}</h2>
        <div className='flex justify-between gap-[32px]'>
          <div className='w-[50%] relative  py-[52px] bg-[#EBEFF3] rounded-[10px] flex items-center justify-center'>
              <Image style={{width:341, height:341}} src={`${IMAGE_API}/${singleProducts.image}`} alt='Product img' width={341} height={341} priority/>
              <button className='absolute top-[26px] right-[21px]'> <LikeIcon/> </button>
          </div>
          <div className='w-[50%] pt-[32px]'>
            <div className='space-x-[20px]'>
              <span className='font-normal text-[16px] leading-[16px] text-[#515D6C]'>Narxi</span>
              <strong className='font-bold text-[32px] leading-[38px]'>{singleProducts.price} USZ</strong>
            </div>
            <p className='mb-[10px] py-[19px] bg-[#EBEFF3] rounded-[6px] text-center text-[16px] leading-[20px] text-[#545D6A] mt-[36px]'>{singleProducts?.product?.nasiya} / {Math.round(singleProducts.price / 6)} UZS</p>
            <Button extrClass='!w-[50%] sm:!py-[20px]' title='Savatga qo‘shish' type='button'/>
            <ul className='mt-[43px] space-y-[20px]'>
              <li className='flex items-center gap-[16px]'> 
                <CarIcon/>
                <span className='text-[16px] leading-[20px]'>Yetkazib berish O’zbekiston bo’ylab</span>
              </li>
              <li className='flex items-center gap-[16px]'> 
                <CarIcon/>
                <span className='text-[16px] leading-[20px]'>Yetkazib berish O’zbekiston bo’ylab</span>
              </li>
              <li className='flex items-center gap-[16px]'> 
                <CarIcon/>
                <span className='text-[16px] leading-[20px]'>Yetkazib berish O’zbekiston bo’ylab</span>
              </li>
            </ul>
          </div>
        </div>
        <div className='mt-[80px]'>
          <ul className='flex items-center gap-[85px] mb-[45px]'>
            <li onClick={() => setShowComment("Varation")} className={`text-[18px] leading-[23px] border-b-[2px] cursor-pointer ${showComment == "Varation" ? "text-black border-black" : "text-[#515D6C] border-transparent"}`}>Telfon xususiyatlari</li>
            <li onClick={() => setShowComment("Comments")} className={`text-[18px] leading-[23px] border-b-[2px] cursor-pointer ${showComment == "Comments" ? "text-black border-black" : "text-[#515D6C] border-transparent"}`}>Mijozlarni fikrlari</li>
          </ul>
          <div className='w-[651px]'>
            {showComment == "Comments" ? "Comment" : 
              singleProducts.configurations?.map((item:any) => (
              <div key={item.id} className='py-[5px] border-b-[2px] text-[#545D6A] text-[18px] border-slate3400 border-dashed flex justify-between'>
                <div className='w-[50%]'>{item?.variationOption?.variation?.name}</div>
                <div className='w-[50%]'>{item?.variationOption?.value}</div>
              </div>
            ))}
          </div>
        </div>
        <Products title="Most popular product" API='/product-items'/>
    </div>
  )
}

export default SingleProducts
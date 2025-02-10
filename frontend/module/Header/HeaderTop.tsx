"use client"
import { LocationIcon } from '@/icons'
import { HeaderTopListType } from '@/types/HeaderType'
import Link from 'next/link'
import React from 'react'
import Lang from './Lang'

const HeaderTop = () => {
    
    const navlist:HeaderTopListType[] = [
        {
            id:1,
            title:"Tashkent",
            path:'/',
            icon:<LocationIcon/>
        },
        {
            id:2,
            title:"About Us",
            path:'/aboutus',
            icon:null
        },
        {
            id:3,
            title:"Products",
            path:'/products',
            icon:null
        },
        {
            id:4,
            title:"Contacts",
            path:'/contact',
            icon:null
        },

    ]
    
  return (
    <div className='bg-[#EBEFF3] hidden sm:block py-[11px]'>
        <div className='flex items-center justify-between containers '>
            <div className='flex items-center gap-[28px]'>
                {navlist.map((item:HeaderTopListType) => <Link className={`flex items-center text-[14px] text-[#545D6A] leading-[16.41px] ${item.icon && "gap-[11px]"}`} key={item.id} href={item.path}>
                    {item.icon && item.icon}
                    <span>{item.title}</span>
                </Link>)}
            </div>
            <div className='flex items-center gap-[25px]'>
                <Link className='text-[14px] font-semibold leading-[18.2px] text-[#545D6A]' href={'tel:+998711234567'}>+998 (71) 123-45-67</Link>
                <Lang/>
            </div>
        </div>
    </div>
  )
}

export default HeaderTop
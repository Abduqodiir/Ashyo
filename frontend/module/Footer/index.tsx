import { AppStoreIcon, FacebookIcon, PlayMarketIcon, TelegramIcon, TwitterIcon, YouTubeIcon } from '@/icons'
import { GrInstagram } from "react-icons/gr";
import Link from 'next/link'
import React from 'react'
import Input from '@/components/Input';

const Footer = () => {
    const socialList = [
        {
            id:1,
            icon:<FacebookIcon/>,
            path:"/"
        },
        {
            id:2,
            icon:<YouTubeIcon/>,
            path:"/"
        },
        {
            id:3,
            icon:<TelegramIcon/>,
            path:"/"
        },
        {
            id:4,
            icon:<TwitterIcon/>,
            path:"/"
        },
        {
            id:5,
            icon:<GrInstagram color='#cd2b67' />,
            path:"/"
        },
    ]
    const menuList = [
        {
            id:1,
            title:"Ashyo haqida",
            path:"/"
        },
        {
            id:2,
            title:"Foydalanish shartlari",
            path:"/"
        },
        {
            id:3,
            title:"Maxfiylik va hafsizlik siyosati",
            path:"/"
        },
        {
            id:4,
            title:"Mahsulotlarni va tovarlarni qaytarish siyosati",
            path:"/"
        },
        {
            id:5,
            title:"Biz bilan aloqa",
            path:"/"
        },
    ]
  return (
    <footer className='mt-[100px] pb-[50px]'>
        <div className="containers flex gap-[20px] sm:gap-0 justify-center sm:justify-between flex-wrap">
            <div className='text-center sm:text-start'>
                <strong className='font-bold text-[20px] leading-[26px] mb-[21px]'>Bizning ijtimoiy tarmoqlarda</strong>
                <div className='flex justify-center sm:justify-start items-center gap-[10px] mt-[21px]'>
                    {socialList.map(item => (
                        <Link className='bg-[#EBEFF3] rounded-[7px] w-[44px] h-[40px] flex items-center justify-center' href={item.path} key={item.id}>{item.icon}</Link>
                    ))}
                </div>
                <p className='mt-[30px] text-[20px] leading-[26px] font-bold mb-[12px]'>Mobil ilovani yuklab oling</p>
                <div className='flex justify-center sm:justify-start gap-[12px] mb-[57px]'>
                    <button className='flex items-center gap-[12px] py-[17px] px-[30px] bg-[#EBEFF3] rounded-[10px]'>
                        <AppStoreIcon/>
                        <span className='font-bold text-[16px] leading-[17.66px]'>App Store </span>
                    </button>
                    <button className='flex items-center gap-[12px] py-[17px] px-[30px] bg-[#EBEFF3] rounded-[10px]'>
                        <PlayMarketIcon/>
                        <span className='font-bold text-[16px] leading-[17.66px]'>Google Play </span>
                    </button>
                </div>
                <p className='font-medium text-[16px] text-[#000] opacity-40'>© 2022 Ashyo ro’hatdan otgan litsenzalangan bu brend.</p>
            </div>
            <div className='text-center sm:text-start'>
                <strong className='text-[20px] leading-[26px] inline-block font-bold mb-[16px]'>Menyu</strong>
                <div className='space-y-[12px] flex flex-col'>
                    {menuList.map(item => <Link className='text-[16px] leading-[17.66px] text-[#000000B2] opacity-70' key={item.id} href={item.path}>{item.title}</Link>)}
                </div>
            </div>
            <div className='flex flex-col'>
                <strong className='font-bold text-[20px] leading-[26px] mb-[13px] opacity-70'>Aloqa</strong>
                <Link className='inline-block font-bold text-[24px] leading-[28px] mb-[32px] text-[#06172D]' href={`tel:+998711234567`}>+998 (71) 123-45-67</Link>
                <p className='inline-block text-[16px] leading-[20px] opacity-70 mb-[12px]'>Savolingiz bormi?</p>
                <Input extraClass='!w-[314px]' placeholder=' O’zingiz qiziqtirgan savollarni bering' type='text'/>
            </div>
        </div>
    </footer>
  )
}

export default Footer
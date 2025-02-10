import { ButtonType } from '@/types/ButtonType'
import React from 'react'

const Button:React.FC<ButtonType> = ({icon, iconPostion, title, extrClass, type, onClick, isLoading, loading}) => {
  return (
    <button onClick={onClick} type={type} className={`${extrClass} flex items-center hover:opacity-90 duration-300 ${isLoading && "gap-[20px]"} justify-center ${title && icon && "sm:gap-[20px]"} sm:py-[14px] sm:px-[25px] rounded-[6px] bg-[#134E9B] text-white font-medium sm:!text-[16px] leading-[18.75px]`}>
        {icon && iconPostion == "left" && icon}
        {isLoading && loading}
        <span>{title}</span>
        {icon && iconPostion == "right" && icon}
    </button>
  )
}

export default Button
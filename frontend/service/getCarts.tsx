"use client"
import getToken from "@/hooks/getToken"
import { instance } from "@/hooks/instance"
import { useQuery } from "@tanstack/react-query"

export const getCarts = () => {
    const {userId} = getToken()
    const { data:cartList = [], isLoading } = useQuery({
        queryKey: ['carts_list'],
        queryFn: () => instance().get(`/users/${userId}`).then(res => res.data?.cartItems)
    })
    return {cartList, isLoading}
}

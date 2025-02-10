"use client"
import { instance } from "@/hooks/instance" 
import { useQuery } from "@tanstack/react-query"
export const getBanners = () => {
    const { data: banners = [], isLoading } = useQuery({
        queryKey: ['banners'],
        queryFn: () => instance().get('/banners').then(res => res.data)
    })
    return { banners, isLoading }
}
"use client"
import getToken from "@/hooks/getToken"
import { instance } from "@/hooks/instance"
import { useQuery } from "@tanstack/react-query"

export const getLikes = () => {
    const {userId} = getToken()
    const { data:likeList = [], isLoading } = useQuery({
        queryKey: ['like_list'],
        queryFn: () => instance().get(`/like/user/${userId}`).then(res => res.data)
    })
    return {likeList, isLoading}
}

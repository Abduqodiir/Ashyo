"use client"
import getToken from "@/hooks/getToken"
import { instance } from "@/hooks/instance"
import { useQuery } from "@tanstack/react-query"

export const getLikesIdsArray = (userIdLike?: number) => {
    const {userId} = getToken()
    const { data:likeList = [], isLoading } = useQuery({
        queryKey: ['like_list_ids_array'],
        queryFn: () => instance().get(`/like/usersLike/${userId}`).then(res => res.data)
    })
    return {likeList, isLoading}
}
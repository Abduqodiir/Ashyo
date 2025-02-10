"use client";

import { Loader2 } from "lucide-react";
import ProductItemV2 from "@/components/ProductItemv2";
import { ProductItemType } from "@/types/ProductsType";
import { useState, useEffect } from "react";
import getToken from "@/hooks/getToken";
import { instance } from "@/hooks/instance";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export default function LikePage() {
  const { token, userId } = getToken();
  const queryClient = useQueryClient();

  const fetchLikes = async () => {
    const response = await instance().get(`/like/user/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  };

  const { data: likedProducts = [], isLoading } = useQuery({
    queryKey: ["like_list"],
    queryFn: fetchLikes,
    staleTime: 0,
  });

  const likeMutation = useMutation({
    mutationFn: (data: { productId: number; userId: number }) =>
      instance().post("/like/toggle", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["like_list"]});
    },
  });

  function handleLikeClick(productId: number) {
    const data = { productId, userId };
    likeMutation.mutate(data);
  }

  if (isLoading) {
    return (
      <div className="flex containers justify-center items-center h-screen">
        <Loader2 className="animate-spin w-6 h-6 text-gray-500" />
      </div>
    );
  }

  return (
    <div className="containers mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Liked Products</h1>
      {likedProducts.length === 0 ? (
        <p className="text-gray-500">No liked products found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {likedProducts.map((product: ProductItemType) => (
            <ProductItemV2
              key={product.id}
              item={product}
              is_liked={product.is_liked}
              handleLikeClick={() => handleLikeClick(product.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

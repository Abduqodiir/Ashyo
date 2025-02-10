// src/modules/cart-item/interfaces/cart-item.interface.ts
export interface CartItemInterface {
    id?: number;
    cart_id: number;
    product_id: number;
    quantity: number;
    price: number;
    createdAt?: Date;
    updatedAt?: Date;
  }
  
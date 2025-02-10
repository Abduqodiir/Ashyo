export declare interface UpdateProductRequest {
    name?: string;
    category_id?: number;
    description?: string;
    nasiya?: 'Tolangan' | 'Tolanmagan' | 'On proccess';
    summary?: string;
    price?: number;
    rating ?: number; 
    is_aksiya ?: boolean;
    brand_id?: number;
    image?: string;
}
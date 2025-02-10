export interface ProductFilterDto {
    category_id?: number;
    brand_id?: number;
    min_price?: number;
    max_price?: number;
    search?: string;
    page?: number;
    limit?: number;
    sort?: 'price_asc' | 'price_desc' | 'rating_desc';
    variations?: Record<number, number>;
}
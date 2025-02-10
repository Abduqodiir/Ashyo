export interface ProductType {
    ProductsItem:any[],
    category_id:number | null,
    description:string | null,
    nasiya:string | null,
    summary:string | null,
    rating:number | null,
    is_aksiya:boolean 
    id:number,
    name:string | null,
    image:string | null,
    price:number
    brand_id:number | null,
}

export interface ProductPageType {
    title:string,
    API:string,
    extraClass?:string,
}

export interface Productss {
    id:number,
    name:string,
    category_id:number,
    description:string,
    nasiya:string,
    summary:string,
    price:number,
    is_aksiya:boolean,
    is_liked?:boolean | undefined,
    brand_id:number,
    image:string,

}

export interface ProductItemType {
    product:Productss
    id:number,
    image:string,
    price:number,
    product_id:number,
    color_id:number,
    name:string,
    quantity?:number
}

export interface ProductTypeV2 {
    brand_id:string,
    category:{},
    category_id:string,
    comments:any[],
    createdAt:string,
    description:string,
    id:number,
    image:string,
    is_aksiya:boolean,
    like:any[],
    name:string,
    nasiya:string,
    price:number,
    product_item:any,
    rating:number,
    summary:string,
    updatedAt:string
}


export interface CartProductType{
    id:number,
    product:ProductItemType,
    product_id:string
}
import { BrandType, Company, imagesType, Variation } from "../interfaces"

type CartProductType = {
    avg_rate:number,
    brand:BrandType
    brand_id:number
    company:Company
    company_id:number
    display_order:number
    id:number
    image:imagesType
    in_wishlist:boolean
    name:string
    short_description:string
    slug:string
    variation:Variation
} 

export default CartProductType
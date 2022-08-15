import { Attributes, Brand, Company, Variation } from "../interfaces"

type ProductsType = {
    attributes:Attributes[],
    brand:Brand,
    company:Company,
    company_id:number,
    id:number,
    display_order:number,
    images:string[],
    name:string,
    in_wishlist:boolean,
    short_description:string,
    slug:String,
    variation:Variation
}

export default ProductsType
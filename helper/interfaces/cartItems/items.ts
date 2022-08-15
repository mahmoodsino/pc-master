import { product } from "../details"
import { Variation } from "../products"

interface items {
    type:number
    id?:number,
    available_quantity?:number,
    product_id:number,
    variation_id:number,
    branch_id:number,
    modifierGroups:number[],
    quantity:number,
    description:string
    product?:product,
    price?:number,
    variation?:Variation
    title?:string
}
export default items
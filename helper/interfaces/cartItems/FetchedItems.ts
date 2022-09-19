import CartProductType from "../../types/CartProductType"
import { product } from "../details"
import { Variation } from "../products"
import modifierGroups from "./modifierGroups"

interface FetchedItems {
    type:number
    id?:number,
    available_quantity?:number,
    product_id:number,
    variation_id:number,
    branch_id:number,
    modifierGroups:modifierGroups[],
    quantity:number,
    description:string
    product?:CartProductType,
    price?:number,
    variation?:Variation
    title?:string
}
export default FetchedItems
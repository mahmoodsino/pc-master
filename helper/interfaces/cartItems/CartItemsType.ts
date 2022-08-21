import { product } from "../details"
import { Variation } from "../products"
import items from "./items"

interface CartItemsType {
    cost_points:number,
    customer_points:number,
    delivery_fee:string,
    earned_points:number,
    items:items[],
    sub_total_price:number,
    tax:string,
    total_price:number
}
export default CartItemsType
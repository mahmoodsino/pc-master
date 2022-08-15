import { product } from "../details"
import { Variation } from "../products"
import items from "./items"

interface WishListType {
    items:items[],
    subtotal_price:number
}

export default WishListType
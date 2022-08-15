import { atom } from "recoil";
import { OrderType } from "../../interfaces";

const OrderAtom  = atom<OrderType[]>({
    key:"OrderAtom",
    default:[]
})
export default OrderAtom
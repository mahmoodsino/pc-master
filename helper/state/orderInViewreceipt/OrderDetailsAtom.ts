import { atom } from "recoil";
import { OrderDetailsType } from "../../interfaces";

const OrderDetailsAtom = atom<OrderDetailsType>({
    key:"OrderDetailsAtom",
    default:{} as OrderDetailsType
})
export default OrderDetailsAtom
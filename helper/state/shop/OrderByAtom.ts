import { atom } from "recoil";
import { string } from "yup";

interface OrderByType  {
    label:string
    value:number
}

const OrderByAtom = atom<OrderByType[]>({
    key:"OrderByAtom",
    default:[]
})

export default OrderByAtom;
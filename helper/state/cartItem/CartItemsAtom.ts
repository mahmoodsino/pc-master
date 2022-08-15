import { atom } from "recoil";
import {  items } from "../../interfaces";

const CartItemAtom = atom<items[]>({
    key:"CartItemAtom",
    default:[]
})
export default CartItemAtom
import { atom } from "recoil";
import {  WishListItems, WishListType } from "../../interfaces";

const WishListAtom = atom<WishListItems[]>({
    key:"WishListAtom",
    default:[]
})
export default WishListAtom
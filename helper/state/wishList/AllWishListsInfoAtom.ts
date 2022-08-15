import { atom } from "recoil";
import { WishListType } from "../../interfaces";

const AllWishListsInfoAtom =atom<WishListType>({
    key:"AllWishListsInfoAtom",
    default:{
        items:[],
        subtotal_price:-1
    }
})

export default AllWishListsInfoAtom
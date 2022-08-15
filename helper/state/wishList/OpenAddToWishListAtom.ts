import { atom } from "recoil";

const OpenAddToWishListAtom =atom<boolean>({
    key:"OpenAddToWishListAtom",
    default:false
})

export default OpenAddToWishListAtom
import { atom } from "recoil";

const SelectedShopCategoryAtom =atom<number[]>({
    key:"SelectedShopCategoryAtom",
    default:[]
})
export default SelectedShopCategoryAtom
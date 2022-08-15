import { atom } from "recoil";
import { AttributesShopType } from "../../interfaces";

const AttributesShopAtom = atom<AttributesShopType[]>({
    key:"AttributesAtom",
    default :[]
})

export default AttributesShopAtom
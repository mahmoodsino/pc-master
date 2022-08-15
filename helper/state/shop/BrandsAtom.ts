import { atom } from "recoil";
import { BrandType } from "../../interfaces";

const BrandsAtom = atom<BrandType[]>({
    key:"BrandsAtom",
    default:[]
})
export default BrandsAtom
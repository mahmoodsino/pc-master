import { atom } from "recoil";
import { InStockInfoType } from "../../types";

const InStockInfoAtom= atom<InStockInfoType[]>({
    key:"InStockInfoAtom",
    default:[]
})

export default InStockInfoAtom
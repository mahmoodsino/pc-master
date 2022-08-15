import { atom } from "recoil";
import { Variation } from "../../interfaces";

const VariationAtom = atom<Variation>({
    key: "VariationAtom",
    default: {
        available_quantity: 0,
        branch_id: -1,
        id: -1,
        in_stock: 0,
        points: 0,
        price: 0,
        sku: "",
    }
})

export default VariationAtom;
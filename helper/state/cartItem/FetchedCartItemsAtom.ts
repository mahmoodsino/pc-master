import { atom } from "recoil";
import { FetchedItems } from "../../interfaces";

const FetchedCartItemsAtom = atom<FetchedItems[]>({
    key:"FetchedCartItemsAtom",
    default:[]
})
export default FetchedCartItemsAtom
import { atom } from "recoil";
import { CartItemsType } from "../../interfaces";

const AllCartsInfoAtom = atom<CartItemsType>({
    key: "AllCartsInfoAtom",
    default: {
        cost_points: 0,
        customer_points: 0,
        delivery_fee: false,
        earned_points: 0,
        items: [],
        sub_total_price: 0,
        tax: "",
        total_price: 0
    }
})

export default AllCartsInfoAtom
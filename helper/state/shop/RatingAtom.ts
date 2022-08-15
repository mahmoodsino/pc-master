import { atom } from "recoil";

const RatingAtom =atom<number>({
    key:"RatingAtom",
    default:0
})
export default RatingAtom
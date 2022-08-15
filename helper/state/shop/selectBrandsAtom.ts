import { atom } from "recoil";

const selectBrandAtom =atom<number[]>({
    key:"selectBrandAtom",
    default:[]
})

export default selectBrandAtom
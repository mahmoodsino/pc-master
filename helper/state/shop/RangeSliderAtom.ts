import { atom } from "recoil";

const RangeSliderAtom = atom<number[]>({
    key:"RangeSliderAtom",
    default:[0,5000]
})

export default RangeSliderAtom
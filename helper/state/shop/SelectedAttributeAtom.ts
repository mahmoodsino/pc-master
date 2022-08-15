import { atom } from "recoil";

const SelectedAttributeAtom =atom<{[key: number]: number[]}>({
    key:"SelectedAttributeAtom",
    default:{} as {[key: number]: number[]}
})

export default SelectedAttributeAtom
import { atom } from "recoil";

const AddressIdAtom = atom<number>({
    key:"AddressIdAtom",
    default:0
})

export default AddressIdAtom
import { atom } from "recoil";
import { BranchsType } from "../../types";

const SelectedBranchAtom = atom<BranchsType>({
    key:"SelectedBranchAtom",
    default:{} as BranchsType
})

export default SelectedBranchAtom
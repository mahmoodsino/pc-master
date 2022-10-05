import { atom } from "recoil";
import { BranchsType } from "../../types";

const BranchesAtom = atom<BranchsType[]>({
    key: "BranchesAtom",
    default: []
}) 
export default BranchesAtom
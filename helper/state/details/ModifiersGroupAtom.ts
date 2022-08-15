import { atom } from "recoil";
import { ModifiersGroupType } from "../../types";

const ModifiersGroupAtom = atom<{[key:string] : ModifiersGroupType[]}>({
    key:"ModifiersGroupAtom",
    default:{} as {[key:string] : ModifiersGroupType[]}
})
export default ModifiersGroupAtom
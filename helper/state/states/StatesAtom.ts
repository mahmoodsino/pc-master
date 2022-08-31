import { atom } from "recoil";
import { stateType } from "../../interfaces";

const StatesAtom = atom<stateType[]>({
    key: "StatesAtom",
    default: [],
  });

  export default StatesAtom
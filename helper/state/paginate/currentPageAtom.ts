import { atom } from "recoil";

const CurrentPageAtom = atom<number>({
    key: "CurrentPageAtom",
    default: 1,
  });

  export default CurrentPageAtom
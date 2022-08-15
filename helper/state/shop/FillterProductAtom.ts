import { atom } from "recoil";

 const FillterProductAtom = atom<boolean>({
    key: "FillterProductAtom",
    default: false,
  });

  export default FillterProductAtom
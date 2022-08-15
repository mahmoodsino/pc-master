import { atom } from "recoil";

 const TokenAtom = atom<string>({
    key:"TokenAtom",
    default:'',
  });

  export default TokenAtom
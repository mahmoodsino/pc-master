import { atom } from "recoil";

 const AddresToDeleteIdAtom = atom<number>({
    key: "addresToDeleteAtom",
    default: -1,
  });

  export default AddresToDeleteIdAtom
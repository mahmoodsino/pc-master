import { atom } from "recoil";

 const OpenEditModelAtom = atom<boolean>({
    key: "OpenEditModelAtom",
    default: false,
  });
  export default OpenEditModelAtom
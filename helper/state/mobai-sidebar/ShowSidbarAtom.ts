import { atom } from "recoil";

 const ShowSidbarAtom = atom<boolean>({
    key: "showSidbarAtom",
    default: false,
  });

  export default ShowSidbarAtom
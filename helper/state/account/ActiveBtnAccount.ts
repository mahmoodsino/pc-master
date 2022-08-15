import { atom } from "recoil";

 const ActiveBtnAccount = atom<string>({
    key: "activeBtnAccountfor active xcv",
    default: "",
  });

  export default ActiveBtnAccount;

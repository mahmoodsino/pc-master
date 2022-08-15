import { atom } from "recoil";
import { profile } from "../../../../components/layouts/account/sections/MainSection";

 const ProfileInfo = atom<profile>({
    key: "informationmal asa",
    default: {
      FirstName: "",
      LastName: "",
      Email: "",
    },
  });

  export default ProfileInfo
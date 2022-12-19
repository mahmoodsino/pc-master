import { atom } from "recoil";
import { addressType } from "../../../../components/layouts/account/sections/AddressBook";

 const EditAddressIdAtom = atom<addressType>({
    key: "EditAddressIdAtom1",
    default: {
      address:"",
      name:"",
      id:-1,
      city_name:"",
      post_code:0,
      is_default:false,
      country_name:""
    },
  });

  export default EditAddressIdAtom
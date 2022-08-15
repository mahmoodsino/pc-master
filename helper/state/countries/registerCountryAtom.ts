import { atom } from "recoil";
import { optionTypeCountry } from "../../interfaces";

const registerCountryAtom = atom<optionTypeCountry[]>({
    key: "registerCountryAtom",
    default: [],
  });

  export default registerCountryAtom
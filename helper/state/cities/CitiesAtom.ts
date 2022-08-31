import { atom } from "recoil";
import { citiesType } from "../../interfaces";

const CitiesAtom = atom<citiesType[]>({
    key: "CitiesAtom",
    default: [],
  });

  export default CitiesAtom
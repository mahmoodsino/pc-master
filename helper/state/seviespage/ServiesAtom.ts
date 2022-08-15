import { atom } from "recoil";
import { ServiesType } from "../../interfaces";

const ServiesAtom = atom<ServiesType[]>({
    key:'ServiesAtom',
    default:[]
})

export default ServiesAtom;
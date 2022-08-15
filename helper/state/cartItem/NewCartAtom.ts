import { atom } from "recoil";
import {  items } from "../../interfaces";


const NewCartAtom = atom<items[]>({
    key:"NewCartAtom",
    default:[]
})

export default NewCartAtom
import { atom } from "recoil";
import { categoriesType } from "../../interfaces";

 const AllCategoriesAtom = atom<categoriesType[]>({
    key:"allCategoriesAtom",
    default:[]
  })

  export default AllCategoriesAtom
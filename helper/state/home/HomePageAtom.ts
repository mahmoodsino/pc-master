import { atom } from "recoil";
import HomePage from "../../types/homePage";

const HomePageAtom =atom<HomePage>({
    key:"HomeSliderAtom",
    default:{
        all_categories:[],
        featured_categories:[],
        slider:[]
        
    }
})

export default HomePageAtom
import { atom } from "recoil";
import { ContactType } from "../../types";

const ContactAtom = atom<ContactType>({
   key:"ContactAtom" ,
   default:{
    email: "",
    phone1:"",
    phone2: "",
    phone3: "",
    location: "",
    fb_link:"",
    insta_link:"",
    tw_link: "",
    lin_link: "",
    yt_link: "",
    img_promo_cover: "",
    img_search_cover: "",
    img_brand_side_img:"",
    img_brand_cover:"",
    img_category_side_img: "",
    img_category_cover:"",
   }
})

export default ContactAtom
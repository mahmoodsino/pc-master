import { atom } from "recoil";
import { DetailsType } from "../../types";

const DetailsAtom = atom<DetailsType>({
    key: "DetailsAtom",
    default: {
        product: {
            brand: {
                id: -1,
                name: "",
                slug: ""
            },
            brand_id: -1,
            company: {
                id: -1,
                logo: "",
                name: "",
            },
            company_id: -1,
            custome_properties: [],
            description: "",
            id: -1,
            images: [],
            name: "",
            seo_description: '',
            seo_keywords: [],
            seo_title: "",
            short_description: "",
            slug: "",
        },
        variations: []
    }
})

export default DetailsAtom
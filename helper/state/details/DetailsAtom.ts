import { atom } from "recoil";
import { DetailsType } from "../../types";

const DetailsAtom = atom<DetailsType>({
    key: "DetailsAtom",
    default: {
        product: {
            avg_rate:0,
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
            seo_keywords: "",
            seo_title: "",
            short_description: "",
            slug: "",
            tracking_type:0
        },
        variations: []
    }
})

export default DetailsAtom
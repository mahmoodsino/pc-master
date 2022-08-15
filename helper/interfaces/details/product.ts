import { Brand, Company } from "../products";
import custome_properties from "./custome_properties";

interface product {
    brand:Brand,
    brand_id:number,
    company:Company,
    company_id:number,
    custome_properties:custome_properties[],
    description:string,
    id:number,
    images:string[],
    name:string,
    seo_description:string,
    seo_keywords:string[],
    seo_title:string,
    short_description:string,
    slug:string
}

export default product;
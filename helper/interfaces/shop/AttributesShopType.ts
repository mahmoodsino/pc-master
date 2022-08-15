import Attribute_valuesShopType from "./Attribute_valuesShopType";

interface AttributesShopType{
    id:number,
    name:string,
    description:string,
    attribute_values:Attribute_valuesShopType[],
    slug:number
}

export default AttributesShopType
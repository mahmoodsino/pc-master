import ModifiersType from "./ModifiersType"

type ModifiersGroupType = {
    id: number,
    slug: string,
    name: string,
    type: string,
    description: string,
    total_price: number,
    value:string,
    point: number,
    modifiers:ModifiersType[]
}
export default ModifiersGroupType
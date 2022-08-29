import { ModifiersType } from "../../types"

interface modifierGroups {
    company_id: number
    description:string
    id: number
    name: string
    slug: string
    total_price: number
    modifiers:ModifiersType[]
    type: string
}

export default modifierGroups;
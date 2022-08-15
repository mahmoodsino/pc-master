import Attributes from "./Attributes"

interface Variation {
    available_quantity:number,
    branch_id: number
    id: number,
    in_stock: number,
    points: number,
    price: number,
    sku: string,
    is_default?:number
    display_order?:number,
    expire_period?:string,
    images?:string[],
    name?:string
    attributes?:Attributes[]

}

export default Variation
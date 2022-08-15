import { product } from "../details"
import { Variation } from "../products"

interface items {
    id?:number
    product_id: number,
    variation_id: number,
    company_id: number,
    branch_id: number,
    quantity: number,
    title: string,
    description: string
    product?:product,
    variation:Variation
  
}

export default items
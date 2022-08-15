import axios from "axios"
import { getConfig } from "../../users/logout/services"


const root =process.env.NEXT_PUBLIC_ROOT


const addToCart = async (token: string,type:number,product_id:number,variation_id:number,company_id:number,branch_id:number,modifierGroup:number[],quantity:number,description:string) => {
    try {
        const res = await axios.post(`${root}/carts`, {
            type: type,
            product_id: product_id,
            variation_id: variation_id,
            company_id: company_id,
            branch_id: branch_id,
            modifierGroup:modifierGroup,
            quantity: quantity,
            description:description
        }, getConfig(token)
        )
        return res.data
    } catch (error) {
        console.log(error)
        alert("some thing went wrong")
        return null
    }
}

export default addToCart
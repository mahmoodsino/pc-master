import axios from "axios"
import { getConfig } from "../../users/logout/services"


const root =process.env.NEXT_PUBLIC_ROOT

const addToWishList = async (token: string, product_id: number, variation_id: number, company_id: number, branch_id: number, quantity: number,title:string, description: string) => {
    try {
        const res = await axios.post(`${root}/wishlists`, {
            product_id: product_id,
            variation_id: variation_id,
            company_id: company_id,
            branch_id: branch_id,
            quantity: quantity,
            title:title,
            description: description
        }, getConfig(token)
        )
        return res.data
    } catch (error) {
        console.log(error)
        return null
    }
}

export default addToWishList
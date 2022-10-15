import apiWorker from "../../axios"
import { getConfig } from "../../users/logout/services"


const root =process.env.NEXT_PUBLIC_ROOT

const getCartItems = async (token: string,branchId:number) => {
    try {
        
        const res = await apiWorker.get(`${root}/branch-carts?branch_id=${branchId}`, getConfig(token)
        )
        return res.data
    } catch (error) {
        console.log(error)
        return null
    }
}

export default getCartItems
import axios from "axios"
import apiWorker from "../../axios"
import { getConfig } from "../../users/logout/services"


const root =process.env.NEXT_PUBLIC_ROOT

const updateWishList = async (token: string,id:number,quantity:number,description:string,title:string) => {
    try {
        const res = await apiWorker.put(`${root}/wishlists/${id}`, {
            quantity: quantity,
            description:description,
            title:title
        }, getConfig(token)
        )
        return res.data
    } catch (error) {
        console.log(error)
        return null
    }
}

export default updateWishList
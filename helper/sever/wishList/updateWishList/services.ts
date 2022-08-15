import axios from "axios"
import { getConfig } from "../../users/logout/services"


const root =process.env.NEXT_PUBLIC_ROOT

const updateWishList = async (token: string,id:number,quantity:number,description:string,title:string) => {
    try {
        const res = await axios.put(`${root}/wishlists/${id}`, {
            quantity: quantity,
            description:description,
            title:title
        }, getConfig(token)
        )
        return res.data
    } catch (error) {
        console.log(error)
        alert("some thing went wrong")

        return null
    }
}

export default updateWishList
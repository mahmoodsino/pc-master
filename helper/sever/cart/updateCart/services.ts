import axios from "axios"
import { getConfig } from "../../users/logout/services"



const root =process.env.NEXT_PUBLIC_ROOT

const updateCart = async (token: string,id:number,quantity:number,description:string) => {
    try {
        const res = await axios.put(`${root}/carts/${id}`, {
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

export default updateCart
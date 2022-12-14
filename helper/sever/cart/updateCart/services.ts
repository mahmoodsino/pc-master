import apiWorker from "../../axios"
import { getConfig } from "../../users/logout/services"



const root =process.env.NEXT_PUBLIC_ROOT

const updateCart = async (token: string,id:number,quantity:number,description:string) => {
    try {
        const res = await apiWorker.put(`${root}/carts/${id}`, {
            quantity: quantity,
            description:description
        }, getConfig(token)
        )
        return res.data
    } catch (error) {
        console.log(error)
        return null
    }
}

export default updateCart
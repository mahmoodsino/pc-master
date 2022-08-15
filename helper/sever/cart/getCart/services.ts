import axios from "axios"
import { getConfig } from "../../users/logout/services"


const root =process.env.NEXT_PUBLIC_ROOT

const getCart = async (token: string) => {
    try {
        const res = await axios.get(`${root}/carts`, getConfig(token)
        )
        return res.data
    } catch (error) {
        console.log(error)
        alert("some thing went wrong")

        return null
    }
}

export default getCart
import axios from "axios"
import { getConfig } from "../../logout/services"


const root =process.env.NEXT_PUBLIC_ROOT

const getAddress = async (token:string) => {
    try {
        const res = await axios.get(`${root}/address`,  getConfig(token))
        return res.data
    } catch (error) {
        console.log(error)
        alert("some thing went wrong")

        return null
    }
}


export default getAddress
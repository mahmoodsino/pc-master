import axios from "axios"
import { getConfig } from "../../logout/services"


const root =process.env.NEXT_PUBLIC_ROOT

const deleteAddress = async (token:string,id:number|string) => {
    try {
        const res = await axios.delete(`${root}/address/${id}`, getConfig(token))
        return res.data
    } catch (error) {
        console.log(error)
        return null
    }
}
export default deleteAddress
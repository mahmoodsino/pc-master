import axios from "axios"
import { getConfig } from "../../../users/logout/services"


const root = process.env.NEXT_PUBLIC_ROOT

const checkRewiewable = async (token: string, id: number) => {
    try {
        const res = await axios.get(`${root}/reviews/${id}/check-reviewable
        `, getConfig(token))
        return res.data
    } catch (error) {
        console.log(error)
        return error
    }
}
export default checkRewiewable
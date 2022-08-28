
import axios from "axios"
import { getConfig } from "../../../users/logout/services"
const root = process.env.NEXT_PUBLIC_PAY
const handelWriteReview = async (token: string, id: number,rate:number,text:string) => {
    try {
        const res = await axios.post(`${root}/reviews`, {
            rate: rate,
            text: text,
            product_id: id
        }, getConfig(token))
        return res.data
    } catch (error) {
        console.log(error)
        alert("some thing went wrong")
        return null
    }
}
export default handelWriteReview

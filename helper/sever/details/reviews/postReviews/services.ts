
import apiWorker from "../../../axios"
import { getConfig } from "../../../users/logout/services"
const root = process.env.NEXT_PUBLIC_ROOT
const handelWriteReview = async (token: string, id: number,rate:number,text:string) => {
    try {
        const res = await apiWorker.post(`${root}/reviews`, {
            rate: rate,
            text: text,
            product_id: id
        }, getConfig(token))
        return res.data
    } catch (error) {
        console.log(error)
        return null
    }
}
export default handelWriteReview

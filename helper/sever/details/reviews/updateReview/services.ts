
import axios from "axios"
import apiWorker from "../../../axios"
import { getConfig } from "../../../users/logout/services"
const root = process.env.NEXT_PUBLIC_ROOT
const handelUpdateReview = async (token: string, id: number,rate:number,text:string) => {
    try {
        const res = await apiWorker.put(`${root}/reviews/${id}`, {
            rate: rate,
            text: text,
        }, getConfig(token))
        return res.data
    } catch (error) {
        console.log(error)
        return null
    }
}
export default handelUpdateReview


import apiWorker from "../../../axios"
import { getConfig } from "../../../users/logout/services"
const root = process.env.NEXT_PUBLIC_ROOT
const handelDeleteReview = async (token: string, id: number) => {
    try {
        const res = await apiWorker.delete(`${root}/reviews/${id}`, getConfig(token))
        return res.data
    } catch (error) {
        console.log(error)
        return null
    }
}
export default handelDeleteReview

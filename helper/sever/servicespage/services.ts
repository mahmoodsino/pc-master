import axios from "axios"
import apiWorker from "../axios"

const root =process.env.NEXT_PUBLIC_ROOT

const getServiesInfo = async () => {
    try {
        const res = await apiWorker.get(`${root}/services?company_id=1`)
        return res.data
    } catch (error) {
        console.log(error)
        return null
    }
}
export default getServiesInfo
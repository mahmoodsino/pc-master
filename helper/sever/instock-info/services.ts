import axios from "axios"
import apiWorker from "../axios"

const root =process.env.NEXT_PUBLIC_ROOT

const getInstockInfo = async (productId:number) => {
    try {
        const res = await apiWorker.get(`${root}/products/${productId}/stock-info`)
        return res.data
    } catch (error) {
        console.log(error)
        return null
    }
}
export default getInstockInfo
import axios from "axios"
import apiWorker from "../axios"
import { getConfig } from "../users/logout/services"

const root = process.env.NEXT_PUBLIC_ROOT

const getOrder = async (token:string) => {
    try {
        const res = await apiWorker.get(`${root}/orders?branch=1`,  getConfig(token))
        return res.data
    } catch (error) {
        console.log(error)
        return null
    }
}
export default getOrder
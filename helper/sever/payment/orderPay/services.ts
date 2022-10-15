import axios from "axios"
import apiWorker from "../../axios"
import { getConfig } from "../../users/logout/services"
const root = process.env.NEXT_PUBLIC_ROOT
const handelOrderPay = async (token:string,order_id: number, payment_provider_id: number) => {
    try {
        const res = await apiWorker.post(`${root}/orders/pay`, {
            order_id: order_id,
            payment_provider_id: payment_provider_id
        },getConfig(token))
        return res.data
    } catch (error) {
        console.log(error)
        return null
    }
}
export default handelOrderPay
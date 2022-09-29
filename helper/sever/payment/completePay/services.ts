import axios from "axios"
import { getConfig } from "../../users/logout/services"
const root = process.env.NEXT_PUBLIC_ROOT
const handelComletePay = async (token:string,payment_transaction_id: number) => {
    try {
        const res = await axios.post(`${root}/orders/payments/complete`, {
            payment_transaction_id:payment_transaction_id
        },getConfig(token))
        return res.data
    } catch (error) {
        console.log(error)
        return null
    }
}
export default handelComletePay
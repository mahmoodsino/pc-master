import axios from "axios"
import apiWorker from "../../axios"
const root = process.env.NEXT_PUBLIC_PAYMENT
const pay =process.env.NEXT_PUBLIC_PAYMENT_KEY

const getPaymentProvidor = async (branchId:number) => {
    try {
        const res = await apiWorker.get(`${root}/payment-way/payment-providers?is_enabled=1&branch_id=${branchId}`,{
            headers:{
                "D-PAYMENT-AUTHORIZATION":`${pay}`
            }
        })
        return res.data
    } catch (error) {
        console.log(error)
        return null
    }
}
export default getPaymentProvidor
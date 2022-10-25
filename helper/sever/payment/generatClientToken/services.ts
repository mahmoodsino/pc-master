import apiWorker from "../../axios"
const root = process.env.NEXT_PUBLIC_PAY
const pay =process.env.NEXT_PUBLIC_PAYMENT_KEY
const getClientToken = async (payment_provider_id:number,token:string) => {
    try {
        const res = await apiWorker.post(`${root}/orders/payments/client-token`,{
            payment_provider_id:payment_provider_id,
        },{    headers:{
            "D-PAYMENT-AUTHORIZATION":`${pay}`,
            Authorization: `Bearer ${token}`
        },}
        )
        return res.data
    } catch (error) {
        console.log(error)
        return null
    }
}
export default getClientToken
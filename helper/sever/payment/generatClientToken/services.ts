import axios from "axios"
const root = process.env.NEXT_PUBLIC_PAY
const getClientToken = async (payment_provider_id:number,token:string) => {
    try {
        const res = await axios.post(`${root}/orders/payments/client-token`,{
            payment_provider_id:payment_provider_id,
        },{    headers:{
            "D-PAYMENT-AUTHORIZATION":"PK_1_hotRfa92y3evEh5U9rZD&1|6945631679^WPMb8V0Ie3f6OhzXq5xK",
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
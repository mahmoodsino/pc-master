import axios from "axios"
const root = process.env.NEXT_PUBLIC_PAYMENT
const getPaymentProvidor = async () => {
    try {
        const res = await axios.get(`${root}/payment-way/payment-providers?is_enabled=1&branch_id=1`,{
            headers:{
                "D-PAYMENT-AUTHORIZATION":"PK_1_hotRfa92y3evEh5U9rZD&1|6945631679^WPMb8V0Ie3f6OhzXq5xK"
            }
        })
        return res.data
    } catch (error) {
        console.log(error)
        return null
    }
}
export default getPaymentProvidor
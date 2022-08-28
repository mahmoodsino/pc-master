import axios from "axios"
const root = process.env.NEXT_PUBLIC_PAYMENT
const getPaymentProvidor = async () => {
    try {
        const res = await axios.get(`${root}/payment-way/payment-providers?is_enabled=1&branch_id=1`,{
            headers:{
                "D-PAYMENT-AUTHORIZATION":"PK_1_tCxdXbDjnPVFgRSMeXMK&1|3107166041^aMcY4cmO0Qa1aPZiSVfK"
            }
        })
        return res.data
    } catch (error) {
        console.log(error)
        alert("some thing went wrong")
        return null
    }
}
export default getPaymentProvidor
import axios from "axios"
const root = process.env.NEXT_PUBLIC_PAYMENT
const getPaymentProvidor = async () => {
    try {
        const res = await axios.get(`${root}/payment-way/payment-providers`)
        return res.data
    } catch (error) {
        console.log(error)
        alert("some thing went wrong")
        return null
    }
}
export default getPaymentProvidor
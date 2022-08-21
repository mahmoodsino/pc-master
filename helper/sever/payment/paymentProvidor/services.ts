import axios from "axios"
const root = process.env.NEXT_PUBLIC_PAYMENT
const getPaymentProvidor = async () => {
    try {
        const res = await axios.get(`${root}/payment-way/payment-providers`,{
            headers:{
                "D-PAYMENT-AUTHORIZATION":"PK_1_OFJ6hbNa3BZ86vcYFe6a&1|7612616003^HZ8CG7Kl6QLpdYmVD0ns"
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
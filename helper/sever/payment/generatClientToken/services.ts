import axios from "axios"
const root = process.env.NEXT_PUBLIC_PAYMENT
const getClientToken = async (payment_provider_id:number,id:number,email:string) => {
    try {
        const res = await axios.post(`${root}/payment-way/customers/token`,{
            payment_provider_id:payment_provider_id,
            user:{
                id:id,
                email:email
            },
        },{    headers:{
            "D-PAYMENT-AUTHORIZATION":"PK_1_OFJ6hbNa3BZ86vcYFe6a&1|7612616003^HZ8CG7Kl6QLpdYmVD0ns"
        },}
        )
        return res.data
    } catch (error) {
        console.log(error)
        alert("some thing went wrong")

        return null
    }
}
export default getClientToken
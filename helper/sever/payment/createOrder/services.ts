import axios from "axios"
import { getConfig } from "../../users/logout/services"
const root = process.env.NEXT_PUBLIC_PAY
const getOrderID = async (token: string, address_id: number, payment_provider_id: number,first_name:string,last_name:string,email:string,phone:number) => {
    try {
        const res = await axios.post(`${root}/orders`, {
            first_name: first_name,
            last_name: last_name,
            email: email,
            phone: `${phone}`,
            description: "hello",
            address_id: address_id,
            branch_id: 1,
            payment_provider_id: payment_provider_id
        }, getConfig(token))
        return res.data
    } catch (error) {
        console.log(error)
        alert("some thing went wrong")

        return null
    }
}
export default getOrderID

import axios from "axios"
import { getConfig } from "../../users/logout/services"
const root = process.env.NEXT_PUBLIC_PAY
const handelCrateOrder = async (token: string,shipping_method:string, address_id?: number) => {
    try {
        const res = await axios.post(`${root}/orders`, {
            description: "hello",
            branch_id: 1,
            shipping_method:shipping_method,
            address_id: address_id
        }, getConfig(token))
        return res.data
    } catch (error) {
        console.log(error)
        alert("some thing went wrong")
        return null
    }
}
export default handelCrateOrder

import axios from "axios"
import { getConfig } from "../logout/services"


const root =process.env.NEXT_PUBLIC_ROOT

 const handelItemGuestToUser = async (token:string,guest_user_id:number) => {
    try {
        const res = await axios.post(`${root}/user/convey_assets`, {
            guest_user_id:guest_user_id,
          },getConfig(token))
        return res.data
    } catch (error) {
        console.log(error)
        alert("some thing went wrong")

        return error
    }
} 


export default handelItemGuestToUser
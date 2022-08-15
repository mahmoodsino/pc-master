import axios from "axios"
import { getConfig } from "../logout/services"


const root =process.env.NEXT_PUBLIC_ROOT

 const handelLogin = async (password:string,email:string,token?:string|null) => {
    try {
        const res = await axios.post(`${root}/user/login`, {
            email:email,
            password :password
          },getConfig(token))
        return res.data
    } catch (error) {
        console.log(error)
        return error
    }
} 


export default handelLogin
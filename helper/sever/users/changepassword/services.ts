import axios from "axios"
import { getConfig } from "../logout/services"


const root =process.env.NEXT_PUBLIC_ROOT

const handelChangePassword = async (token:string,password:string,new_password:string,conf_password:string) => {
    try {
        const res = await axios.post(`${root}/user/change-password`, {
                    password: password,
                    new_password: new_password,
                    conf_password: conf_password
        }, getConfig(token))
        return res.data
    } catch (error) {
        console.log(error)
        return error
    }
}
export default handelChangePassword
import axios from "axios"
import {getConfig} from "../logout/services"

const root =process.env.NEXT_PUBLIC_ROOT


const handelUpdateUser = async (first_name:string, last_name:string, email:string, token:string) => {
    try {
        const res = await axios.post(`${root}/user/update`, {
            first_name: first_name,
            last_name: last_name,
            email: email,
        },getConfig(token))
        return res.data
    } catch (error) {
        console.log(error)
        alert("some thing went wrong")

        return null
    }
}


export default handelUpdateUser
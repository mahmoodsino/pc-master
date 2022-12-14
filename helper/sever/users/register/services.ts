import axios from "axios"
import apiWorker from "../../axios"
import { getConfig } from "../logout/services"


const root =process.env.NEXT_PUBLIC_ROOT


const handelRegister = async (first_name: string, last_name: string, email: string, password: string, country_id: string,state_id:number,city_id:number, city_name: string, post_code:number, build_number:number,token?:string|null) => {
    try {
        const res = await apiWorker.post(`${root}/user/register`, {
            first_name: first_name,
            last_name: last_name,
            email: email,
            password: password,
            country_id: country_id,
            state_id:state_id,
            city_id:city_id,
            city_name: city_name,
            post_code: post_code,
            build_number: build_number
        },getConfig(token))
        return res.data
    } catch (error) {
        return null
    }
}


export default handelRegister
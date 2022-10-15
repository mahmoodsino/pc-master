import axios from "axios"
import apiWorker from "../../../axios"
import { getConfig } from "../../logout/services"


const root =process.env.NEXT_PUBLIC_ROOT

const handelUpdateAddress = async (id:number|string,name:string,address:string,country_id:string,state_id:number,city_id:number,city_name:string,post_code:number,build_number:number,is_default:boolean,token:string) => {
    try {
        const res = await apiWorker.put(`${root}/address/${id}`, {
            name: name,
            address:address,
            country_id:country_id,
            state_id:state_id,
            city_id:city_id,
            city_name:city_name,
            post_code:`${post_code}`,
            build_number:`${build_number}`,
            is_default:is_default
        }, getConfig(token))
        return res.data
    } catch (error) {
        console.log(error)
        return null
    }
}


export default handelUpdateAddress
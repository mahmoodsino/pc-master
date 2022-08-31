import axios from "axios"
import { getConfig } from "../../logout/services"


const root =process.env.NEXT_PUBLIC_ROOT

const handelAddAress = async (name:string,address:string,country_id:string,state_id:number,city_id:number,city_name:string,post_code:number,build_number:number,is_default:boolean,token:string) => {
    try {
        const res = await axios.post(`${root}/address`, {
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
        // alert(error.response.data.errors.email)

        console.log(error)
        alert("some thing went wrong")

        return null
    }
}


export default handelAddAress
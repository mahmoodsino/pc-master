import apiWorker from "../../../axios"
import { getConfig } from "../../../users/logout/services"


const root = process.env.NEXT_PUBLIC_ROOT

const checkRewiewable = async (token: string, id: number) => {
    try {
        const res = await apiWorker.get(`${root}/reviews/${id}/check-reviewable
        `, getConfig(token))
        return res.data
    } catch (error:any) {
        console.log(error)
        if(error?.response.status==400){
            return error?.response.status
        }else{
            return null
        }
    }
}
export default checkRewiewable
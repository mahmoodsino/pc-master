import axios from "axios"
import apiWorker from "../../axios"



const root =process.env.NEXT_PUBLIC_ROOT


const handelRegisterAsGuest = async () => {
    try {
        const res = await apiWorker.post(`${root}/user/guest_register`)
        return res.data
    }
     catch (error) {
        console.log(error)
        return null
    }
}

export default handelRegisterAsGuest;
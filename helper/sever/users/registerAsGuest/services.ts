import axios from "axios"



const root =process.env.NEXT_PUBLIC_ROOT


const handelRegisterAsGuest = async () => {
    try {
        const res = await axios.post(`${root}/user/guest_register`)
        return res.data
    }
     catch (error) {
        console.log(error)
        return null
    }
}

export default handelRegisterAsGuest;
import axios from "axios"
import apiWorker from "../../axios";




export const getConfig = (token?: string|null) => {
    return {
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
            "company-id": 1,
            Authorization: `Bearer ${token}`,
        },
    };
};


const root =process.env.NEXT_PUBLIC_ROOT


const handelLogout = async (token: string) => {
    try {
        const res = await apiWorker.post(`${root}/user/logout`, {}, getConfig(token))
        return res.data
    } catch (error) {
        console.log(error)
        return null
    }
}


export default handelLogout
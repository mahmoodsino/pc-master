import axios from "axios"

const root =process.env.NEXT_PUBLIC_ROOT

const getWorkingHours = async () => {
    try {
        const res = await axios.get(`${root}/open-close-times?branch_id=1`)
        return res.data
    } catch (error) {
        console.log(error)
        return null
    }
}
export default getWorkingHours
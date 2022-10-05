import axios from "axios"

const root =process.env.NEXT_PUBLIC_ROOT

const getWorkingHours = async (branchId:number) => {
    try {
        const res = await axios.get(`${root}/open-close-times?branch_id=${branchId}`)
        return res.data
    } catch (error) {
        console.log(error)
        return null
    }
}
export default getWorkingHours
import apiWorker from "../../axios"

const root =process.env.NEXT_PUBLIC_ROOT

const getWorkingHours = async (branchId:number) => {
    try {
        const res = await apiWorker.get(`${root}/open-close-times?branch_id=${branchId}`)
        return res.data
    } catch (error) {
        console.log(error)
        return null
    }
}
export default getWorkingHours
import apiWorker from "../axios"

const root =process.env.NEXT_PUBLIC_ROOT

const getContactInfo = async () => {
    try {
        const res = await apiWorker.get(`${root}/info`)
        return res.data
    } catch (error) {
        console.log(error)
        return null
    }
}
export default getContactInfo
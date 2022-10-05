import axios from "axios"

const root =process.env.NEXT_PUBLIC_ROOT

const getBranches = async () => {
    try {
        const res = await axios.get(`${root}/branches?online=1&company=1`)
        return res.data
    } catch (error) {
        console.log(error)
        return null
    }
}
export default getBranches
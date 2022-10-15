import apiWorker from "../axios"

const root =process.env.NEXT_PUBLIC_ROOT

 const getCategories = async () => {
    try {
        const res = await apiWorker.get(`${root}/home`)
        return res.data
    } catch (error) {
        console.log(error)
        return null
    }
} 
export default getCategories
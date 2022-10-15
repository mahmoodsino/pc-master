import axios from "axios"
import apiWorker from "../../axios"


const root =process.env.NEXT_PUBLIC_ROOT

 const getCountries = async () => {
    try {
        const res = await apiWorker.get(`${root}/all-countries`)
        return res.data
    } catch (error) {
        console.log(error)
        return null
    }
} 


export default getCountries
import axios from "axios"


const root =process.env.NEXT_PUBLIC_ROOT

 const getCountries = async () => {
    try {
        const res = await axios.get(`${root}/countries`)
        return res.data
    } catch (error) {
        console.log(error)
        return null
    }
} 


export default getCountries
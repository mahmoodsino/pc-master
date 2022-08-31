import axios from "axios"


const root =process.env.NEXT_PUBLIC_ROOT

 const getStateOfCountry = async (id:number) => {
    try {
        const res = await axios.get(`${root}/all-states/${id}`)
        return res.data
    } catch (error) {
        console.log(error)
        return null
    }
} 


export default getStateOfCountry
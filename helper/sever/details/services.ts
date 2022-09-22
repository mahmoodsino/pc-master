import axios from "axios"


const root =process.env.NEXT_PUBLIC_ROOT

 const getDetails = async (id:number) => {
    try {
        const res = await axios.get(`${root}/products/${id}` , {
            headers: {
              'branch-id': 1
            }
          })
        return res.data
    } catch (error) {
        console.log(error)
        return null
    }
} 
export default getDetails
import axios from "axios"


const root =process.env.NEXT_PUBLIC_ROOT

 const getProductModifiers = async (id:number) => {
    try {
        const res = await axios.get(`${root}/products/${id}/modifiers` , {
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
export default getProductModifiers
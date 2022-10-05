import axios from "axios"

const root =process.env.NEXT_PUBLIC_ROOT

const getInstockInfo = async (productId:number) => {
    try {
        const res = await axios.get(`${root}/products/${productId}/stock-info`)
        return res.data
    } catch (error) {
        console.log(error)
        return null
    }
}
export default getInstockInfo
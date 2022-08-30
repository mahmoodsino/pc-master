import axios from "axios"


const root = process.env.NEXT_PUBLIC_ROOT


const getSimilarProducts = async (token:string,id: number) => {
    try {
            const res = await axios.get(`${root}/products/${id}/similar`, {
                headers: {
                    "branch_id": 1,
                    "company-id": 1,
                    Authorization: `Bearer ${token}`
                }
            })
            return res.data
    } catch (error) {
        console.log(error)
        return null
    }
}

export default getSimilarProducts
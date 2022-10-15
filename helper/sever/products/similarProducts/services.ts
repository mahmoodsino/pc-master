import apiWorker from "../../axios"


const root = process.env.NEXT_PUBLIC_ROOT


const getSimilarProducts = async (token:string,id: number,branhId:number) => {
    try {
            const res = await apiWorker.get(`${root}/products/${id}/similar`, {
                headers: {
                    "branch-id": branhId,
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
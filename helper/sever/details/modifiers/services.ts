import apiWorker from "../../axios"


const root =process.env.NEXT_PUBLIC_ROOT

 const getProductModifiers = async (id:number,branchID:number) => {
    try {
        const res = await apiWorker.get(`${root}/products/${id}/modifiers` , {
            headers: {
              'branch-id': branchID ? branchID : "1"            }
          })
        return res.data
    } catch (error) {
        console.log(error)
        return null
    }
} 
export default getProductModifiers
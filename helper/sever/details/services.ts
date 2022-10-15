import apiWorker from "../axios"


const root =process.env.NEXT_PUBLIC_ROOT

 const getDetails = async (id:number,branchId:number) => {
    try {
        const res = await apiWorker.get(`${root}/products/${id}` , {
            headers: {
              'branch-id': branchId
            }
          })
        return res.data
    } catch (error) {
        console.log(error)
        return null
    }
} 
export default getDetails
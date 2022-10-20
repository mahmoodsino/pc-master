import apiWorker from "../../axios"


const root = process.env.NEXT_PUBLIC_ROOT


const handelFilterProduct = async (branchId:number) => {
    try {
            const res = await apiWorker.get(`${root}/products/filters`, {
                headers: {
                    'branch-id': branchId ? branchId : "1"  ,
                    "company-id": 1,
                }
            })
            return res.data
    } catch (error) {
        console.log(error)
        return null
    }
}

export default handelFilterProduct
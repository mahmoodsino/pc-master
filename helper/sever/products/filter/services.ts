import axios from "axios"


const root = process.env.NEXT_PUBLIC_ROOT


const handelFilterProduct = async () => {
    try {
            const res = await axios.get(`${root}/products/filters`, {
                headers: {
                    "branch_id": 1,
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
import axios from "axios"


const root = process.env.NEXT_PUBLIC_ROOT


const getfeaturedProducts = async (token:string,id?: number) => {
    try {
        if (id) {
            const res = await axios.get(`${root}/products?page_size=5&is_featured=1&category=${id}`, {
                headers: {
                    'branch_id': 1,
                    Authorization: `Bearer ${token}`
                }
            })
            return res.data
        } else {

            const res = await axios.get(`${root}/products?page_size=5&is_featured=1`, {
                headers: {
                    'branch_id': 1,
                    Authorization: `Bearer ${token}`
                }
            })
            return res.data
        }




    } catch (error) {
        console.log(error)
        alert("some thing went wrong")

        return null
    }
}

export default getfeaturedProducts
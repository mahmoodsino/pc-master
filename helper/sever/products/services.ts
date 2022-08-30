import axios from "axios"


const root = process.env.NEXT_PUBLIC_ROOT

const getProducts = async (token?: string, name?: string, id?: number, arrayId?: number[], orderBy?: string) => {
  try {
    if (name) {
      const res = await axios.get(`${root}/products?product_name=${name ? name : ""}`, {
        headers: {
          "branch-id": 1,
          "company-id": 1,
          Authorization: `Bearer ${token}`
        }
      })
      return res.data
    } else if (id && id > 0) {
      const res = await axios.get(`${root}/products?category=${id}`, {
        headers: {
          "branch-id": 1,
          "company-id": 1,
          Authorization: `Bearer ${token}`
        }
      })
      return res.data
    } else if (arrayId && arrayId.length > 0) {
      const res = await axios.get(`${root}/products?category=${arrayId}`, {
        headers: {
          "branch-id": 1,
          "company-id": 1,
          Authorization: `Bearer ${token}`
        }
      })

      return res.data
    } else if (name && id) {
      const res = await axios.get(`${root}/products?product_name=${name ? name : ""}&category=${id}`, {
        headers: {
          "branch-id": 1,
          "company-id": 1,
          Authorization: `Bearer ${token}`
        }
      })
      return res.data
    } else if (orderBy) {
      const res = await axios.get(`${root}/products?${orderBy} `, {
        headers: {
          "branch-id": 1,
          "company-id": 1,  
          Authorization: `Bearer ${token}`
        }
      })
      return res.data
    }
    else {

      const res = await axios.get(`${root}/products`, {
        headers: {
          "branch-id": 1,
          "company-id": 1,
          Authorization: `Bearer ${token}`
        },
      })
      return res.data
    }
  } catch (error) {
    console.log(error)
    alert("some thing went wrong")

    return null
  }
}
export default getProducts
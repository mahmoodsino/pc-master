import axios from "axios"

const root = process.env.NEXT_PUBLIC_ROOT

interface Params {
  token?: string,
  categoryId?: number | number[]
  product_name?: string
  orderBy?: string
  Brands?: number[]
  AttributeValues?: { [key: number]: number[] }
  MinPrice?: number
  MaxPrice?: number
  rate?: number
  page?:number
}

const getProducts = async (params: Params) => {
  try {
    const res = await axios.get(`${root}/products?${params.orderBy ? params.orderBy : "OrderByNewest"}&page_size=25`, {
      headers: {
        "branch-id": 1,
        "company-id": 1,
        Authorization: `Bearer ${params.token}`
      },
      params: {
        category: params.categoryId,
        product_name: params.product_name,
        Brand: params.Brands,
        AttributeValues: JSON.stringify(params.AttributeValues),
        MinPrice: params.MinPrice,
        MaxPrice: params.MaxPrice,
        rate: params.rate,
        page:params.page
      }
    })
    return res.data
  } catch (error) {
    console.log(error)
    return null
  }
}
export default getProducts
import axios from "axios"


const root = process.env.NEXT_PUBLIC_ROOT


const shopFilterProducts = async (token?:string,Brands?: number[], Category?: number[], MinPrice?: number,MaxPrice?:number, rate?: number, AttributeValues?: { [key: number]: number[] }) => {
    try {
        const res = await axios.get(`${root}/products`,{
            headers:{
                Authorization: `Bearer ${token}`,
                "branch_id":1,
                "company-id":1
            },
            params:{
                Brands:Brands,
                Category:Category,
                MinPrice:MinPrice,
                MaxPrice:MaxPrice,
                rate:rate,
                AttributeValues:JSON.stringify(AttributeValues)
            }
        })
        return res.data
    } catch (error) {
        console.log(error);
        return null
        
    }
}

export default shopFilterProducts


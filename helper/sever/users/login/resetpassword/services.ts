import axios from "axios"


const root =process.env.NEXT_PUBLIC_ROOT

 const handelnewPassword = async (email:string,reset_code:number,password:string) => {
    try {
        const res = await axios.post(`${root}/user/reset_password` , {
            email: email,
            reset_code:reset_code,
            password:password

          })
        return res.data
    } catch (error) {
        console.log(error)
        return null
    }
} 


export default handelnewPassword




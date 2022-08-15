import axios from "axios"


const root =process.env.NEXT_PUBLIC_ROOT

const handelResetPassword = async (email:string,reset_code:number) => {
    try {
        const res = await axios.post(`${root}/user/reset` , {
            email: email,
            reset_code:reset_code
          })
        return res.data
    } catch (error) {
        console.log(error)
        return error
    }
} 


export default handelResetPassword
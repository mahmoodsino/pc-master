import axios from "axios"


const root =process.env.NEXT_PUBLIC_ROOT

 const handelForgetPassword = async (email:string) => {
    try {
        const res = await axios.post(`${root}/user/forget`, {
            email: email
          })
        return res.data
    } catch (error) {
        console.log(error)
        alert("some thing went wrong")

        return error
    }
} 


export default handelForgetPassword




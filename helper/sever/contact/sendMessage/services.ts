import apiWorker from "../../axios"

const root = process.env.NEXT_PUBLIC_ROOT

const handelSendMessage = async (name:string,email:string,message:string) => {
    try {
        const res = await apiWorker.post(`${root}/send-message`, {
            company_id: 1,
            name:name ,
            email: email,
            message: message
        })
        return res.data
    } catch (error) {
        console.log(error)
        return null
    }
}
export default handelSendMessage
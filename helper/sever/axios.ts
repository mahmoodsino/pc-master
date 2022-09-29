import axios from "axios";
const root =process.env.NEXT_PUBLIC_ROOT

axios.create({
    baseURL:`root/`
})
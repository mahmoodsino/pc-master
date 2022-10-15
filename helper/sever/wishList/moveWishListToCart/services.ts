

import axios from "axios"
import apiWorker from "../../axios"
import { getConfig } from "../../users/logout/services"


const root =process.env.NEXT_PUBLIC_ROOT

const handelMoveWishListToCart = async (token: string,id:number) => {
    try {
        const res = await apiWorker.post(`${root}/wishlists/${id}/move-to-cart`, {
        }, getConfig(token)
        )
        return res.data
    } catch (error) {
        console.log(error)
        return null
    }
}

export default handelMoveWishListToCart;
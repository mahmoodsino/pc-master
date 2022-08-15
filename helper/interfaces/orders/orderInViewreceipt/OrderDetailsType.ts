import { items } from "../../cartItems"
import PaymentTransactionsType from "./PaymentTransactionsType"

interface OrderDetailsTyps {
    id: number,
    number: string,
    created_at: string,
    sub_total: number,
    user_name: string,
    user_email: string,
    discount: number,
    delivery_fee: number,
    total: number,
    earning: number,
    user_id: number,
    branch_id: number,
    country_name: string,
    city_name: string,
    post_code: string,
    address: {
        address: string
        build_number: string
        city_name: string
        name: string
        post_code: string
        street: null
    },
    delivery_date: number,
    pickup_address: string,
    description: number,
    tax: number,
    payment_transactions: PaymentTransactionsType[]
    items: items[]
}

export default OrderDetailsTyps
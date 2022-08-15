import { atom } from "recoil";
import { paymentType } from "../../../../components/layouts/account/sections/PaymentMethod";

 const PaymentAtom =atom<paymentType>({
    key:"pymentAtom11",
    default:{
        CreditCard:"---",
        CardholderName:"---",
        ExpiryDate:"---"
    }
})

export default PaymentAtom
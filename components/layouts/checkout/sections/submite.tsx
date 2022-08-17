import {
  PayPalScriptProvider,
  PayPalHostedFieldsProvider,
  PayPalHostedField,
  usePayPalHostedFields,
} from "@paypal/react-paypal-js";
import { useRecoilState } from "recoil";
import { AddresToDeleteIdAtom, getOrderID, TokenAtom } from "../../../../helper";
import { clientTokenAtom } from "./PaypalH";

const SubmitPayment = () => {
//   Here declare the variable containing the hostedField instance
  const hostedFields = usePayPalHostedFields();

  const submitHandler = () => {
    if (typeof hostedFields?.cardFields?.submit !== "function") return; // validate that `submit()` exists before using it
    hostedFields.cardFields
      ?.submit({
        // The full name as shown in the card and billing address
        cardholderName: "John Wick",
      })
      .then((order) => {
        const { orderId } = order;
        console.log(orderId);

        // fetch(
        //     "/your-server-side-integration-endpoint/capture-payment-info"
        // )
        //     .then((response) => response.json())
        //     .then((data) => {
        //         // Inside the data you can find all the information related to the payment
        //     })
        //     .catch((err) => {
        //         // Handle any error
        //     });
      }).catch(err => {
        console.log(err);
        
      })
  };

  return <button onClick={submitHandler}>Pay</button>;
};

export default function App() {
  const [token, setToken] = useRecoilState(TokenAtom);
  const [clientToken, setClientToken] = useRecoilState(clientTokenAtom);
  const [addressId,setAddressId]= useRecoilState(AddresToDeleteIdAtom)


  return (
    // <PayPalScriptProvider
    //   options={{
    //     "client-id":
    //     "AbkWR5ioTXhb4dyzytwYW-VopjEJ9N4Wy4Zs7kHrgVIYHs-q9_mnC-jWcrK2sPeUwjovv0qquLczIxLc",
    //   components: "buttons,hosted-fields",
    //   "data-client-token": clientToken,
    //   }}
    // >
    //   <PayPalHostedFieldsProvider
    //     createOrder={() => {
    //       return getOrderID(token,addressId)
    //         .then((res) => {
    //           console.log(res);
    //           console.log("some");
    //           //  setPay(res.result.payment_transaction.id)
    //           return res;
    //         })
    //         .then((order) => order.id)
    //         .catch((err) => {
    //           // Handle order creation error
    //           console.log(err);

    //           //    showLoader(false);
    //           //    showErrorMsg(true);
    //           //    setErrorMsg(err);
    //         });
    //     }}
    //   >
    //     <PayPalHostedField
    //       id="card-number"
    //       className="card-field"
    //       hostedFieldType="number"
    //       options={{
    //         selector: "#card-number",
    //         placeholder: "4111 1111 1111 1111",
    //       }}
    //     />
    //     <PayPalHostedField
    //       id="cvv"
    //       className="card-field"
    //       hostedFieldType="cvv"
    //       options={{
    //         selector: "#cvv",
    //         placeholder: "123",
    //       }}
    //     />
    //     <PayPalHostedField
    //       id="expiration-month-1"
    //       className="card-field"
    //       hostedFieldType="expirationMonth"
    //       options={{
    //         selector: "#expiration-month-1",
    //         placeholder: "MM",
    //       }}
    //     />
    //     <PayPalHostedField
    //       id="expiration-year-1"
    //       className="card-field"
    //       hostedFieldType="expirationYear"
    //       options={{
    //         selector: "#expiration-year-1",
    //         placeholder: "YYYY",
    //       }}
    //     />
    //     <SubmitPayment />
    //   </PayPalHostedFieldsProvider>
    // </PayPalScriptProvider>
    <div></div>
  );
}

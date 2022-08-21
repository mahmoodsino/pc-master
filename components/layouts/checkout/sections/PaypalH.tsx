// import { useState, useRef, useEffect } from "react";
// import {
//   PayPalScriptProvider,
//   PayPalHostedFieldsProvider,
//   PayPalHostedField,
//   usePayPalHostedFields
// } from "@paypal/react-paypal-js";
// import { Spinner } from "../../../spinner";
import { AddresToDeleteIdAtom, getClientToken, TokenAtom } from "../../../../helper";
// import { atom, useRecoilState } from "recoil";


// export const clientTokenAtom = atom({
//   key:"clientTokenAtom",
//   default:""
// })

// export const PaymentForm = () => {
//   const [loader, showLoader] = useState(false);
//   const [success, showSuccess] = useState(false);
//   const [error, showErrorMsg] = useState(false);
//   const [transactionData, setTransactionData] = useState();
//   const [errorMsg, setErrorMsg] = useState();
//   const [clientToken,setClientToken]=useRecoilState(clientTokenAtom)
//   const [token, setToken] = useRecoilState(TokenAtom);
//   const [savedOrderId, setSavedOrderId] = useState<number>(0);




//   const SubmitPayment = () => {
//     // Here declare the variable containing the hostedField instance
//     const { cardFields } = usePayPalHostedFields();
//     const cardHolderName = useRef(null);

//     const submitHandler = () => {
//       if (typeof cardFields?.submit !== "function") return; // validate that `submit()` exists before using it
//       if (errorMsg) showErrorMsg(false);
//       showLoader(true);
//       showSuccess(false);
//       cardFields
//         .submit({
//           // The full name as shown in the card and billing addresss
//           // These fields are optional for Sandbox but mandatory for production integration
//           cardholderName: "mahmood"
//         })
//         .then((order) => {
//           const { orderId } = order;
//           console.log(orderId);
          
//           // fetch(`/api/payments/${orderId}`)
//           //   .then((response) => response.json())
//           //   .then((data) => {
//           //     showLoader(false);
//           //     showSuccess(true);
//           //     setTransactionData(data);
//           //     // Inside the data you can find all the information related to the payment
//           //   })
//           //   .catch((err) => {
//           //     // Handle capture order error
//           //     showLoader(false);
//           //     showErrorMsg(true);
//           //     setErrorMsg(err);
//           //   });
//         })
//         .catch((err) => {
//           alert(err)
//           showLoader(false);
//           showErrorMsg(true);
//           setErrorMsg(err);
//         });
//     };

//     return (
//       <button
//         onClick={submitHandler}
//         className="btn btn-primary"
//         style={{ display: "flex" }}
//       >
//         Pay
//       </button>
//     );
//   };

//   return (
    // <PayPalScriptProvider
    //       options={{
    //         "client-id":
    //           "AbkWR5ioTXhb4dyzytwYW-VopjEJ9N4Wy4Zs7kHrgVIYHs-q9_mnC-jWcrK2sPeUwjovv0qquLczIxLc",
    //         components: "buttons,hosted-fields",
    //         "data-client-token": clientToken,
    //         intent: "capture",
    //         vault: false,
    //       }}
    //     >
    //       <PayPalHostedFieldsProvider
    //         styles={{
    //           ".valid": { color: "#28a745" },
    //           ".invalid": { color: "#dc3545" },
    //           input: { "font-family": "monospace", "font-size": "16px" },
    //         }}
            // createOrder={ () => {
            //    return getOrderID(token)
            //   .then(res =>{
            //     console.log(res)
            //    return res})
            //   .then(order => order.result.client_result.order_id)
            //   .catch((err) => {
            //     // Handle order creation error
            //     showLoader(false);
            //     showErrorMsg(true);
            //     setErrorMsg(err);
            //   });
            // }}
    //       >
    //         <PayPalHostedField
    //           id="card-number"
    //           className="card-field"
    //           hostedFieldType="number"
    //           options={{
    //             selector: "#card-number",
    //             placeholder: "4111 1111 1111 1111",
    //           }}
    //         />
    //         <PayPalHostedField
    //           id="cvv"
    //           className="card-field"
    //           hostedFieldType="cvv"
    //           options={{
    //             selector: "#cvv",
    //             placeholder: "123",
    //             maskInput: true,
    //           }}
    //         />
    //         <PayPalHostedField
    //           id="expiration-month-1"
    //           className="card-field"
    //           hostedFieldType="expirationMonth"
    //           options={{
    //             selector: "#expiration-month-1",
    //             placeholder: "MM",
    //           }}
    //         />
    //         <PayPalHostedField
    //           id="expiration-year-1"
    //           className="card-field"
    //           hostedFieldType="expirationYear"
    //           options={{
    //             selector: "#expiration-year-1",
    //             placeholder: "YYYY",
    //           }}
    //         />


//             <label title="This represents the full name as shown in the card">
//               Card Holder Name
//             </label>
//             <input
//               id="card-holder"
              
//               type="text"
//               placeholder="Full name"
//             />
//             <label title="billing address street">Billing Address </label>
//             <input
//               id="card-billing-address-street"
              
//               type="text"
//               placeholder="street"
//             />
//             <label title="billing address unit">Unit </label>
//             <input
//               id="card-billing-address-unit"
              
//               type="text"
//               placeholder="unit"
//             />
//             <label title="billing address city">City </label>
//             <input
//               id="card-billing-address-unit"
              
//               style={{ display: "block" }}
//               type="text"
//               placeholder="city"
//             />
//             <label title="billing address state">State</label>
//             <input
//               id="card-billing-address-state"
              
//               type="text"
//               placeholder="state"
//             />
//             <label title="billing address zip">Zip</label>
//             <input
//               id="card-billing-address-zip"
              
//               type="text"
//               placeholder="zip"
//             />
//             <label title="billing address country">Country</label>
//             <input
//               id="card-billing-address-country"
              
//               type="text"
//               placeholder="country"
//             />

//             {loader && <Spinner />}
//             {!loader && <SubmitPayment />}
//             {success && (
//               <p style={{ color: "green", margin: "10px" }}>
//                 Transaction Completed! {JSON.stringify(transactionData)}
//               </p>
//             )}
//             {error && (
//               <p style={{ color: "red", margin: "10px" }}>
//                 Sorry, there is an error {JSON.stringify(errorMsg)}
//               </p>
//             )}
//       </PayPalHostedFieldsProvider>
//     </PayPalScriptProvider>
//   );
// };


import { useState, useRef } from "react";
import {
  PayPalScriptProvider,
  PayPalHostedFieldsProvider,
  PayPalHostedField,
  usePayPalHostedFields
} from "@paypal/react-paypal-js";
import { atom, useRecoilState } from "recoil";
import { Spinner } from "../../../spinner";
import axios from "axios";

export const clientTokenAtom = atom({
  key:"clientTokenAtom",
  default:""
})




export const PaymentForm = () => {
  const [loader, showLoader] = useState(false);
  const [success, showSuccess] = useState(false);
  const [error, showErrorMsg] = useState(false);
  const [transactionData, setTransactionData] = useState();
  const [errorMsg, setErrorMsg] = useState();
  const [clientToken,setClientToken]=useRecoilState(clientTokenAtom)
  const [token, setToken] = useRecoilState(TokenAtom);
  const[pay,setPay]=useState()
  const [addressId,setAddressId]= useRecoilState(AddresToDeleteIdAtom)



  
  const SubmitPayment = () => {
    // Here declare the variable containing the hostedField instance
    const hostedFields = usePayPalHostedFields();
    const cardHolderName = useRef(null);

    const submitHandler = () => {
      if (typeof hostedFields?.cardFields?.submit !== "function") return; // validate that `submit()` exists before using it
      if (errorMsg) showErrorMsg(false);
      showLoader(true);
      showSuccess(false);
      hostedFields.cardFields
        .submit({
          // The full name as shown in the card and billing addresss
          // These fields are optional for Sandbox but mandatory for production integration
          cardholderName: "mahmoood sino",
          
          
        }).then(order => {
          console.log("order");
          
          const {orderId} = order
          console.log(orderId);
          
        })
        // .then((order) => {
        //   const { orderId } = order;
          //   axios.post(`https://8893-138-199-50-99.ngrok.io/api/v1/payment-way/complete-transaction`,{
          //     payment_transaction_id:219
          //   })
        //     .then((response) =>{ console.log(response)
        //       return response.data})
        //     .then((data) => {
        //       showLoader(false);
        //       showSuccess(true);
        //       setTransactionData(data);
        //       // Inside the data you can find all the information related to the payment
        //     })
        //     .catch((err) => {
        //       // Handle capture order error
        //       showLoader(false);
        //       showErrorMsg(true);
        //       setErrorMsg(err);
        //     });
        // })
        .catch((err) => {
          // Handle validate card fields error
          console.log(err);
          
          showLoader(false);
          showErrorMsg(true);
          setErrorMsg(err);
        });
    };

    return (
      <button
        onClick={submitHandler}
        className="btn btn-primary"
        style={{ display: "flex" }}
      >
        Pay
      </button>
    );
  };

  // return (
  //   <div>
  //     {clientToken && 
      
  //   <PayPalScriptProvider
  //   options={{
  //     "client-id":
  //       "AbkWR5ioTXhb4dyzytwYW-VopjEJ9N4Wy4Zs7kHrgVIYHs-q9_mnC-jWcrK2sPeUwjovv0qquLczIxLc",
  //     components: "buttons,hosted-fields",
  //     "data-client-token": clientToken,

  //   }}
  // >
  //   <PayPalHostedFieldsProvider
  //               createOrder={ () => {
  //                 return getOrderID(token,addressId)
  //                .then(res =>{
  //                  console.log(res)
  //                  console.log("some");
  //                 //  setPay(res.result.payment_transaction.id)
  //                  return res
  //               }
  //                 )
  //                .then(order =>order.id)
  //                .catch((err) => {
  //                  // Handle order creation error
  //                  console.log(err);
                   
  //                  showLoader(false);
  //                  showErrorMsg(true);
  //                  setErrorMsg(err);
  //                });
  //              }}
  //       >
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
  //         maskInput: true,
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

            {/* <label title="This represents the full name as shown in the card">
              Card Holder Name
            </label>
            <input
              id="card-holder"
              
              type="text"
              placeholder="Full name"
            />
            <label title="billing address street">Billing Address </label>
            <input
              id="card-billing-address-street"
              
              type="text"
              placeholder="street"
            />
            <label title="billing address unit">Unit </label>
            <input
              id="card-billing-address-unit"
              
              type="text"
              placeholder="unit"
            />
            <label title="billing address city">City </label>
            <input
              id="card-billing-address-unit"
              
              style={{ display: "block" }}
              type="text"
              placeholder="city"
            />
            <label title="billing address state">State</label>
            <input
              id="card-billing-address-state"
              
              type="text"
              placeholder="state"
            />
            <label title="billing address zip">Zip</label>
            <input
              id="card-billing-address-zip"
              
              type="text"
              placeholder="zip"
            />
            <label title="billing address country">Country</label>
            <input
              id="card-billing-address-country"
              
              type="text"
              placeholder="country"
            /> */}

//             {loader && <Spinner />}
//             {!loader && <SubmitPayment />}
//             {success && (
//               <p style={{ color: "green", margin: "10px" }}>
//                 Transaction Completed! {JSON.stringify(transactionData)}
//               </p>
//             )}
//             {error && (
//               <p style={{ color: "red", margin: "10px" }}>
//                 Sorry, there is an error {JSON.stringify(errorMsg)}
//               </p>
//             )}
//       </PayPalHostedFieldsProvider>
//     </PayPalScriptProvider>
//       }
//     </div>
//   );
};
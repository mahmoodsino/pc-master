//@ts-ignore
import Select, { ActionMeta, StylesConfig } from "react-select";
import { BaseInput } from "../../../inputs";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { checkoutSchema } from "../../../../helper/validation";
import { useRecoilState } from "recoil";
import {
  PayPalScriptProvider,
  PayPalButtons,
  FUNDING,
} from '@paypal/react-paypal-js'
import {
  AddresToDeleteIdAtom,
  getClientToken,
  getOrderCratedOrder,
  getOrderID,
  getPaymentProvidor,
  OpenAddNewAddressModalAtom,
  optionTypeCountry,
  OrderDetailsAtom,
  registerCountryAtom,
  TokenAtom,
} from "../../../../helper";
import { useEffect, useState } from "react";
import { PayPalButton } from "react-paypal-button-v2";
import { Spinner } from "../../../spinner";
import axios from "axios";
import details from "../../../../pages/details";
import { useRouter } from "next/router";
import SelectAddAddress, { openSelectAddressModal } from "./SelectAddAddress";
import { BaseButton } from "../../../buttons";
import { PaymentForm } from "./PaypalH";

interface IFormInputs {
  firstName: string;
  lastName: string;
  email: string;
  phone:number
}

interface PaymentProvider {
  public_key:string,
  id:number
}

const CheckoutDetails = () => {
  const [registerCountry, setRegisterCountry] =
    useRecoilState(registerCountryAtom);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [token, setToken] = useRecoilState(TokenAtom);
  const [savedOrderId, setSavedOrderId] = useState<number>(0);
  const [orderDetails, setOrderDetails] = useRecoilState(OrderDetailsAtom);
  const [checkout, setCheckOut] = useState(false);
  const [addressId, setAddressId] = useRecoilState(AddresToDeleteIdAtom);
  const [clientToken,setClientToken]=useState<string>()
  const [firstName,setFirstName]=useState("")
  const [lastName,setLastName]=useState("")
  const[email,setEmail]=useState("")
  const { push } = useRouter();
  const [userId,setUserId]=useState<number>(0)
  const [paymentProvidorState,setPaymentProvidorState]=useState<PaymentProvider[]>([])
  const [loading,setLoading]=useState(false)
  const[phone,setPhone]=useState<number>(0)
  
  useEffect(() => {
    const first =localStorage.getItem("first_name"||"")
    const last =localStorage.getItem("last_name"||"")
    const email =localStorage.getItem("email"||"")
    const id=localStorage.getItem("id"||0)
    setFirstName(first||"")
    setLastName(last||"")
    setEmail(email||"")
    setUserId(Number(id)||0)
    const getData = async () => {
      const res = await getPaymentProvidor()
      setPaymentProvidorState(res.result.payment_providers)
    }
    getData()
  },[])

  useEffect(() => {
    const getData = async () => {
      setLoading(true)
      if(paymentProvidorState.length>0&&userId&&email){
        const res = await getClientToken(paymentProvidorState[0].id,userId,email)
        setClientToken(res.result.client_token);
        if(res){
          setLoading(false)
        }
      }
    }
    getData()
  }, [paymentProvidorState,userId,email]);

  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: yupResolver(checkoutSchema),
  });
  useEffect(() => {
    const userType = localStorage.getItem("type")

    if(userType === "user") {
      setValue("firstName",firstName)
      setValue("lastName",lastName)
      setValue("email",email)
    }

  },[firstName,lastName,email])

  const submit = async (data: IFormInputs) => {
    setPhone(data.phone)
    if (addressId > 0) {
      setCheckOut(true);
    }
  };

  return (
    <div className="shadow-[0_0_10px_rgba(0,0,0,0.25)] sm:w-[100%] mb-10 md:w-[75%] lg:w-[55%] rounded-md">
      <h1 className="text-xl font-bold py-3 bg-gray-1350 px-14 tracking-[0.11em]">
        Billing Details
      </h1>
      {!loading ? 
    <div>


        <div className="px-14 pt-5">
              <SelectAddAddress />
              {addressId > 0 ? null : (
                <p className=" text-xs text-red-950">Please Select Address</p>
              )}
            </div>
        <form onSubmit={handleSubmit(submit)}> 
          <div className="md:mx-14 sm:mx-7 py-4 border-b mb-10">
            <BaseInput
              placeholder="FirstName"
              title="First Name"
              name="firstName"
              register={register}
              className="appearance-none rounded-sm block w-full bg-white border-black border py-3 px-4 mb-7 leading-tight focus:outline-none focus:border-gray-1550"
            />
            <p className="text-xs text-red-950 ">{errors.firstName?.message}</p>
            <BaseInput
              placeholder="LastName"
              title="Last Name"
              name="lastName"
              register={register}
              className="appearance-none rounded-sm block w-full bg-white border-black border py-3 px-4 mb-7 leading-tight focus:outline-none focus:border-gray-1550"
            />
            <p className="text-xs text-red-950 ">{errors.lastName?.message}</p>
            <BaseInput
              placeholder="Email"
              title="Email Address"
              name="email"
              register={register}
              type="email"
              className="appearance-none rounded-sm block w-full bg-white border-black border py-3 px-4 mb-7 leading-tight focus:outline-none focus:border-gray-1550"
            />
            <p className="text-xs text-red-950 ">{errors.email?.message}</p>
            <BaseInput
              placeholder="Phone number"
              title="phone"
              name="phone"
              register={register}
              className="appearance-none rounded-sm block w-full bg-white border-black border py-3 px-4 mb-7 leading-tight focus:outline-none focus:border-gray-1550"
            />
            <p className="text-xs text-red-950 ">{errors.phone?.message}</p>
          </div>
          <div className="  flex  justify-between px-14 ">
            <h1 className=" text-xl font-bold tracking-[0.11em]">
              Payment Method
            </h1>
          
          </div>

          {checkout ? (
            <div className="my-10 px-14">

            <PayPalScriptProvider
            options={{
              'client-id':`https://www.paypal.com/sdk/js?client-id=${paymentProvidorState[0].public_key}`,
              "data-client-token":clientToken,
              
            }}
          >
            <PayPalButton
            // style={{
            //   color:  'blue',
            //   shape:  'pill',
            //   label:  'pay',
            //   height: 40
            // }}
            
              createOrder={async () => {
                const res = await getOrderID(token,addressId,paymentProvidorState[0].id,firstName,lastName,email,phone);
                setSavedOrderId(res.result.saved_order_id);
                return res.result.client_result.order_id;
              }}
              onApprove={async ( action: any) => {
                const order = await action.order.capture();
              }}
              onSuccess={async () => {
                push({
                  pathname: "/viewreceipt",
                  query: { order: encodeURI(savedOrderId.toString()) },
                });
              }}
              onError={(err: any) => {
                alert("fail");
              }}
            />
            </PayPalScriptProvider>
            </div>
          ) : (
            <BaseButton
            type="submit"
            className="ml-14 mt-5 mb-10 px-3 py-2  text-white font-semibold hover:bg-green-950/80 rounded-lg bg-green-950"
            title="checkout"
            ></BaseButton>
            )}
        </form> 
    </div>  : 
    <div className="flex justify-center items-center">
      <Spinner className="w-32 fill-green-950"/>
    </div>
    
    }
    </div>
  );
};
export default CheckoutDetails;

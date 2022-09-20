//@ts-ignore
import { useRecoilState } from "recoil";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import {
  getClientToken,
  getPaymentProvidor,
  handelComletePay,
  handelOrderPay,
  TokenAtom,
} from "../../../../helper";
import { useEffect, useState } from "react";
import { PayPalButton } from "react-paypal-button-v2";
import { Spinner } from "../../../spinner";
import { useRouter } from "next/router";

interface IFormInputs {
  firstName: string;
  lastName: string;
  email: string;
  phone: number;
}

interface PaymentProvider {
  public_key: string;
  id: number;
  name: string;
}

const CheckoutDetails = () => {
  const [token, setToken] = useRecoilState(TokenAtom);
  const [savedOrderId, setSavedOrderId] = useState<number>(0);
  const [checkout, setCheckOut] = useState(false);
  const [clientToken, setClientToken] = useState<string>();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const { push } = useRouter();
  const [userId, setUserId] = useState<number>(0);
  const [paymentProvidorState, setPaymentProvidorState] = useState<
    PaymentProvider[]
  >([]);
  const [loading, setLoading] = useState(false);
  const [phone, setPhone] = useState<number>(0);
  const [paymentProvidorId, setPaymenProvidorId] = useState<number>();
  const [publicKey, setPublicKey] = useState<string>();

  const router = useRouter().query;

  useEffect(() => {
    const first = localStorage.getItem("first_name" || "");
    const last = localStorage.getItem("last_name" || "");
    const email = localStorage.getItem("email" || "");
    const id = localStorage.getItem("id" || 0);
    setFirstName(first || "");
    setLastName(last || "");
    setEmail(email || "");
    setUserId(Number(id) || 0);
    const getData = async () => {
      const res = await getPaymentProvidor();
      setPaymentProvidorState(res.result.payment_providers);
    };
    getData();
  }, []);

  useEffect(() => {
    paymentProvidorState.map((providor) => {
      if (providor.name === "paypal") {
        setPaymenProvidorId(providor.id);
        setPublicKey(providor.public_key);
      }
    });
  }, [paymentProvidorState]);


  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      if (paymentProvidorId) {
        const res = await getClientToken(paymentProvidorId, token);
        console.log(res);
        setClientToken(res.result.client_token);
        if (res) {
          setLoading(false);
        }
      }
    };
    getData();
  }, [paymentProvidorId, userId, email]);


  // const {
  //   control,
  //   register,
  //   handleSubmit,
  //   setValue,
  //   formState: { errors },
  // } = useForm<IFormInputs>({
  //   resolver: yupResolver(checkoutSchema),
  // });

  // useEffect(() => {
  //   const userType = localStorage.getItem("type")

  //   if(userType === "user") {
  //     setValue("firstName",firstName)
  //     setValue("lastName",lastName)
  //     setValue("email",email)
  //   }

  // },[firstName,lastName,email])

  // const submit = async (data: IFormInputs) => {
  //   setPhone(data.phone)
  //     setCheckOut(true);
  // };

  return (
    <div className="shadow-[0_0_5px_rgba(0,0,0,0.12)] sm:w-[100%] mb-10 md:w-[75%] lg:w-[55%] rounded-md">
      <h1 className="text-xl font-bold py-3 bg-gray-1350 px-14 tracking-[0.03em]">
        Billing Details
      </h1>
      {!loading && publicKey && clientToken ? (
        <div>
          {/* <form onSubmit={handleSubmit(submit)}> 
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
            <h1 className=" text-xl font-bold tracking-[0.03em]">
              Payment Method
            </h1>
          
          </div> */}

          {/* {checkout ? ( */}
          <div className="my-10 px-14">
            <PayPalScriptProvider
              options={{
                "client-id": `https://www.paypal.com/sdk/js?client-id=${publicKey}`,
                "data-client-token": clientToken,
                vault: true,
              }}
            >
              <PayPalButton
                style={{
                  color: "blue",
                  shape: "pill",
                  label: "pay",
                  height: 40,
                }}
                createOrder={async () => {
                  if (router.paymentTransaction && paymentProvidorId) {
                    const res = await handelComletePay(
                      token,
                      Number(router.paymentTransaction)
                    );
                    return res.result.client_result.order_id;
                  }
                  if (router.savedOrder && paymentProvidorId) {
                    const res = await handelOrderPay(
                      token,
                      Number(router.savedOrder),
                      paymentProvidorId
                    );
                    return res.result.client_result.order_id;
                  }
                }}
                onApprove={async (action: any) => {
                  const order = await action.order.capture();
                  console.log(order);
                  
                }}
                onSuccess={async () => {
                  push({
                    pathname: "/viewreceipt",
                    query: {
                      order: encodeURI(Number(router.savedOrder).toString()),
                    },
                  });
                }}
                onError={(err: any) => {
                  alert("fail");
                }}
              />
            </PayPalScriptProvider>
          </div>
          {/* ) : (
            <BaseButton
            type="submit"
            className="ml-14 mt-5 mb-10 px-3 py-2  text-white font-semibold hover:bg-green-950/80 rounded-lg bg-green-950"
            title="checkout"
            ></BaseButton>
            )} */}
          {/* </form>  */}
        </div>
      ) : (
        <div className="flex justify-center items-center">
          <Spinner className="w-32 fill-green-950" />
        </div>
      )}
    </div>
  );
};
export default CheckoutDetails;

import Collapsible from "react-collapsible";
import { useRecoilState, useRecoilValue } from "recoil";
import { getOrderCratedOrder, OrderDetailsAtom, TokenAtom } from "../../../../helper";
import { BaseButton } from "../../../buttons";
import { CartIcon } from "../../../icons";
import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Spinner } from "../../../spinner";
import {toast} from "react-toastify"

const CartSummary = () => {
  const [orderDetails, setOrderDetails] = useRecoilState(OrderDetailsAtom);
  const[loading,setLoading]=useState(false)
  const token=useRecoilValue(TokenAtom)
  const router = useRouter().query;


  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      if (router.savedOrder) {
        const res = await getOrderCratedOrder(token, +router.savedOrder);
        if(res===null){
          toast.error("some thing went wrong")
        }else{
          setOrderDetails(res.result);
        }
        if (res) {
          setLoading(false);
        }
      }
    };
    getData();
  }, [router.savedOrder]);


  return (
    <div className="shadow-[0_0_5px_rgba(0,0,0,0.12)] sm:w-[100%] md:w-[60%] lg:w-[35%] h-fit rounded-md">
      {!loading ? 
      <div>

        <div className="md:pl-10 sm:pl-5 space-x-5 border-b py-8">
          <CartIcon className="text-black w-6 inline-block" />

          <h1 className="inline-block text-[20px] font-bold tracking-[0.03em]">
            Cart summary
          </h1>
        </div>
        {orderDetails.items?.map((item) => {
          return (
            <div key={item.id} className="md:px-10 sm:px-5">
              <div className="flex flex-row justify-between sm:text-sm md:text-base my-5 mb-2">
                <span className=" tracking-[0.03em] font-semibold">
                  {item.quantity}x {item.product?.name}
                </span>
                <span>${item.variation?.price}</span>
              </div>
              <span>{item.description}</span>
              
              
              {item.modifierGroups?.map((it) => {
                return (
                  <Collapsible
                    key={uuidv4()}
                    trigger={
                      <BaseButton className="bg-gray-1350 flex justify-between items-center w-[101%] border">
                        <span className="font-semibold">{it.name}</span>
                        <div className="space-x-3">
                          <span className="font-semibold">${it.total_price}</span>
                          <svg
                            data-accordion-icon
                            className={`w-6 h-6 inline-block  `}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                        </div>
                      </BaseButton>
                    }
                  >
                    <div className="ml-5">
                      {it.modifiers.map((modi) => {
                        return (
                          <div key={uuidv4()} className="space-x-3 mt-3 bg-cover">
                            <img
                              className="w-20 bg-cover"
                              src={modi.image}
                              alt="Picture of the author"
                            />
                          </div>
                        );
                      })}
                    </div>
                  </Collapsible>
                );
              })}
              
              <div className="w-[90%] left-0 right-0 m-auto border-b my-8"></div>
            </div>
          );
        })}
        <div className="flex justify-between mt-2 font-semibold px-10">
                <span>tax</span>
                <span>%{orderDetails.tax}</span>
              </div>
        <div className="font-semibold my-2 flex justify-between px-10">
                <span>delivery fee</span>
                <span>${orderDetails.delivery_fee}</span>
              </div>

        <div className="flex justify-between space-x-3  mb-5 px-10">
          <span>Subtotal:</span>
          <span className="font-semibold">{orderDetails.total}$</span>
        </div>
      </div>  :
      <div className="flex justify-center items-center">  
        <Spinner className="w-20 fill-green-950" />
      </div>
    }
    </div>
  );
};

export default CartSummary;

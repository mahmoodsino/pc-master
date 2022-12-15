import React from "react";
import { useRecoilValue } from "recoil";
import { OrderDetailsAtom } from "../../../../helper";

const OrderDetails = () => {
  const orderDetails = useRecoilValue(OrderDetailsAtom);

  let useType;
  if (typeof window !== "undefined") {
    useType = localStorage.getItem("type" || "");
  }
  return (
    <div className=" shadow-[0_0_5px_rgba(0,0,0,0.12)] pl-7 mb-10">
      <h1 className="font-bold text-xl pt-5 pb-5  text-gray-950 ">
        Order Details
      </h1>
      <div className="flex flex-row">
        <div className="flex flex-col w-[43%] space-y-2 mb-5 text-sm font-medium">
          <div className="w-[100%] flex md:flex-row sm:flex-col ">
            <h1 className="w-[60%] text-gray-1100 inline-block">Order ID:</h1>
            <span className="text-gray-950">{orderDetails.id}</span>
          </div>
          <div className="w-[100%] flex md:flex-row sm:flex-col ">
            <h1 className="w-[60%] text-gray-1100 inline-block">Order Date:</h1>
            <span className="text-gray-950">{orderDetails.created_at}</span>
          </div>
          {/* <div className='w-[100%]  flex md:flex-row sm:flex-col'>
                    <h1 className='w-[60%] text-gray-1100 inline-block'>Payment Method:</h1>
                    <span className='text-gray-950'>Credit Card</span>
                </div>
                <div className='w-[100%]  flex md:flex-row sm:flex-col'>
                    <h1 className='w-[60%] text-gray-1100 inline-block'>Delivery Method:</h1>
                    <span className='text-gray-950'>Delivery</span>
                </div> */}
        </div>
        <div className="w-[60%] space-y-2 text-sm font-medium">
          <div className="md:ml-10 flex md:flex-row sm:flex-col">
            <h1 className="w-[30%] text-gray-1100 inline-block">Fullname:</h1>
            {orderDetails.first_name === null ? (
              <span className="text-gray-950">---</span>
            ) : (
              <span className="text-gray-950">
                {orderDetails.first_name} {orderDetails.last_name}
              </span>
            )}
          </div>
          <div className="md:ml-10 flex md:flex-row sm:flex-col">
            <h1 className="w-[30%] text-gray-1100  inline-block">Email:</h1>
            {orderDetails.email === null ? (
              <span className="text-gray-950">---</span>
            ) : (
              <span className="text-gray-950">{orderDetails.email}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;

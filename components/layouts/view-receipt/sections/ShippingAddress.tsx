import React from "react";
import { useRecoilState } from "recoil";
import { OrderDetailsAtom } from "../../../../helper";

const ShippingAddress = () => {
  const [orderDetails, setOrderDetails] = useRecoilState(OrderDetailsAtom);

  return (
    <div className=" shadow-[0_0_10px_rgba(0,0,0,0.25)] pl-7 pb-8 mb-10">
      <h1 className="font-bold text-xl pt-5 pb-5  text-gray-950 ">
        Shipping Address
      </h1>
      <div className="text-sm font-medium text-gray-950 space-y-2">
        <div className="flex flex-row">
          <div className="flex flex-col w-[43%] space-y-2 mb-5 text-sm font-medium">
            <div className="w-[100%] flex md:flex-row sm:flex-col ">
              <h1 className="w-[60%] text-gray-1100 inline-block">address</h1>
              <span className="text-gray-950">
                 {orderDetails.address&& orderDetails.address.address}
              </span>
            </div>
            <div className="w-[100%] flex md:flex-row sm:flex-col ">
              <h1 className="w-[60%] text-gray-1100 inline-block">city name</h1>
              <span className="text-gray-950">
                {orderDetails.address && orderDetails.address.city_name}
              </span>
            </div>
          </div>
          <div className="w-[60%] space-y-2 text-sm font-medium">
            <div className="md:ml-10 flex md:flex-row sm:flex-col">
              <h1 className="w-[30%] text-gray-1100 inline-block">building </h1>
              <span className="text-gray-950">
                {orderDetails.address && orderDetails.address.build_number}
              </span>
            </div>
            <div className="md:ml-10 flex md:flex-row sm:flex-col">
              <h1 className="w-[30%] text-gray-1100  inline-block">zipcode</h1>
              <span className="text-gray-950">
                {orderDetails.address && orderDetails.address.post_code}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingAddress;

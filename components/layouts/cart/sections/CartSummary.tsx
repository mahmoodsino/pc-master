import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  AllCartsInfo,
  FetchedCartItemsAtom,
  ShippingAddressIdAtom,
} from "../../../../helper";
import { BaseButton } from "../../../buttons";
import SelectAddAddress from "./SelectAddAddress";
import SelectDelivaryType, { selctedMethodAtom } from "./SelectDelivaryType";

const CartSummary = () => {
  const [allCartsInfo, setAllCartsInfo] = useRecoilState(AllCartsInfo);
  const [carts, setCarts] = useRecoilState(FetchedCartItemsAtom);
  const [selectedMethod, setSelectedMethod] = useRecoilState(selctedMethodAtom);
  const [shippingAddressId, setShippingAddressId] = useRecoilState(
    ShippingAddressIdAtom
  );

  const { push } = useRouter();

  const checkQuantity = () => {
    let isFound = true;
    for (const item of carts) {
      if (item.available_quantity) {
        if (item.available_quantity === item.quantity) {
          return (isFound = true);
        } else if (item.available_quantity > item.quantity) {
          return (isFound = true);
        } else if (item.available_quantity < item.quantity) {
          isFound = false;
        }
      }
    }
    return isFound;
  };

  return (
    <div className="shadow-[0_0_10px_rgba(0,0,0,0.25)]  md:tracking-[0.03] rounded-md mb-10">
      <h1 className="md:text-xl font-bold   text-center py-5 left-0 right-0 m-auto bg-gray-1350">
        Order Summary
      </h1>
      <div className="px-7 space-y-5 mt-5 pb-7 border-b">
        <div className="flex flex-row justify-between">
          <div>
            <span className="font-semibold ">Subtotal</span>
            <span className="text-sm">
              {" "}
              ({allCartsInfo.items.length} items)
            </span>
          </div>
          <span className="">${allCartsInfo.sub_total_price.toFixed(2)}</span>
        </div>
        <div className="flex flex-row justify-between text-sm md:tracking-[0.03em] z-50">
          <div>
            <span className="font-semibold">Order type </span>
            {selectedMethod === "pickup" && <span>(free)</span>}
          </div>
          <SelectDelivaryType />
        </div>
        {selectedMethod !== "pickup" && (
          <div className="flex flex-row justify-between text-sm md:tracking-[0.03em]">
            <div>
              <span className="font-semibold">Address</span>
            </div>
            <SelectAddAddress />
          </div>
        )}
        <div></div>
        <div className="flex flex-row justify-between">
          <span className="font-semibold ">Taxes</span>
          <span className="">Calculated at checkout</span>
        </div>
      </div>

      <div className="flex flex-row justify-between items-center px-7 py-6 ">
        <span className="font-semibold">Estimated Total</span>
        <span className="font-bold text-lg">${allCartsInfo.total_price}</span>
      </div>
      <div className="  py-5 ">
        <div className="w-fit left-0 right-0 m-auto ">
          <BaseButton
            onClick={() => push("./checkout")}
            disabled={
              checkQuantity() &&
              selectedMethod === "delivery" &&
              shippingAddressId < 0
                ? true
                : false
            }
            title="Continue to check out"
            className="text-white disabled:bg-gray-500 disabled:cursor-not-allowed bg-green-1000 px-8 py-2 text-xl font-bold  rounded-full"
          />
        </div>
      </div>
      <div className="flex justify-center pb-3">
        {selectedMethod === "delivery" && shippingAddressId < 0 && (
          <span className="text-xs text-red-950">
            Please select address to checkout !
          </span>
        )}
      </div>
    </div>
  );
};

export default CartSummary;

import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  AllCartsInfo,
  ErroreMessageAtom,
  FetchedCartItemsAtom,
  handelCrateOrder,
  OpenMessageModalAtom,
  SelectedBranchAtom,
  ShippingAddressIdAtom,
  TokenAtom,
} from "../../../../helper";
import { BaseButton } from "../../../buttons";
import { Spinner } from "../../../spinner";
import SelectAddAddress from "./SelectAddAddress";
import SelectDelivaryType, { selctedMethodAtom } from "./SelectDelivaryType";
import { toast } from "react-toastify";
import { MessageModal } from "../../../messageModal";

const CartSummary = () => {
  const [allCartsInfo, setAllCartsInfo] = useRecoilState(AllCartsInfo);
  const [carts, setCarts] = useRecoilState(FetchedCartItemsAtom);
  const [selectedMethod, setSelectedMethod] = useRecoilState(selctedMethodAtom);
  const [shippingAddressId, setShippingAddressId] = useRecoilState(
    ShippingAddressIdAtom
  );
  const [token, setToken] = useRecoilState(TokenAtom);
  const [savedOrderId, setSavedOrderId] = useState<number>();
  const [loading, setLoading] = useState(false);
  const [selectedBranch,setSelectedBranch]=useRecoilState(SelectedBranchAtom)
  const [openMessageModal, setOpenMassegModal] =
  useRecoilState(OpenMessageModalAtom);
  const [wrongMessage,setWrrongMessage]=useRecoilState(ErroreMessageAtom)
  const { push } = useRouter();

  const checkQuantity = () => {
    let isFound = true;
    for (const item of carts) {
      if(item.in_stock<1){
        return isFound=false
      }else if(item.in_stock===1&&(item.product?.tracking_type===2||item.product?.tracking_type===3)){
        if (item.available_quantity) {
           if (item.available_quantity >= item.quantity) {
            return (isFound = true);
          } else if (item.available_quantity < item.quantity) {
            isFound = false;
          }
        }
      }
    }
    return isFound;
  };
  const createOrder = async () => {
    if (selectedMethod === "PICKUP") {
      setLoading(true);
      const res = await handelCrateOrder({branchId:selectedBranch.id,shipping_method:selectedMethod,token:token});
      if(res===null){
        setWrrongMessage("some thing went wrong");
        setOpenMassegModal(true)
        setLoading(false);

      }else{
        setSavedOrderId(res.result.saved_order_id);
        push({
          pathname: "/checkout",
          query: { savedOrder: encodeURI(res.result.saved_order_id) },
        });
        setLoading(false);
      }
    } else {
      setLoading(true);
      const res = await handelCrateOrder(
        // 
        {branchId:selectedBranch.id,shipping_method:selectedMethod,token:token,address_id:shippingAddressId}
      );
      if(res===null){
        setWrrongMessage("some thing went wrong");
        setOpenMassegModal(true)
        setLoading(false);
      }else{
        setSavedOrderId(res.result.saved_order_id);
        push({
          pathname: "/checkout",
          query: { savedOrder: encodeURI(res.result.saved_order_id) },
        });
        setLoading(false);

      }
    }
  };

  return (
    <div className="shadow-[0_0_5px_rgba(0,0,0,0.12)]  md:tracking-[0.03] rounded-md mb-10">
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
            {selectedMethod === "PICKUP" && <span>(free)</span>}
          </div>
          <SelectDelivaryType />
        </div>
        {selectedMethod === "DELIVERY" && (
          <div className="flex flex-row justify-between">
            <span className="font-semibold ">delivery fee</span>
            <span className="">${allCartsInfo.delivery_fee}</span>
          </div>
        )}
        {selectedMethod !== "PICKUP" && (
          <div className="flex flex-row justify-between text-sm md:tracking-[0.03em]">
            <div>
              <span className="font-semibold">Address</span>
            </div>
            <SelectAddAddress />
          </div>
        )}
        <div className="flex flex-row justify-between">
          <span className="font-semibold ">Taxes</span>
          <span className="">{allCartsInfo.tax}</span>
        </div>
      </div>

      <div className="flex flex-row justify-between items-center px-7 py-6 ">
        <span className="font-semibold">Estimated Total</span>
        {selectedMethod === "DELIVERY" ? (
          <span className="font-bold text-lg">
            ${allCartsInfo.total_price + parseFloat(allCartsInfo.delivery_fee)}
          </span>
        ) : (
          <span className="font-bold text-lg">${allCartsInfo.total_price}</span>
        )}
      </div>
      <div className="  py-5 ">
        <div className="w-fit left-0 right-0 m-auto ">
          {!loading ? (
            <div>
              {selectedMethod === "DELIVERY" &&
              shippingAddressId === -1 ? null : (
                <BaseButton
                  onClick={() => createOrder()}
                  disabled={checkQuantity() ? false : true}
                  title="Continue to checkout"
                  className="text-white disabled:bg-gray-500 disabled:cursor-not-allowed bg-green-1000 px-8 py-2 text-xl font-bold  rounded-full"
                />
              )}
            </div>
          ) : (
            <div className="flex justify-center items-center">
              <Spinner className="fill-green-950 w-20" />
            </div>
          )}
        </div>
      </div>
      <div className="flex justify-center pb-3">
        {selectedMethod === "DELIVERY" && shippingAddressId === -1 && (
          <span className="text-xs text-red-950">
            Please select address to checkout !
          </span>
        )}
      </div>
    </div>
  );
};

export default CartSummary;

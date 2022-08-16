import { useRouter } from 'next/router' 
import React, { useEffect } from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { AllCartsInfo, FetchedCartItemsAtom} from '../../../../helper'
import {BaseButton} from '../../../buttons'

const CartSummary = () => {

  const [allCartsInfo,setAllCartsInfo]=useRecoilState(AllCartsInfo)
  const [carts, setCarts] = useRecoilState(FetchedCartItemsAtom);
  

  const {push}=useRouter()


  const checkQuantity = () => {
    let isFound=true
    for (const item of carts) {
      if(item.available_quantity){
          if(item.available_quantity===item.quantity){
              return isFound=true
          }else if(item.available_quantity>item.quantity){
              return isFound=true
          }else if(item.available_quantity<item.quantity){
              isFound=false
          }
      }
    }
    return isFound
}

  return (
    <div className="shadow-[0_0_10px_rgba(0,0,0,0.25)] md:tracking-[0.11] rounded-md mb-10">
    <div className="  py-5 border-b">
      <div className="w-fit left-0 right-0 m-auto ">
        <BaseButton
          onClick={() => push("./checkout")}
          disabled={checkQuantity() ? false : true}
          title="Continue to check out"
          className="text-white disabled:bg-gray-500 disabled:cursor-not-allowed bg-green-1000 px-8 py-2 text-xl font-bold  rounded-full"
        />
      </div>
    </div>
    <div className="px-7 space-y-5 mt-5 pb-7 border-b">
      <div className="flex flex-row justify-between">
        <div>
          <span className="font-semibold ">Subtotal</span>
          <span className="text-sm"> ({allCartsInfo.items.length} items)</span>
        </div>
        <span className="">${(allCartsInfo.sub_total_price).toFixed(2)}</span>
      </div>
      <div className="flex flex-row justify-between text-sm md:tracking-[0.08em]">
        <span>Select delivery or pickup to view fees </span>
        <BaseButton
          className="underline"
          onClick={() => console.log("")}
          title="Select"
        />
      </div>
      <div className="flex flex-row justify-between">
        <span className="font-semibold ">Taxes</span>
        <span className="">Calculated at checkout</span>
      </div>
    </div>

    <div className="flex flex-row justify-between items-center px-7 py-6 ">
      <span className="font-semibold">Estimated Total</span>
      <span className="font-bold text-lg">${allCartsInfo.total_price}</span>
    </div>
  </div>
  )
}

export default CartSummary

import { useEffect, useState } from "react";
import { atom, useRecoilState } from "recoil";
import { AllCartsInfo, CartItemsAtom, getCartItems, getProductModifiers, ModifiersGroupAtom, TokenAtom } from "../../../../helper";
import { outLineProtectIcon } from "../../../icons/Icons";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/router";

export const modifiersIdAtom = atom<number>({
  key:"modifiersIdAtom",
  default:0
})

const useProtectPurchaseCard = () => {
  const [modifiers, setModifiers] = useRecoilState(ModifiersGroupAtom);
  const [modifiersId, setModifiersId] = useRecoilState(modifiersIdAtom)
  useEffect(() => {
    setModifiersId(0)
  },[])

  return {
    modifiersId,
    render :(
    <div>
      {Object.keys(modifiers).map((key) => {
        const value = modifiers[key];
        if (key === "warranty") {
          return (
            <div key={uuidv4()} className="shadow-[0_0_10px_rgba(0,0,0,0.25)] sm:w-[100%] md:pl-10 mt-10 h-fit rounded-md pb-7">
              <div className=" py-5 pr-10 text-left">
                <h1 className=" text-lg font-bold tracking-[0.11em]">{key}</h1>
                <span className="text-sm tracking-[0.05em] text-[#383838]">
                  Get the best value on product protection including fast
                  repairs.
                </span>
              </div>
              <div className="flex space-x-2">
            {outLineProtectIcon}
            <span>Add PC MasterPro Protection Plan</span>
          </div>
              {value.map((item) => {
                return (
                  <label key={uuidv4()} className="mt-10">
                    <input checked={item.id===modifiersId ? true : false} onChange={(e) => setModifiersId(+(e.target.value))} type="radio" value={item.id} />
                    <span className="design"></span>
                    <span className="value">{item.name}</span>
                  
                  </label>
                );
              })}
              <div className="border-t border-dashed mr-16 mt-5 border-[#d7d7d7] " defaultChecked={true}>
              <label  className="mt-5">
                    <input checked={modifiersId===0 ? true : false} onChange={(e) => setModifiersId(0)}  type="radio"  />
                    
                    <span className="design"></span>
                    <span className="value">I dont need protection at this time</span>
                  </label>
              </div>
            </div>
          );
        }
      })}
      
    </div>
  )
}
};

export default useProtectPurchaseCard;

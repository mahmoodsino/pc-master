import { useEffect, useState } from "react";
import { atom, useRecoilState } from "recoil";
import { ModifiersGroupAtom } from "../../../../helper";
import { outLineProtectIcon } from "../../../icons/Icons";
import { BaseButton } from "../../../buttons";
import { modifierActiveAtom } from "./Modifiers";
import Collapsible from "react-collapsible";

export const modifiersIdAtom = atom<number>({
  key: "modifiersIdAtom",
  default: 0,
});

export const warrantyActiveAtom = atom({
  key: "warrantyActiveAtom",
  default: false,
});

interface Prop {
  name:string,
  total_price:number
}

const useProtectPurchaseCard = () => {
  const [modifiers, setModifiers] = useRecoilState(ModifiersGroupAtom);
  const [modifiersId, setModifiersId] = useRecoilState(modifiersIdAtom);
  const [warrantyActive, setWarrantyActive] =
    useRecoilState(warrantyActiveAtom);
  const [modifierActive, setModifierActive] =
    useRecoilState(modifierActiveAtom);
    const[selectedWarranty,setSelectedWarranty]=useState<Prop>({}as Prop)

  useEffect(() => {
    setModifiersId(0);
  }, []);

  return {
    modifiersId,
    render: (
      <div className=" h-fit">
        <div>
          {Object.keys(modifiers).map((key) => {
            if (key === "warranty") {
              return (
                <Collapsible
                open={warrantyActive}
                  trigger={
                    <BaseButton
                      onClick={() =>( setWarrantyActive(!warrantyActive),setModifierActive(false))}
                      className="border bg-[#f5f5f5] w-full flex py-2 px-3 justify-between"
                    >
                      <span className="font-bold">warranty</span>
                      <div>
                        {selectedWarranty.name && 
                        
                        <span>{selectedWarranty.name}  ${selectedWarranty.total_price}</span>}
                          <svg
                            data-accordion-icon
                            className={`w-6 h-6  shrink-0 inline-block transition-all duration-500 ease-in-out ${
                              warrantyActive ? "rotate-180" : "rotate-0"
                            }`}
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
                  {Object.keys(modifiers).map((key,i) => {
                    const value = modifiers[key];
                    if (key === "warranty") {
                      return (
                        <div key={i} className={`px-5 `}>
                          <div className=" py-5 pr-10 text-left">
                            <span className="text-sm tracking-[0.05em] text-[#383838]">
                              Get the best value on product protection including
                              fast repairs.
                            </span>
                          </div>
                          <div className="flex space-x-2">
                            {outLineProtectIcon}
                            <span>Add PC MasterPro Protection Plan</span>
                          </div>
                          {value.map((item,i) => {
                            return (
                              <label key={i} className="mt-10">
                                <input
                                onClick={() => setSelectedWarranty(item)}
                                  checked={
                                    item.id === modifiersId ? true : false
                                  }
                                  onChange={(e) =>
                                    setModifiersId(+e.target.value)
                                  }
                                  type="radio"
                                  value={item.id}
                                />
                                <span className="design"></span>
                                <span className="value">{item.name}</span>
                                <p className="ml-10">with price of $  {item.total_price}</p>
                              </label>
                            );
                          })}
                          <div className=" mr-16 mt-5  " defaultChecked={true}>
                            <label className="mt-5">
                              <input
                              onClick={() => setSelectedWarranty({}as Prop)}
                                checked={modifiersId === 0 ? true : false}
                                onChange={(e) => setModifiersId(0)}
                                type="radio"
                              />

                              <span className="design"></span>
                              <span className="value">
                                I dont need protection at this time
                              </span>
                            </label>
                          </div>
                        </div>
                      );
                    }
                  })}
                </Collapsible>
              );
            }
          })}
        </div>
      </div>
    ),
  };
};

export default useProtectPurchaseCard;

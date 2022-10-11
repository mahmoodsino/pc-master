import React, { useEffect, useState } from "react";
import { atom, useRecoilState } from "recoil";
import { ModifiersGroupAtom, ModifiersGroupType } from "../../../../helper";
import { v4 as uuidv4 } from "uuid";
import { BaseButton } from "../../../buttons";
import { warrantyActiveAtom } from "./ProtectPurchaseCard";
import Collapsible from "react-collapsible";

export const modifiersIdforModifiersAtom = atom<number[]>({
  key: "modifiersIdforModifiersAtom",
  default: [],
});
export const modifierActiveAtom = atom({
  key: "modifierActiveAtom",
  default: false,
});
interface Prop {
  name: string;
  total_price: number;
}
const useModifiers = () => {
  const [modifiers, setModifiers] = useRecoilState(ModifiersGroupAtom);
  const [modifiersIdforModifiers, setModifiersIdforModifiers] = useRecoilState(
    modifiersIdforModifiersAtom
  );
  const [modifierswithoutWarranty, setModifierswithoutWarranty] = useState<
    ModifiersGroupType[]
  >([]);
  const [selectedPackage, setSelectedPackage] = useState<Prop>({} as Prop);

  const [modifierActive, setModifierActive] =
    useRecoilState(modifierActiveAtom);
  const [warrantyActive, setWarrantyActive] =
    useRecoilState(warrantyActiveAtom);

  const addModifiers = (modefier: ModifiersGroupType) => {
    setModifiersIdforModifiers([]);
    setModifiersIdforModifiers((prev) => [...prev, modefier.id]);
    setSelectedPackage(modefier);
  };
  useEffect(() => {
    Object.keys(modifiers).map((key) => {
      const value = modifiers[key];
      if (key !== "warranty") {
        value.map((val) => {
          setModifierswithoutWarranty((prev) => [...prev, val]);
        });
      }
    });
  }, [modifiers]);
  

  return {
    modifiersIdforModifiers,
    modifiersRender: (
      <div className="">
        {modifierswithoutWarranty.length > 0 && (
          <Collapsible
            open={modifierActive}
            trigger={
              <BaseButton
                key={uuidv4()}
                onClick={() => (
                  setModifierActive(!modifierActive), setWarrantyActive(false)
                )}
                className="border bg-[#f5f5f5] w-full flex py-2 px-3 justify-between"
              >
                <span className="font-bold">buy with</span>
                <div>
                  {selectedPackage.name && (
                    <span>
                      {selectedPackage.name} ${selectedPackage.total_price}
                    </span>
                  )}
                  <svg
                    data-accordion-icon
                    className={`w-6 h-6 inline-block transition-all duration-500 ease-in-out ${
                      modifierActive ? "rotate-180" : "rotate-0"
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
            <div>
              <label
                onClick={() => (
                  setModifiersIdforModifiers([]), setSelectedPackage({} as Prop)
                )}
                className=""
              >
                <input
                  onChange={(e) => console.log(e)}
                  type="radio"
                  checked={modifiersIdforModifiers.length === 0 ? true : false}
                />
                <span className="design"></span>
                <span className="value sm:text-xs md:text-base">no package</span>
              </label>
              {modifierswithoutWarranty.map((modefier) => {
                return (
                  <div
                    onClick={() => addModifiers(modefier)}
                    key={uuidv4()}
                    className={`cursor-pointer sm:w-[100%] md:w-[90%] border hover:-translate-y-0.5 hover:shadow-sm duration-300 md:my-2 ${
                      modifiersIdforModifiers.findIndex(
                        (item) => item === modefier.id
                      ) > -1
                        ? "border-green-950"
                        : " "
                    } `}
                  >
                    <label className="">
                      <input
                        type="radio"
                        onChange={(e) => console.log(e)}
                        checked={
                          modifiersIdforModifiers.findIndex(
                            (item) => item === modefier.id
                          ) > -1
                            ? true
                            : false
                        }
                      />
                      <span className="design"></span>
                      <span className="value sm:text-xs md:text-base">{modefier.name}</span>
                      <p className="ml-10 whitespace-nowrap sm:text-xs md:text-base">
                        with price of ${modefier.total_price}
                      </p>
                    </label>
                    <div className="flex ml-10">
                      {modefier.modifiers.map((item) => {
                        if (item.image) {
                          return (
                            <div
                              key={uuidv4()}
                              className="flex justify-around bg-cover "
                            >
                              <img
                              style={{objectFit:"cover"}}
                                className="w-20  ml-2 pb-2 "
                                src={item.image}
                                alt="Picture of the author"
                              />
                            </div>
                          );
                        }
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </Collapsible>
        )}
      </div>
    ),
  };
};
export default useModifiers;

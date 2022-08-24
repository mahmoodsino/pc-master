import React, { useState } from "react";
import { atom, useRecoilState } from "recoil";
import { ModifiersGroupAtom } from "../../../../helper";
import { v4 as uuidv4 } from "uuid";
import Image from "next/image";
import { BaseButton } from "../../../buttons";
import { warrantyActiveAtom } from "./ProtectPurchaseCard";
import Collapsible from 'react-collapsible';


export const modifiersIdforModifiersAtom = atom<number[]>({
  key: "modifiersIdforModifiersAtom",
  default: [],
});
export const modifierActiveAtom = atom({
  key:"modifierActiveAtom",
  default:false
})

const useModifiers = () => {
  const [modifiers, setModifiers] = useRecoilState(ModifiersGroupAtom);
  const [modifiersIdforModifiers, setModifiersIdforModifiers] = useRecoilState(
    modifiersIdforModifiersAtom
  );
  const [modifierActive,setModifierActive]=useRecoilState(modifierActiveAtom)
  const [warrantyActive,setWarrantyActive]=useRecoilState(warrantyActiveAtom)



  const addModifiers = (id: number) => {
    setModifiersIdforModifiers([]);
    setModifiersIdforModifiers((prev) => [...prev, id]);
    // const index = modifiersIdforModifiers.findIndex(
    //   (modifier) => modifier === id
    // );
    // if (index > -1) {
    //   setModifiersIdforModifiers((prev) => prev.filter((item) => item !== id));
    // } else {
    //   setModifiersIdforModifiers((prev) => [...prev, id]);
    // }
  };

  return {
    modifiersIdforModifiers,
    modifiersRender: (
      <div className="">
        {/* {Object.keys(modifiers).map(key => {
          if(key !== "warranty"){
            return(
              <BaseButton onClick={() => (setModifierActive(!modifierActive),setWarrantyActive(false))} className="w-full border py-2 flex justify-between cursor-pointer px-3">
                <span className="font-bold">buy It</span>
                <svg
                  data-accordion-icon
                  className={`w-6 h-6  shrink-0 inline-block transition-all duration-500 ease-in-out ${modifierActive ? "rotate-180": "rotate-0"}`}
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
              </BaseButton>
            )
          }
        })}
        <div className={`transition-all duration-200 ease-in-out  ${modifierActive ? "h-fit opacity-100 block" : "hidden h-0 opacity-0"}`}>
          {
            Object.keys(modifiers).map((key) => {
              const value = modifiers[key];
              if (key !== "warranty") {
                return (
                  <div
                  className={`px-5 `}
                    key={uuidv4()}
                    
                  >
                    <label
                      onClick={() => setModifiersIdforModifiers([])}
                      className=""
                    >
                      <input
                        type="radio"
                        checked={
                          modifiersIdforModifiers.length === 0 ? true : false
                        }
                      />
                      <span className="design"></span>
                      <span className="value">no package</span>
                    </label>
                    {value.map((val) => {
                      return (
                        <div
                          onClick={() => addModifiers(val.id)}
                          key={uuidv4()}
                          className={`cursor-pointer w-[80%] border hover:-translate-y-0.5 hover:shadow-sm duration-300 my-2 ${
                            modifiersIdforModifiers.findIndex(
                              (item) => item === val.id
                            ) > -1
                              ? "border-green-950"
                              : " "
                          } `}
                        >
                          <label className="">
                            <input
                              type="radio"
                              checked={
                                modifiersIdforModifiers.findIndex(
                                  (item) => item === val.id
                                ) > -1
                                  ? true
                                  : false
                              }
                            />
                            <span className="design"></span>
                            <span className="value">{val.name}</span>
                          </label>
                          <div className="flex ">
                            {val.modifiers.map((item) => {
                              return (
                                <div key={item.id} className="flex justify-around">
                                  <Image
                                    src={item.image}
                                    alt="Picture of the author"
                                    width={70}
                                    height={70}
                                  />
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              }
            })
        }
      </div> */}
      <div>
        {Object.keys(modifiers).map(key => {
          if(key !== "warranty"){
            return(
              
              <Collapsible trigger={<div  onClick={() => (setModifierActive(!modifierActive))} className="border flex py-2 px-3 justify-between">
                <span className="font-bold">buy with</span>
                <svg
                  data-accordion-icon
                  className={`w-6 h-6  shrink-0 inline-block transition-all duration-500 ease-in-out ${modifierActive ? "rotate-180": "rotate-0"}`}
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
                </div>}>
              {
                    Object.keys(modifiers).map((key) => {
                      const value = modifiers[key];
                      if (key !== "warranty") {
                        return (
                          <div
                          className={`px-5 `}
                            key={uuidv4()}
                            
                          >
                            <label
                              onClick={() => setModifiersIdforModifiers([])}
                              className=""
                            >
                              <input
                                type="radio"
                                checked={
                                  modifiersIdforModifiers.length === 0 ? true : false
                                }
                              />
                              <span className="design"></span>
                              <span className="value">no package</span>
                            </label>
                            {value.map((val) => {
                              return (
                                <div
                                  onClick={() => addModifiers(val.id)}
                                  key={uuidv4()}
                                  className={`cursor-pointer w-[80%] border hover:-translate-y-0.5 hover:shadow-sm duration-300 my-2 ${
                                    modifiersIdforModifiers.findIndex(
                                      (item) => item === val.id
                                    ) > -1
                                      ? "border-green-950"
                                      : " "
                                  } `}
                                >
                                  <label className="">
                                    <input
                                      type="radio"
                                      checked={
                                        modifiersIdforModifiers.findIndex(
                                          (item) => item === val.id
                                        ) > -1
                                          ? true
                                          : false
                                      }
                                    />
                                    <span className="design"></span>
                                    <span className="value">{val.name}</span>
                                  </label>
                                  <div className="flex ">
                                    {val.modifiers.map((item) => {
                                      return (
                                        <div key={item.id} className="flex justify-around">
                                          <Image
                                            src={item.image}
                                            alt="Picture of the author"
                                            width={70}
                                            height={70}
                                          />
                                        </div>
                                      );
                                    })}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        );
                      }
                    })
                }
            </Collapsible>
            )
          }
        })}
      </div>
      </div>
    ),
  };
};

export default useModifiers;

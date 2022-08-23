import React, { useState } from "react";
import { atom, useRecoilState } from "recoil";
import { ModifiersGroupAtom } from "../../../../helper";
import { v4 as uuidv4 } from "uuid";
import Image from "next/image";

export const modifiersIdforModifiersAtom = atom<number[]>({
  key: "modifiersIdforModifiersAtom",
  default: [],
});

const useModifiers = () => {
  const [modifiers, setModifiers] = useRecoilState(ModifiersGroupAtom);
  const [modifiersIdforModifiers, setModifiersIdforModifiers] = useRecoilState(
    modifiersIdforModifiersAtom
  );
  console.log(modifiers);

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
        {Object.keys(modifiers).map((key) => {
          const value = modifiers[key];
          if (key !== "warranty") {
            return (
              <div
                key={uuidv4()}
                className="shadow-[0_0_10px_rgba(0,0,0,0.25)] sm:px-3 sm:w-[100%] pt-10 md:pl-10 mt-10 h-fit rounded-md pb-7"
              >
                <div className=" py-5 pr-10 text-left">
                  <span className=" text-lg font-bold tracking-[0.03em]">
                    By with
                  </span>
                </div>
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
        })}
      </div>
    ),
  };
};

export default useModifiers;

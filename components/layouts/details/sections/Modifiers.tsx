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
                {value.map((val) => {
                  return (
                    <div key={uuidv4()}>
                      <label onClick={() => addModifiers(val.id)} className="">
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
                            <div className="flex justify-around">
                              <Image
                                src={item.image}
                                alt="Picture of the author"
                                width={100}
                                height={100}
                              />
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
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
              </div>
            );
          }
        })}
      </div>
    ),
  };
};

export default useModifiers;

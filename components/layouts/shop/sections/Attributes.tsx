import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  AttributesShopAtom,
  AttributesShopType,
} from "../../../../helper";
import { BaseButton } from "../../../buttons";
import { totherightArrowIcon } from "../../../icons/Icons";
import { FiltersQueryAtom } from "./MainSection";

let seleAttribute: { [key: number]: number[] } = {} as {
  [key: number]: number[];
};
let toCheck: number[] = [];


const useAttributes = () => {
  const attributes= useRecoilValue(AttributesShopAtom);
  const [val, setVal] = useState<number>();
  const [queryFilters, setQueryFilters] = useRecoilState(FiltersQueryAtom);

  const {replace,query} = useRouter()


  useEffect(() => {
    let value: number[] = [];
    if (typeof query.attribute !== "undefined") {
      //@ts-ignore
      const att = query?.attribute?.split("_");
      att.map((item: string) => {
        value = [];
        const aa = item.split("-");
        const bb = aa[1]?.split("*");
        bb?.map((item) => {
          value = [...value, +item];
          seleAttribute = { ...seleAttribute, [+aa[0]]: [...value] };
        });
      });
    }
    setQueryFilters((prev) => {
      return { ...prev, SelectedAttribute: seleAttribute };
    });
  }, [query.attribute]);

  const activeHandler = (attribute: AttributesShopType) => {
    if (attribute.attribute_values.length > 0) {
      setVal(attribute.id);
      if (val === attribute.id) {
        setVal(0);
      }
    }
  };

  const handelValues = (attributeId: number, attValueID: number) => {
    const index = Object.keys(seleAttribute).findIndex(
      (attribute) => +attribute === attributeId
    );
    if (index < 0) {
      seleAttribute = { ...seleAttribute, [attributeId]: [attValueID] };
    } else if (index >= 0) {
      Object.keys(seleAttribute).map((key) => {
        const values = [...seleAttribute[+attributeId]];
        const valueIndex = values.findIndex((value) => value === attValueID);
        if (valueIndex < 0) {
          if (+key === attributeId) {
            values.push(attValueID);
            seleAttribute = { ...seleAttribute, [key]: [...values] };
          }
        } else if (valueIndex >= 0) {
          if (+key === attributeId) {
            values.splice(valueIndex, 1);
            seleAttribute = { ...seleAttribute, [key]: [...values] };
          }
        }
      });
    }

    const keys = Object.keys(seleAttribute);
    let newSelected: { [key: number]: number[] } = {};
    keys.filter((key) => {
      const value = seleAttribute[+key];
      if (value.length !== 0) newSelected[+key] = value;
    });
    seleAttribute = newSelected;

    let aa: string = "";
    Object.keys(seleAttribute).map((key) => {
      const value = seleAttribute[+key];
      aa = aa + key + "-";
      value.map((val, i) => {
        if (value.length - 1 === i) {
          aa = aa + val;
        } else {
          aa = aa + val + "*";
        }
      });
      aa = aa + "_";
    });

    replace({ query: { ...query, attribute: aa } }, undefined, {
      scroll: false,
    });

    setQueryFilters((prev) => {
      return { ...prev, SelectedAttribute: seleAttribute };
    });
  };


  useEffect(() => {
    toCheck = [];
    Object.keys(queryFilters.SelectedAttribute).map((key) => {
      const value = queryFilters.SelectedAttribute[+key];
      value.map((val) => {
        toCheck = [...toCheck, val];
      });
    });
  }, [queryFilters.SelectedAttribute]);

  return {
    AttributeRender: (
      <div>
        {attributes.map((attribute) => {
          return (
            <ul key={attribute.id} className="">
              <li>
                <BaseButton
                  onClick={() => activeHandler(attribute)}
                  className="my-3 w-full border-b"
                >
                  <div className="flex justify-between items-center">
                    <span>{attribute.name}</span>
                    <span>
                      {attribute.attribute_values.length > 0
                        ? totherightArrowIcon
                        : null}
                    </span>
                  </div>
                </BaseButton>
                {attribute.attribute_values.map((att_value) => {
                  if (attribute.id === val) {
                    return (
                      <ul key={att_value.id}>
                        <li>
                          <label className="shopContainer flex items-center">
                            {att_value.name}
                            <input
                              onChange={() =>
                                handelValues(attribute.id, att_value.id)
                              }
                              checked={
                                toCheck.findIndex(
                                  (bran) => bran === att_value.id
                                ) > -1
                                  ? true
                                  : false
                              }
                              className="checkbox"
                              type="checkbox"
                            />
                            <span className="text-sm  shopCheckmark"></span>
                          </label>
                        </li>
                      </ul>
                    );
                  }
                })}
              </li>
            </ul>
          );
        })}
      </div>
    ),
  };
};

export default useAttributes;

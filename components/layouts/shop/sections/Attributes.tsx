import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { AttributesShopAtom, AttributesShopType, SelectedAttributeAtom } from "../../../../helper";
import { BaseButton } from "../../../buttons";
import { totherightArrowIcon } from "../../../icons/Icons";




const useAttributes = () => {
  const [attributes, setAttributes] = useRecoilState(AttributesShopAtom);
  const [val, setVal] = useState<number>();
  const [selectedAttribute, setSelectedAttribute] = useRecoilState(SelectedAttributeAtom);

  const activeHandler = (attribute: AttributesShopType) => {
    if (attribute.attribute_values.length > 0) {
      setVal(attribute.id);
      if (val === attribute.id) {
        setVal(0);
      }
    }
  };

  const handelValues = (attributeId: number, attValueID: number) => {
    const index = Object.keys(selectedAttribute).findIndex(
      (attribute) => +attribute === attributeId
    );
    if (index < 0) {
      setSelectedAttribute({
        ...selectedAttribute,
        [attributeId]: [attValueID],
      });
    } else if (index >= 0) {
      Object.keys(selectedAttribute).map((key) => {
        const values = [...selectedAttribute[+attributeId]];
        
        const valueIndex = values.findIndex((value) => value === attValueID);
        if (valueIndex < 0) {
          if (+key === attributeId) {
            
            values.push(attValueID);
            setSelectedAttribute({ ...selectedAttribute, [key]: [...values] });
          }
        } else if (valueIndex >= 0) {
          if (+key === attributeId) {
            values.splice(valueIndex, 1);
            setSelectedAttribute({ ...selectedAttribute, [key]: [...values] });
          }
        }
      });
    }
  };

  return {
    selectedAttribute,
    AttributeRender:(
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
                        <label  className="shopContainer flex items-center">
                          {att_value.name}
                          <input
                          
                            onChange={() =>
                              handelValues(attribute.id, att_value.id)
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
  )};
};

export default useAttributes;

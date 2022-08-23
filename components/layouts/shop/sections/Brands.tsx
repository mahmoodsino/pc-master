import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { BrandsAtom, selectBrandAtom } from "../../../../helper";



const useBrands = () => {
  const [brands, setBrands] = useRecoilState(BrandsAtom);
  const [selectBrand,setSelectBrand]=useRecoilState(selectBrandAtom)
  const handeBrands =async (id: number) => {
    const index = selectBrand.findIndex((brand) => brand === id);
    if (index < 0) {
      setSelectBrand(prev => [...prev,id])
    } else if (index >= 0) {
      setSelectBrand(prev => prev.filter(item => item!==id))
    }

  };
  

  return {
    selectBrand,
    render:(
    <div className=" flex flex-col justify-between  text-sm tracking-[0.03em] cursor-pointer ">
      {brands.map((brand) => {
        return (
          <div className="" key={brand.id}>
            <label  className="shopContainer flex items-center pb-1 mt-0 border-b">
              {brand.name}
              <input
                onChange={() =>( handeBrands(brand.id))}
                checked={selectBrand.findIndex(bran => bran===brand.id)>-1 ? true : false }
                className="checkbox"
                type="checkbox"
              />
              <span className="text-sm  shopCheckmark"></span>
            </label>
          </div>
        );
      })}
    </div>
  )};
};

export default useBrands;

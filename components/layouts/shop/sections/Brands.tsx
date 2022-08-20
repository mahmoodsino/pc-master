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
      // brandNum.push(id)
    } else if (index >= 0) {
      setSelectBrand(prev => prev.filter(item => item!==id))
      // brandNum.splice(index,1)
    }

  };
  

  return {
    selectBrand,
    render:(
    <div className=" flex flex-col justify-between  text-sm tracking-[0.03em] cursor-pointer  border-t border-b border-t-white">
      {brands.map((brand) => {
        return (
          <div key={brand.id}>
            <label  className="shopContainer flex items-center">
              {brand.name}
              <input
                onChange={() =>( handeBrands(brand.id))}
                
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

import { useRouter } from "next/router";
import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { BrandsAtom, selectBrandAtom } from "../../../../helper";
import { FiltersQueryAtom } from "./MainSection";


let SleBran :number[] = []
const useBrands = () => {
  const [brands, setBrands] = useRecoilState(BrandsAtom);
  // const [selectBrand,setSelectBrand]=useRecoilState(selectBrandAtom)
  const{push}=useRouter()
  const [queryFilters,setQueryFilters]=useRecoilState(FiltersQueryAtom)
  


  const handeBrands =async (id: number) => {
    const index = SleBran.findIndex((brand) => brand === id);
    if (index < 0) {
      SleBran=[...SleBran,id]
      // setSelectBrand(prev => [...prev,id])
    } else if (index >= 0) {
      SleBran=SleBran.filter((item) => item !== id)
      // setSelectBrand(prev => prev.filter(item => item!==id))
    }
    // let stringwithhyphen=bran.map(element=>element).join("-")    
    setQueryFilters(prev => {
      return(
        {
          ...prev,SelectedBrands:SleBran
        }
      )
    })

  };
  

  return {
    // selectBrand,
    // setSelectBrand,
    
    render:(
    <div className=" flex flex-col justify-between  text-sm tracking-[0.03em] cursor-pointer ">
      {brands.map((brand) => {
        return (
          <div className="" key={brand.id}>
            <label  className="shopContainer flex items-center  border-b mt-0 mb-0 py-2">
              {brand.name}
              <input
                onChange={() =>( handeBrands(brand.id))}
                checked={queryFilters.SelectedBrands.findIndex(bran => bran===brand.id)>-1 ? true : false }
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

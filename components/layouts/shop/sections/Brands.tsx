import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { BrandsAtom} from "../../../../helper";
import { FiltersQueryAtom } from "./MainSection";


let SleBran :number[] = []
export let selCategory: number[] = [];

const useBrands = () => {
  const [brands, setBrands] = useRecoilState(BrandsAtom);
  const{push}=useRouter()
  const [queryFilters,setQueryFilters]=useRecoilState(FiltersQueryAtom)
  
  const { replace, query } = useRouter();


  useEffect(() => {
    if(typeof(query.category) !=="undefined"){
      //@ts-ignore
      const q = query?.category?.split("-")
      q.map((item:string) =>{
        let index:number=selCategory.findIndex(find => ( find===(+item)))  
        if(index<0 && +item!=0){
          selCategory=[...selCategory,+item]
        }
      })
    }
    setQueryFilters((prev) => {
      return {
        ...prev,
        SelectedCategories: selCategory,
      };
    });
  },[query.category])

  useEffect(() => {
    if(typeof(query.brand)!==undefined){
      //@ts-ignore
      const q= query?.brand?.split("-")
      q?.map((item:string) => {
        let index:number=SleBran.findIndex(find => ( find===(+item)))  
        if(index<0&&+item!=0){
          SleBran=[...SleBran,+item]
        }      
      })
      
    }
    setQueryFilters((prev) => {
      return {
        ...prev,
        SelectedBrands: SleBran,
      };
    });
  },[query.brand])


  const handeBrands =async (id: number) => {
    const index = SleBran.findIndex((brand) => brand === id);
    if (index < 0) {
      SleBran=[...SleBran,id]
    } else if (index >= 0) {
      SleBran=SleBran.filter((item) => item !== id)
    }

    let queryBrand = SleBran.map((item) => item).join("-");
    replace(
      {query: { ...query, brand: queryBrand },},
      undefined,{scroll: false,}
    );
    

    setQueryFilters(prev => {
      return(
        {
          ...prev,SelectedBrands:SleBran
        }
      )
    })

  };
  

  return {
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

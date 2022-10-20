import { useRouter } from "next/router";
import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { RatingAtom } from "../../../../helper";
import { StarIcon } from "../../../icons";
import { FiltersQueryAtom } from "./MainSection";


  let rate : number

const useRating = () => {
  // const [ratingState,setRatingState]=useRecoilState(RatingAtom)
  const{push}=useRouter()
  const [queryFilters,setQueryFilters]=useRecoilState(FiltersQueryAtom)

  const { replace, query } = useRouter();

  const handelRating = (ratingNumber: number) => {
    if(queryFilters.rating===ratingNumber){
      // setRatingState(0)
      rate = 0
      setQueryFilters(prev => {
        return(
          {...prev , rating:0}
        )
      })
    }else{
      // setRatingState(ratingNumber)
      rate = ratingNumber
      

      setQueryFilters(prev=>{
        return(
          {
            ...prev,rating:ratingNumber
          }
        )
      })
    }

    // replace({
    //   query: { ...query, rate: rate }
      
    // },
    // undefined,{
    //   scroll:false
    // }
    // );
  };

  return {
    // ratingState,
    // setRatingState,
    rende:(
    <div className="">
      <label  className="shopContainer flex items-center">
        <StarIcon className="w-5 h-5 text-yellow-400" />
        <StarIcon className="w-5 h-5 text-yellow-400" />
        <StarIcon className="w-5 h-5 text-yellow-400" />
        <StarIcon className="w-5 h-5 text-yellow-400" />
        <StarIcon className="w-5 h-5 text-yellow-400" />
        <input
          onChange={() => handelRating(5)}
          checked={queryFilters.rating===5 ? true : false}
          className="checkbox"
          type="checkbox"
        />
        <span className="text-sm  shopCheckmark"></span>
      </label>

      <label  className="shopContainer flex items-center">
        <StarIcon className="w-5 h-5 text-yellow-400" />
        <StarIcon className="w-5 h-5 text-yellow-400" />
        <StarIcon className="w-5 h-5 text-yellow-400" />
        <StarIcon className="w-5 h-5 text-yellow-400" />
        <StarIcon className="w-5 h-5 tex text-gray-300" />
        <input
          onChange={() => handelRating(4)}
          checked={queryFilters.rating===4 ? true : false}

          className="checkbox"
          type="checkbox"
        />
        <span className="text-sm  shopCheckmark"></span>
      </label>
      <label  className="shopContainer flex items-center">
        <StarIcon className="w-5 h-5 text-yellow-400" />
        <StarIcon className="w-5 h-5 text-yellow-400" />
        <StarIcon className="w-5 h-5 text-yellow-400" />
        <StarIcon className="w-5 h-5 tex text-gray-300" />
        <StarIcon className="w-5 h-5 tex text-gray-300" />
        <input
          onChange={() => handelRating(3)}
          checked={queryFilters.rating===3 ? true : false}

          className="checkbox"
          type="checkbox"
        />
        <span className="text-sm  shopCheckmark"></span>
      </label>
      <label  className="shopContainer flex items-center">
        <StarIcon className="w-5 h-5 text-yellow-400" />
        <StarIcon className="w-5 h-5 text-yellow-400" />
        <StarIcon className="w-5 h-5 tex text-gray-300" />
        <StarIcon className="w-5 h-5 tex text-gray-300" />
        <StarIcon className="w-5 h-5 tex text-gray-300" />
        <input
          onChange={() => handelRating(2)}
          checked={queryFilters.rating===2 ? true : false}

          className="checkbox"
          type="checkbox"
        />
        <span className="text-sm  shopCheckmark"></span>
      </label>
      <label  className="shopContainer flex items-center">
        <StarIcon className="w-5 h-5 text-yellow-400" />
        <StarIcon className="w-5 h-5 tex text-gray-300" />
        <StarIcon className="w-5 h-5 tex text-gray-300" />
        <StarIcon className="w-5 h-5 tex text-gray-300" />
        <StarIcon className="w-5 h-5 tex text-gray-300" />
        <input
          onChange={() => handelRating(1)}
          checked={queryFilters.rating===1 ? true : false}

          className="checkbox"
          type="checkbox"
        />
        <span className="text-sm  shopCheckmark"></span>
      </label>

      
    </div>
  )};
};

export default useRating;

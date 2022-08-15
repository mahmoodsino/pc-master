import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { RatingAtom } from "../../../../helper";
import { StarIcon } from "../../../icons";



const useRating = () => {
  const [ratingState,setRatingState]=useRecoilState(RatingAtom)

  const handelRating = (ratingNumber: number) => {
    if(ratingState===ratingNumber){
      setRatingState(-1)
    }else{

      setRatingState(ratingNumber)
    }
    
    
  };

  return {
    ratingState,
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
          checked={ratingState===5 ? true : false}
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
          checked={ratingState===4 ? true : false}

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
          checked={ratingState===3 ? true : false}

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
          checked={ratingState===2 ? true : false}

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
          checked={ratingState===1 ? true : false}

          className="checkbox"
          type="checkbox"
        />
        <span className="text-sm  shopCheckmark"></span>
      </label>

      
    </div>
  )};
};

export default useRating;

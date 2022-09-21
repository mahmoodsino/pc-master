import Image from "next/image";
import React, { useEffect, useState } from "react";
import BaseButton from "../buttons/BaseButton";
import ShopCarousel from "../carousel/ShopCarousel";
import HeartIcon from "../icons/HeartIcon";
import no_image from "../../public/assets/image/no_image.jpg";
import {
  addToWishList,
  deleteWishList,
  getWishList,
  imagesType,
  TokenAtom,
  Variation,
  VariationAtom,
  WishListAtom,
} from "../../helper";
import { useRouter } from "next/router";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { RedHeartIcon } from "../icons";

interface cardType {
  image: imagesType[];
  price: number;
  description: string;
  id: number;
  variation: Variation;
  in_wishlist: boolean;
  name:string
}

const BaseCard = ({
  image,
  price,
  description,
  id,
  variation,
  in_wishlist,
  name
}: cardType) => {
  const [hover, setHover] = useState(false);
  const [wishList, setWishList] = useRecoilState(WishListAtom);
  const token = useRecoilValue(TokenAtom);
  


  const push = useRouter().push;

  const handelDetails = async (detaiId: number) => {
    push({
      pathname: "/details",
      query: { product: encodeURI(detaiId.toString()) },
    });
  };

  const handelAddVariationToWishList = async (clikedItem: Variation) => {
    setWishList((prev) => {
      return [
        ...prev,
        {
          title: "my favorait item",
          quantity: 1,
          company_id: 1,
          product_id: id,
          branch_id: 1,
          description: "item",
          variation_id: clikedItem.id,
          variation: clikedItem,
        },
      ];
    });

    const res = await addToWishList(
      token,
      id,
      clikedItem.id,
      1,
      1,
      1,
      "my favorait item",
      "my favorait item"
    );
    if(res){

      const response = await getWishList(token);
      setWishList(response.result.items);
    }
  };

  const removeFromWishList = async (Variat: Variation) => {
    const index = wishList.findIndex(
      (item) => item.variation?.id === Variat.id
    );
    if (index >= 0) {
      const id = wishList[index].id;
      if (id) {
        const res = await deleteWishList(token, id);
      }
    }
    const response = await getWishList(token);
    setWishList(response.result.items);
  };

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="border mb-3 border-gray-1500 md:w-[100%] sm:w-[100%] md:h-[360px] py-2  hover:border-green-950 hover:shadow-md  md:px-7 sm:px-4"
    >
      <div>
        <div
          className={`h-[220px] duration-500  border border-white ${
            hover ? "scale-105 " : ""
          }`}
        >
          {image.length > 0 ? (
            <ShopCarousel img={image} hover={hover} />
          ) : (
            <div className=" mt-3 ml-3 ">

              <Image width={200} height={200} src={no_image} />
            </div>
          )}
        </div>
        <div className=" flex items-center justify-start  mt-3">
          <BaseButton
            onClick={() => handelDetails(id)}
            className="py-0.5 px-4 text-white  bg-green-950 font-bold rounded-full "
            title="Options"
          />
        </div>
      </div>

      <div className="h-[30%] mt-5 ml-1">
        <span className="text-lg font-bold md:leading-[24px] md:tracking-[0.055em] mb-1">
          ${price}
        </span>
        <div className="flex  justify-between pt-3 ">
          <span className="line-clamp text-sm md:leading-[19px] block w-[80%]  md:tracking-[0.03em]">
            {/* {description} */}
            {name}
          </span>
            {in_wishlist ? (
              <RedHeartIcon
                onClick={() => removeFromWishList(variation)}
                className="w-4 cursor-pointer"
              />
            ) : (
              <HeartIcon
                onClick={() =>
                  token.length > 1
                    && handelAddVariationToWishList(variation)
                }
                className="w-4 cursor-pointer"
              />
            )}
        </div>
      </div>
    </div>
  );
};

export default BaseCard;

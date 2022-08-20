import Image from "next/image";
import React, { useEffect, useState } from "react";
import BaseButton from "../buttons/BaseButton";
import ShopCarousel from "../carousel/ShopCarousel";
import HeartIcon from "../icons/HeartIcon";
import no_image from "../../public/assets/image/no_image.jpg";
import {
  addToWishList,
  CouninueAsGuestModalAtom,
  deleteWishList,
  DetailsAtom,
  getWishList,
  ModifiersGroupAtom,
  OpenAddToWishListAtom,
  TokenAtom,
  Variation,
  VariationAtom,
  WishListAtom,
} from "../../helper";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { RedHeartIcon } from "../icons";

interface cardType {
  image: string[];
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
  const [detailsState, setDetailState] = useRecoilState(DetailsAtom);
  const [modifiers, setModifiers] = useRecoilState(ModifiersGroupAtom);

  const [wishList, setWishList] = useRecoilState(WishListAtom);
  const [token, setToken] = useRecoilState(TokenAtom);
  const [ContinueAsGuestModal, setContinueAsGuestModal] = useRecoilState(
    CouninueAsGuestModalAtom
  );
  const [openAddToWishList, setOpenAddToWishList] = useRecoilState(
    OpenAddToWishListAtom
  );
  const [variationState, setVariationState] = useRecoilState(VariationAtom);


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
          ...detailsState,
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
      className="border mb-3 border-gray-1500 md:w-[98%] sm:w-[100%] md:h-[95%] py-2  hover:border-green-950 hover:shadow-md  md:px-7 sm:px-4"
    >
      <div>
        <div
          className={`h-[41%] duration-500 ${
            hover ? "scale-105 opacity-80" : ""
          }`}
        >
          {image.length > 0 ? (
            <ShopCarousel img={image} hover={hover} />
          ) : (
            <Image src={no_image} />
          )}
        </div>
        <div className=" ">
          <BaseButton
            onClick={() => handelDetails(id)}
            className="py-0.5 px-4 text-white  bg-green-950 font-bold rounded-full mt-2 "
            title="Options"
          />
        </div>
      </div>

      <div className="h-[30%] mt-5 ml-1">
        <h1 className="text-lg font-bold md:leading-[24px] md:tracking-[0.055em] mb-1">
          ${price}
        </h1>
        <span className="line-clamp text-sm md:leading-[19px]  md:tracking-[0.03em]">
          {/* {description} */}
          {name}
        </span>
        <div className="flex justify-end my-2">
          {in_wishlist ? (
            <RedHeartIcon
              onClick={() => removeFromWishList(variation)}
              className="w-4 cursor-pointer"
            />
          ) : (
            <HeartIcon
              onClick={() =>
                token.length > 1
                  ? handelAddVariationToWishList(variation)
                  : setContinueAsGuestModal(true)
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

import React, { useState } from "react";
import ShopCarousel from "../carousel/ShopCarousel";
import HeartIcon from "../icons/HeartIcon";
import {
  addToWishList,
  CouninueAsGuestModalAtom,
  deleteWishList,
  ErroreMessageAtom,
  imagesType,
  OpenMessageModalAtom,
  SelectedBranchAtom,
  TokenAtom,
  Variation,
  WishListAtom,
} from "../../helper";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { RedHeartIcon } from "../icons";
import Link from "next/link";

interface cardType {
  image: imagesType[];
  price: number;
  description: string;
  id: number;
  variation: Variation;
  in_wishlist: boolean;
  name: string;
}

const BaseCard = ({
  image,
  price,
  id,
  variation,
  in_wishlist,
  name,
}: cardType) => {
  const [hover, setHover] = useState(false);
  const [wishList, setWishList] = useRecoilState(WishListAtom);
  const token = useRecoilValue(TokenAtom);
  const setContinueAsGuestModal = useSetRecoilState(CouninueAsGuestModalAtom);
  const selectedBranch = useRecoilValue(SelectedBranchAtom);
  const setOpenMassegModal = useSetRecoilState(OpenMessageModalAtom);
  const setWrrongMessage = useSetRecoilState(ErroreMessageAtom);


  const handelAddVariationToWishList = async (clikedItem: Variation) => {
    setWishList((prev) => {
      return [
        ...prev,
        {
          title: "my favorait item",
          quantity: 1,
          company_id: 1,
          product_id: id,
          branch_id: selectedBranch?.id,
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
      selectedBranch?.id,
      1,
      "my favorait item",
      "my favorait item"
    );
    if (res === null) {
      setWrrongMessage("some thing went wrong");
      setOpenMassegModal(true);
    } else {
      setWishList(res.result.items);
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
        if (res === null) {
          setWrrongMessage("some thing went wrong");
          setOpenMassegModal(true);
        } else {
          setWishList(res.result.items);
        }
      }
    }
  };

  const handelHeart = () => {
    let isFound = false;
    for (let item of wishList) {
      if (wishList.length === 0) return isFound;
      else if (item?.product_id === id) {
        return (isFound = true);
      }
    }
    return isFound;
  };

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="border mb-3 border-gray-1500 md:w-[100%]  sm:w-[100%] md:h-[320px] sm:h-[100%]   hover:border-green-950 hover:shadow-md  md:px-7 sm:px-1"
    >
      <div>
        <div
          className={`h-[180px] duration-500  border border-transparent ${
            hover ? "scale-105 " : ""
          }`}
        >
          {image.length > 0 ? (
            <ShopCarousel img={image} hover={hover} />
          ) : (
            <div className=" mt-5  product-slider-img">
              <img width={200} height={150} src="/alternative.png" />
            </div>
          )}
        </div>
        <div className="sm:hidden md:flex items-center justify-start  mt-3">
          <Link href={`/details?product=${id}`}>
            <a className="py-0.5 px-4 text-white  bg-green-950 font-bold rounded-full">
              Options
            </a>
          </Link>
        </div>
        <Link
          href={`/details?product=${id}`}
          className="sm:block h-12 font-medium md:hidden mt-1 text-left"
        >
          <span className="md:hidden cursor-pointer sm:block ">
            <span className="line-clamp222">{name}</span>
          </span>
        </Link>
      </div>

      <div className=" h-[40%] md:mt-5 sm:mt-5 ml-1 ">
        <span className="text-lg font-bold sm:hidden md:block md:leading-[24px] md:tracking-[0.055em] mb-1">
          ${price}
        </span>
        <div className="flex items-center justify-between pt-3 mr-4 ">
          <span className=" sm:hidden text-sm md:leading-[19px]  h-fit md:block w-[80%]  md:tracking-[0.03em]">
            <span title={name} className="line-clamp cursor-default">
              {name}
            </span>
          </span>
          <span className="text-lg sm:block md:hidden font-bold md:leading-[24px] md:tracking-[0.055em] mb-1">
            ${price}
          </span>
          {handelHeart() ? (
            <RedHeartIcon
              onClick={() => removeFromWishList(variation)}
              className="w-5 cursor-pointer"
            />
          ) : (
            <HeartIcon
              onClick={() =>
                token.length > 1
                  ? handelAddVariationToWishList(variation)
                  : setContinueAsGuestModal(true)
              }
              className="w-5 cursor-pointer"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default BaseCard;

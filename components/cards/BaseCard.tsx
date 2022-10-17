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
  ErroreMessageAtom,
  getWishList,
  imagesType,
  OpenMessageModalAtom,
  SelectedBranchAtom,
  TokenAtom,
  Variation,
  WishListAtom,
} from "../../helper";
import { useRouter } from "next/router";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { RedHeartIcon } from "../icons";
import {toast} from "react-toastify"
import { MessageModal } from "../messageModal";

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
  description,
  id,
  variation,
  in_wishlist,
  name,
}: cardType) => {
  const [hover, setHover] = useState(false);
  const [wishList, setWishList] = useRecoilState(WishListAtom);
  const token = useRecoilValue(TokenAtom);
  const setContinueAsGuestModal = useSetRecoilState(CouninueAsGuestModalAtom);
  const [selectedBranch,setSelectedBranch]=useRecoilState(SelectedBranchAtom)
  const [openMessageModal, setOpenMassegModal] =
  useRecoilState(OpenMessageModalAtom);
  const [wrongMessage,setWrrongMessage]=useRecoilState(ErroreMessageAtom)

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
      1,
      1,
      "my favorait item",
      "my favorait item"
    );
    if(res===null){
      setWrrongMessage("some thing went wrong");
      setOpenMassegModal(true)
    }

    else{
      const response = await getWishList(token);
      if(response===null){
        toast.error("some thing went wrong")
      }else{
        setWishList(response.result.items);
      }
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
        if(res===null){
          setWrrongMessage("some thing went wrong");
          setOpenMassegModal(true)
        }
        
      }
    }
    const response = await getWishList(token);
    if(response===null){
    }else{
      setWishList(response.result.items);
    }
  };

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="border mb-3 border-gray-1500 md:w-[100%]  sm:w-[100%] md:h-[320px] sm:h-[100%]   hover:border-green-950 hover:shadow-md  md:px-7 sm:px-1"
    >
      <div>
        <div
          className={`h-[180px] duration-500  border border-white ${
            hover ? "scale-105 " : ""
          }`}
        >
          {image.length > 0 ? (
            <ShopCarousel img={image} hover={hover} />
          ) : (
            <div className=" mt-5  product-slider-img">
              <Image width={200} height={150} src={no_image} />
            </div>
          )}
        </div>
        <div className="sm:hidden md:flex items-center justify-start  mt-3">
          <BaseButton
            onClick={() => handelDetails(id)}
            className="py-0.5 px-4 text-white  bg-green-950 font-bold rounded-full "
            title="Options"
          />
        </div>
        <BaseButton onClick={() => handelDetails(id)} className="sm:block h-12 font-medium md:hidden mt-1 text-left">
          <span className="md:hidden sm:block ">
            <span className="line-clamp222">{name}</span>
          </span>
        </BaseButton>
      </div>

      <div className=" h-[40%] md:mt-5 sm:mt-5 ml-1 ">
        <span className="text-lg font-bold sm:hidden md:block md:leading-[24px] md:tracking-[0.055em] mb-1">
          ${price}
        </span>
        <div className="flex items-center justify-between pt-3 mr-4 ">
          <span className=" sm:hidden text-sm md:leading-[19px]  h-fit md:block w-[80%]  md:tracking-[0.03em]">
            <span className="line-clamp">{name}</span>
          </span>
          <span className="text-lg sm:block md:hidden font-bold md:leading-[24px] md:tracking-[0.055em] mb-1">
            ${price}
          </span>
          {in_wishlist ? (
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

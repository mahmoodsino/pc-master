import {  useRecoilValue } from "recoil";
import { WishListAtom, WishListItems } from "../../../../helper";
import { BaseButton } from "../../../buttons";
import { BlusIcon, CartIcon, MinusIcon } from "../../../icons";
import { CloseIcon } from "../../../icons";
import Image from "next/image";


interface Props {
  handelincreaseWishList: (clickedItem: WishListItems) => void;
  handelDecreaseWishList: (id: number, remove?: string) => void;
  moveWishListToCart: (id: number) => void;
}

const MobileWishList = ({
  handelincreaseWishList,
  handelDecreaseWishList,
  moveWishListToCart,
}: Props) => {
  const wishList = useRecoilValue(WishListAtom);

  return (
    <div>
      {wishList.map((item) => {
        return (
          <div
            key={item.id}
            className="md:mx-12 px-5 mb-10 py-5 sm:block lg:hidden shadow-[0_0_5px_rgba(0,0,0,0.12)]"
          >
            <div className="flex justify-end">
              <BaseButton
                onClick={() =>
                  item.id && handelDecreaseWishList(item.id, "remove")
                }
                className=" rounded-full w-5 h-5 flex justify-center items-center bg-red-950/10 text-red-950"
              >
                <CloseIcon className="w-2.5" />
              </BaseButton>
            </div>
            <div className="flex items-center sm:justify-center md:justify-between  border-b pb-5">
              <span className="text-xl font-semibold text-gray-1150 sm:hidden md:block">
                PRODUCT
              </span>
              <div className="flex flex-row items-center space-x-5 ">
                <div className="w-20 h-20 border">
                  {item.product?.image?.id ? (
                    <img
                      style={{ objectFit: "cover" }}
                      className="h-20 w-20 "
                      src={item.product?.image.path}
                      alt=""
                    />
                  ) : (
                    <img src="/alternative.png" />
                  )}
                </div>
                <div>
                  <span className="font-semibold text-lg">{item.title}</span>
                  <div className="block">
                    {item.variation.attributes?.map((atttibute) => {
                      return (
                        <span key={atttibute.id} className="text-sm">
                          {atttibute.attribute_values.name}•{" "}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
            <div className="py-5 flex sm:justify-center md:justify-between border-b">
              <span className="text-xl font-semibold text-gray-1150 sm:hidden md:block">
                PRICE
              </span>
              <span>${item.variation?.price}</span>
            </div>
            <div className="flex sm:justify-center md:justify-between py-5 border-b">
              <span className="text-xl font-semibold text-gray-1150 sm:hidden md:block">
                QTY
              </span>
              <div className="flex border flex-row sm:w-[50%] md:w-[20%] justify-around items-center">
                <BaseButton
                  onClick={() => item.id && handelDecreaseWishList(item.id)}
                  className="text-2xl h-full py-1"
                >
                  <MinusIcon className="w-3.5 text-black" />
                </BaseButton>
                <span className="text-lg font-bold">{item.quantity}</span>
                <BaseButton
                  onClick={() => handelincreaseWishList(item)}
                  className="disabled:cursor-not-allowed h-full py-1"
                >
                  <BlusIcon className="text-black w-4" />
                </BaseButton>
              </div>
            </div>
            <div className="flex sm:justify-center md:justify-between py-5 border-b">
              <span className="text-xl font-semibold text-gray-1150 sm:hidden md:block">
                UNIT PRICE
              </span>
              <span>${item.variation?.price}</span>
            </div>

            <div className="flex justify-center  py-5">
              <BaseButton
                className="bg-white"
                onClick={() => item.id && moveWishListToCart(item.id)}
              >
                <CartIcon className="text-[#777777] w-6 inline-block" />
                <span className="text-gray-1200">Move to Cart</span>
              </BaseButton>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MobileWishList;

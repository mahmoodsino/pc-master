import { useRecoilState } from "recoil";
import { WishListAtom, WishListItems } from "../../../../helper";
import { BaseButton } from "../../../buttons";
import { CartIcon } from "../../../icons";
import { CloseIcon } from "../../../icons";
import { v4 as uuidv4 } from "uuid";
import Image from "next/image";
import no_image from "../../../../public/assets/image/no_image.jpg";

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
  const [wishList, setWishList] = useRecoilState(WishListAtom);

  return (
    <div>
      {wishList.map((item) => {
        return (
          <div
            key={item.id}
            className="md:mx-12 px-5 mb-10 py-5 sm:block lg:hidden shadow-[0_0_10px_rgba(0,0,0,0.25)]"
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
                  {item.variation?.images !== undefined &&
                  item.variation.images.length > 0 ? (
                    <Image src={item.variation.images[0]} alt="" />
                  ) : (
                    <Image src={no_image} />
                  )}
                </div>
                <div>
                  <span className="font-semibold text-lg">{item.title}</span>
                  <div className="block">
                    {item.variation.attributes?.map((atttibute) => {
                      return (
                        <span key={atttibute.id} className="text-sm">
                          {atttibute.attribute_values.name}°{" "}
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
                  className="bg-green-950 rounded-full w-4 h-4 flex justify-center items-center"
                >
                  <h1 className="mt-0.5">-</h1>
                </BaseButton>

                <h1 className="mt-1">2</h1>
                <BaseButton
                  onClick={() => handelincreaseWishList(item)}
                  className="bg-green-950 rounded-full w-4 h-4 flex justify-center items-center"
                >
                  <h1 className="mt-0.5">+</h1>
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

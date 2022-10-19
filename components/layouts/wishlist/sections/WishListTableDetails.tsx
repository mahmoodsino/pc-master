import { useRecoilState } from "recoil";
import { WishListAtom, WishListItems } from "../../../../helper";
import { BaseButton } from "../../../buttons";
import { BlusIcon, CartIcon, MinusIcon } from "../../../icons";
import { CloseIcon } from "../../../icons";
import Image from "next/image";
import no_image from "../../../../public/assets/image/no_image.jpg";

interface Props {
  handelincreaseWishList: (clickedItem: WishListItems) => void;
  handelDecreaseWishList: (id: number, remove?: string) => void;
  moveWishListToCart: (id: number) => void;
}

const WishListTableDetails = ({
  handelincreaseWishList,
  handelDecreaseWishList,
  moveWishListToCart,
}: Props) => {
  const [wishList, setWishList] = useRecoilState(WishListAtom);

  return (
    <div>
      <div className="px-10 py-10 lg:block sm:hidden">
        <table className="w-full">
          <thead className="">
            <tr className="border-b text-left text-xl font-semibold text-gray-1150 ">
              <th className=" p-2 pb-5">PRODUCT</th>
              <th className=" p-2 pb-5 w-auto">PRICE</th>
              <th className=" p-2 pb-5 w-auto">QTY</th>
              <th className=" p-2 pb-5 w-auto">UNIT PRICE</th>
            </tr>
          </thead>
          <tbody>
            {wishList.map((item,i) => {
              return (
                <tr
                  key={i}
                  className="border-b text-left text-gray-1150"
                >
                  <td className=" p-2 w-[38%] ">
                    <div className="flex flex-row items-center space-x-5 ">
                      <BaseButton
                        onClick={() =>
                          item.id && handelDecreaseWishList(item.id, "remove")
                        }
                        className=" rounded-full w-5 h-5 flex justify-center items-center bg-red-950/10 text-red-950"
                      >
                        <CloseIcon className="w-2.5" />
                      </BaseButton>

                      <div className="w-20 h-20">
                        {item.product?.image?.id ? (
                          <img
                          style={{objectFit:"cover"}}
                            className="h-20 w-20 "
                            src={item.product?.image.path}
                            alt=""
                          />
                        ) : (
                          <Image src={no_image} />
                        )}
                      </div>
                      <div>
                        <span className="font-semibold text-lg">
                          {item.title}
                        </span>
                        <div className="">
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
                  </td>
                  <td className="p-2 w-[10%] text-lg">
                    ${item.variation?.price}
                  </td>
                  <td className="p-2 w-[10%]">
                    <div className="w-[88%]">
                      <div className=" w-[129px] border sm:space-x-3 md:space-x-7 px-2 flex justify-around items-center rounded-full border-black">
                        <BaseButton
                          onClick={() =>
                            item.id && handelDecreaseWishList(item.id)
                          }
                          className="text-2xl h-full py-1"
                        >
                          <MinusIcon className="w-3.5 text-black" />
                        </BaseButton>
                        <span className="text-lg font-bold">
                          {item.quantity}
                        </span>
                        <BaseButton
                          onClick={() => handelincreaseWishList(item)}
                          className="disabled:cursor-not-allowed    "
                        >
                          <BlusIcon className="text-black w-4 py-1" />
                        </BaseButton>
                      </div>
                    </div>
                  </td>
                  <td className="p-2 w-[25%]">
                    <div className="flex flex-row justify-between  items-center">
                      <span className="text-lg">${item.variation?.price}</span>
                      <BaseButton
                        className="bg-white"
                        onClick={() => item.id && moveWishListToCart(item.id)}
                      >
                        <CartIcon className="text-[#777777] w-6 inline-block" />
                        <span className="text-gray-1200">Move to Cart</span>
                      </BaseButton>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WishListTableDetails;

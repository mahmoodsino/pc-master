import { async } from "@firebase/util";
import { useRecoilState } from "recoil";
import {
  deleteWishList,
  handelMoveWishListToCart,
  TokenAtom,
  updateWishList,
  WishListAtom,
  WishListItems,
} from "../../../../helper";
import { BaseButton } from "../../../buttons";
import { CartIcon } from "../../../icons";
import { CloseIcon } from "../../../icons";
import { v4 as uuidv4 } from 'uuid';
import Image from "next/image";
import no_image from "../../../../public/assets/image/no_image.jpg";


interface Props {
  handelincreaseWishList: (clickedItem:WishListItems) => void
  handelDecreaseWishList : (id:number , remove?:string) => void
  moveWishListToCart : (id:number) => void
}


const WishListTableDetails = ({handelincreaseWishList,handelDecreaseWishList,moveWishListToCart}:Props) => {
  const [wishList, setWishList] = useRecoilState(WishListAtom);
  

  return (
    <div>
      <div className="px-10 py-10 lg:block sm:hidden">
        <table className="w-full">
          <thead className="">
            <tr className="border-b text-left text-xl font-semibold text-gray-1150 ">
              <th className=" p-2 pb-5">PRODUCT</th>
              <th className=" p-2 pb-5">SIZE</th>
              <th className=" p-2 pb-5 w-auto">COLOR</th>
              <th className=" p-2 pb-5 w-auto">PRICE</th>
              <th className=" p-2 pb-5 w-auto">QTY</th>
              <th className=" p-2 pb-5 w-auto">UNIT PRICE</th>
            </tr>
          </thead>
          <tbody>
            {wishList.map((item) => {
              return (
                <tr key={uuidv4()} className="border-b text-left text-gray-1150">
                  <td className=" p-2 w-[25%] ">
                    <div className="flex flex-row items-center space-x-5 ">
                      <BaseButton
                        onClick={() => item.id && handelDecreaseWishList(item.id,"remove")}
                        className=" rounded-full w-5 h-5 flex justify-center items-center bg-red-950/10 text-red-950"
                      >
                        <CloseIcon className="w-2.5" />
                      </BaseButton>

                      <div className="w-20 h-20">
                      {
                        item.variation?.images !==undefined && item.variation.images.length>0 ?
                      <Image src={item.variation.images[0]} alt="" />
                      :
                      <Image src={no_image} />
                      }
                      </div>
                      <span className="">{item.title}</span>
                    </div>
                  </td>
                  <td className="p-2 pr-20 text-left w-[10%]">
                    Size 1 CT 1 Power 1
                  </td>
                  <td className="p-2 w-[10%] text-gray-1150">
                    <div className="flex space-x-3 items-center">
                      <div className="w-4 h-4 rounded-full bg-blue-700"></div>
                      <span>Blue</span>
                    </div>
                  </td>
                  <td className="p-2 w-[10%] text-lg">
                    ${item.variation?.price}
                  </td>
                  <td className="p-2 w-[10%]">
                    <div className="w-[88%]">
                      <div className="flex border flex-row justify-around items-center">
                        <BaseButton
                          onClick={() =>
                            item.id && handelDecreaseWishList(item.id)
                          }
                          className="bg-green-950 rounded-full w-4 h-4 flex justify-center items-center"
                        >
                          <h1 className="mt-0.5">-</h1>
                        </BaseButton>
                        <h1 className="mt-1">{item.quantity}</h1>
                        <BaseButton
                          onClick={() => handelincreaseWishList(item)}
                          className="bg-green-950 rounded-full w-4 h-4 flex justify-center items-center"
                        >
                          <h1 className="mt-0.5">+</h1>
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

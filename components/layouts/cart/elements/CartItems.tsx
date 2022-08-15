import { BaseButton } from "../../../buttons";
import { BlusIcon } from "../../../icons";
import { MinusIcon } from "../../../icons";
import Image from "next/image";
import { useRecoilState } from "recoil";
import {
  CartItemsAtom,
  deleteCart,
  FetchedCartItemsAtom,
  FetchedItems,
  items,
  TokenAtom,
  updateCart,
} from "../../../../helper";
import { v4 as uuidv4 } from "uuid";
import modifierGroups from "../../../../helper/interfaces/cartItems/modifierGroups";

import no_image from "../../../../public/assets/image/no_image.jpg";

const CartItems = () => {
  const [carts, setCarts] = useRecoilState(FetchedCartItemsAtom);
  const [token, setToken] = useRecoilState(TokenAtom);

  const handleAddToCart = async (clickedItem: FetchedItems) => {
    setCarts((prev) => {
      const isItemInCarts = prev.find((item) => item.id === clickedItem.id);
      if (isItemInCarts) {
        return prev.map((item) =>
          item.id === clickedItem.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [
        ...prev,
        {
          ...clickedItem,
          type: 1,
          quantity: 1,
          product_id: clickedItem.product_id,
          branch_id: 1,
          description: "",
          modifierGroups: [],
          variation_id: clickedItem.variation_id,
        },
      ];
    });
    const isItemInCarts = carts.findIndex((item) => item.id === clickedItem.id);
    if (isItemInCarts >= 0) {
      let newQuantity = carts[isItemInCarts].quantity;
      newQuantity++;
      let id = carts[isItemInCarts].id;
      if (id) {
        const res = await updateCart(token, id, newQuantity, "item");
      }
    }
  };

  const handleRemoveFromCart = async (id: number, reomve?: string) => {
    setCarts((prev) =>
      prev.reduce((ack, item) => {
        if (item.id === id) {
          if (item.quantity === 1) return ack;
          if (reomve) return ack;
          return [...ack, { ...item, quantity: item.quantity - 1 }];
        } else {
          return [...ack, item];
        }
      }, [] as FetchedItems[])
    );

    const isItemInCarts = carts.findIndex((item) => item.id === id);
    let itemQuantity = carts[isItemInCarts].quantity;

    if (itemQuantity > 1 && !reomve) {
      itemQuantity--;
      const res = await updateCart(token, id, itemQuantity, "");
    } else if (itemQuantity === 1 || reomve) {
      const res = await deleteCart(token, id);
    }
  };

  return (
    <div>
      {carts.map((item) => {
        return (
          <div key={uuidv4()}>
            <div className="shadow-[0_0_10px_rgba(0,0,0,0.25)] md:tracking-[0.11em] rounded-md mb-10">
              <h1 className="md:text-xl font-bold   text-center py-5 left-0 right-0 m-auto bg-gray-1350">
                Pickup or delivery from store, within 3 working days
              </h1>
              <div className="md:px-5">
                <div className="flex flex-row">
                  <div className="w-40 ">
                    {item.variation?.images !== undefined &&
                    item.variation.images.length > 0 ? (
                      <Image src={item.variation.images[0]} alt="" />
                    ) : (
                      <Image src={no_image} />
                    )}
                  </div>
                  <div className="flex flex-col justify-center">
                    <div className="flex sm:flex-col md:flex-row justify-between sm:mr-4 md:mr-7">
                      <h1 className="inline-block  text-sm ">
                        {item.description}
                      </h1>
                      <span className="sm:text-sm md:text-base font-bold ">
                        ${item.variation?.price}
                      </span>
                    </div>
                    <h1 className="text-sm  mt-3 mb-6">{item.product?.name}</h1>
                    <span className="text-sm text-red-1000 ">
                      Only {item.available_quantity} left
                    </span>
                  </div>
                </div>
                <div className=" mt-5 ml-12 w-[90%] md:border-b pb-14">
                  {item.modifierGroups.map((it) => {
                    return (
                      <h1 key={it.id} className="md:w-[60%] sm:w-[90%]">
                        {it.name} with price of{" "}
                        <span className="font-semibold">${it.total_price}</span>
                      </h1>
                    );
                  })}
                </div>
                <div className="flex sm:justify-around md:justify-end sm:space-x-2 md:space-x-14 py-6">
                  <BaseButton
                    onClick={() =>
                      item.id && handleRemoveFromCart(item.id, "remove")
                    }
                    title="Remove"
                    className="underline text-sm tracking-[0.05em]"
                  />
                  <BaseButton
                    title="Save for later"
                    className="underline text-sm tracking-[0.05em]"
                  />
                  <div className="border sm:space-x-3 md:space-x-7 px-2 flex items-center rounded-full border-black">
                    <BaseButton
                      onClick={() => item.id && handleRemoveFromCart(item.id)}
                      className="text-2xl"
                    >
                      <MinusIcon className="w-3.5 text-black" />
                    </BaseButton>
                    <span className="text-lg font-bold">{item.quantity}</span>
                    <BaseButton
                      disabled={
                        item.quantity === item.available_quantity ? true : false
                      }
                      onClick={() => handleAddToCart(item)}
                      className="disabled:cursor-not-allowed "
                    >
                      <BlusIcon className="text-black w-4" />
                    </BaseButton>
                  </div>
                  {item.quantity === item.available_quantity && (
                    <h1 className="text-red-950 text-xs ">
                      you cant add more of this product
                    </h1>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CartItems;

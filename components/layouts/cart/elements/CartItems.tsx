import { BaseButton } from "../../../buttons";
import { BlusIcon, TrashIcon } from "../../../icons";
import { MinusIcon } from "../../../icons";
import Image from "next/image";
import { useRecoilState } from "recoil";
import {
  deleteCart,
  FetchedCartItemsAtom,
  FetchedItems,
  TokenAtom,
  updateCart,
} from "../../../../helper";
import { v4 as uuidv4 } from "uuid";
import no_image from "../../../../public/assets/image/no_image.jpg";
import { MutableRefObject, useRef, useState } from "react";
import { Spinner } from "../../../spinner";
import Collapsible from "react-collapsible";

const CartItems = () => {
  const [carts, setCarts] = useRecoilState(FetchedCartItemsAtom);
  const [token, setToken] = useRecoilState(TokenAtom);
  console.log(carts);
  

  const timerRef = useRef() as MutableRefObject<NodeJS.Timeout>;

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

      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(async () => {
        if (id) {
          const res = await updateCart(token, id, newQuantity, "item");
        }
      }, 1000);
    }
  };

  const handleRemoveFromCart = async (id: number, reomve?: string) => {
    setCarts((prev) =>
      prev.reduce((ack, item) => {
        if (item.id === id) {
          if (item.quantity === 1) return ack;
          if (reomve) return ack;
          if (
            item.available_quantity &&
            item.quantity > item.available_quantity
          )
            return [...ack, { ...item, quantity: item.available_quantity - 1 }];
          return [...ack, { ...item, quantity: item.quantity - 1 }];
        } else {
          return [...ack, item];
        }
      }, [] as FetchedItems[])
    );

    const isItemInCarts = carts.findIndex((item) => item.id === id);
    let itemQuantity = carts[isItemInCarts].quantity;
    let availableQuantity = carts[isItemInCarts].available_quantity;

    if (availableQuantity && itemQuantity > availableQuantity) {
      itemQuantity = availableQuantity;
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(async () => {
        const res = await updateCart(token, id, itemQuantity, "item");
      }, 1000);
    }
    if (itemQuantity > 1 && !reomve) {
      itemQuantity--;
      clearTimeout(timerRef.current);

      timerRef.current = setTimeout(async () => {
        const res = await updateCart(token, id, itemQuantity, "item");
      }, 1000);
    } else if (itemQuantity === 1 || reomve) {
      const res = await deleteCart(token, id);
    }
  };

  return (
    <div>
      <div>
        <div className="shadow-[0_0_5px_rgba(0,0,0,0.12)] md:tracking-[0.03em] rounded-md mb-10">
          <h1 className="md:text-xl font-bold   text-center py-5 left-0 right-0 m-auto bg-gray-1350">
            Pickup or delivery from store, within 3 working days
          </h1>
          {carts.map((item) => {
            return (
              <div
                key={uuidv4()}
                className={`md:px-5 ${
                  item.available_quantity &&
                  item.quantity > item.available_quantity
                    ? "bg-red-100"
                    : "bg-white"
                }`}
              >
                <div className="flex flex-row ">
                  <div className="w-40 ">
                    {item.variation?.images !== undefined &&
                    item.variation.images.length > 0 ? (
                      <Image
                        className=""
                        src={item.variation.images[0]}
                        alt=""
                      />
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
                <div className="whitespace-nowrap ml-8  mr-10 w-full">
                  {item.modifierGroups.map((it) => {
                    return (
                      <Collapsible
                      key={uuidv4()}
                        trigger={
                          <BaseButton className="shadow-md flex bg-gray-1350 justify-between items-center w-[90%] border">
                            <span className="font-semibold">{it.name}</span>
                            <div className="space-x-3">
                              <span className="font-semibold">${it.total_price}</span>
                              <svg
                                data-accordion-icon
                                className={`w-6 h-6 inline-block  `}
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                  clipRule="evenodd"
                                ></path>
                              </svg>
                            </div>
                          </BaseButton>
                        }
                      >
                        <div className="ml-5">
                          {it.modifiers.map(modi => {
                            return(
                              <div
                              key={uuidv4()}
                              className="space-x-3 mt-3 bg-cover"
                            >
                              <img
                                className="w-20 bg-cover"
                                src={modi.image}
                                alt="Picture of the author"
                              />
                            </div>
                            )
                          })}
                        </div>
                      </Collapsible>
                    );
                  })}
                  {item.quantity === item.available_quantity && (
                    <h1 className="text-red-950 text-xs ">
                      you cant add more of this product
                    </h1>
                  )}
                </div>

                <div
                  className={`flex sm:justify-around  md:justify-between sm:space-x-2 md:space-x-14 border-b  mx-8 py-6 `}
                >
                  <BaseButton
                    onClick={() =>
                      item.id && handleRemoveFromCart(item.id, "remove")
                    }
                    className="underline text-sm tracking-[0.03em] text-red-950 "
                  >
                    <TrashIcon className=" inline-block w-4 " />
                    Remove
                  </BaseButton>
                  {/* <BaseButton
                    title="Save for later"
                    className="underline text-sm tracking-[0.05em]"
                  /> */}
                  <div className=" w-[129px] border sm:space-x-3 md:space-x-7 px-2 flex justify-around items-center rounded-full border-black">
                    <BaseButton
                      onClick={() => item.id && handleRemoveFromCart(item.id)}
                      className="text-2xl  h-full"
                    >
                      <MinusIcon className="w-3.5 text-black" />
                    </BaseButton>
                    <span className="text-lg font-bold">{item.quantity}</span>
                    <BaseButton
                      disabled={
                        item.quantity === item.available_quantity ? true : false
                      }
                      onClick={() => handleAddToCart(item)}
                      className="disabled:cursor-not-allowed  h-full"
                    >
                      <BlusIcon className="text-black w-4 " />
                    </BaseButton>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CartItems;

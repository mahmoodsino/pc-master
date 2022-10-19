import { BaseButton } from "../../../buttons";
import { BlusIcon, TrashIcon } from "../../../icons";
import { MinusIcon } from "../../../icons";
import Image from "next/image";
import { atom, useRecoilState, useRecoilValue } from "recoil";
import {
  AllCartsInfo,
  deleteCart,
  ErroreMessageAtom,
  FetchedCartItemsAtom,
  FetchedItems,
  OpenMessageModalAtom,
  SelectedBranchAtom,
  TokenAtom,
  updateCart,
} from "../../../../helper";
import no_image from "../../../../public/assets/image/no_image.jpg";
import { MutableRefObject, useRef} from "react";
import Collapsible from "react-collapsible";

export const CartLoading = atom({
  key:"CartLoading",
  default:false
})
const CartItems = () => {
  const [carts, setCarts] = useRecoilState(FetchedCartItemsAtom);
  const token = useRecoilValue(TokenAtom);
  const [selectedBranch, setSelectedBranch] =
    useRecoilState(SelectedBranchAtom);
  const [openMessageModal, setOpenMassegModal] =
    useRecoilState(OpenMessageModalAtom);
  const [wrongMessage, setWrrongMessage] = useRecoilState(ErroreMessageAtom);
  const [loading, setLoading] = useRecoilState(CartLoading)
  const [allCartsInfo, setAllCartsInfo] = useRecoilState(AllCartsInfo);

  const timerRef = useRef() as MutableRefObject<NodeJS.Timeout>;

  const handleAddToCart = async (clickedItem: FetchedItems) => {
    setCarts((prev) => {
      const isItemInCarts = prev.find((item) => item.id === clickedItem.id);
      if (isItemInCarts) {
        return prev.map((item) =>
          item.id === clickedItem.id
            ? {
                ...item,
                quantity: item.quantity + 1,
                actual_quantity: item.actual_quantity + 1,
              }
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
          branch_id: selectedBranch?.id,
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
        setLoading(true);
        if (id) {
          const res = await updateCart(token, id, newQuantity, "item");
          console.log(res);
          if (res === null) {
            setWrrongMessage("some thing went wrong");
            setOpenMassegModal(true);
          }else{
            setAllCartsInfo(res.result);
            setCarts(res.result.items);
          }
        }
        setLoading(false);
      }, 700);
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
            item.actual_quantity > item.available_quantity
          )
            return [
              ...ack,
              {
                ...item,
                quantity: item.available_quantity,
                actual_quantity: item.available_quantity,
              },
            ];
          return [
            ...ack,
            {
              ...item,
              quantity: item.quantity - 1,
              actual_quantity: item.actual_quantity - 1,
            },
          ];
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
        setLoading(true);
        const res = await updateCart(token, id, itemQuantity, "item");
        if (res === null) {
          setWrrongMessage("some thing went wrong");
          setOpenMassegModal(true);
        }
        else{
          setAllCartsInfo(res.result);
          setCarts(res.result.items);
        }
        setLoading(false);
      }, 1000);
    }
    if (itemQuantity > 1 && !reomve) {
      itemQuantity--;
      clearTimeout(timerRef.current);

      timerRef.current = setTimeout(async () => {
        setLoading(true);
        const res = await updateCart(token, id, itemQuantity, "item");
        if (res === null) {
          setWrrongMessage("some thing went wrong");
          setOpenMassegModal(true);
        }
        else{
          setAllCartsInfo(res.result);
          setCarts(res.result.items);
        }
        setLoading(false);
      }, 1000);
    } else if (itemQuantity === 1 || reomve) {
      setLoading(true);
      const res = await deleteCart(token, id);
      if (res === null) {
        setWrrongMessage("some thing went wrong");
        setOpenMassegModal(true);
      }
      else{
        setAllCartsInfo(res.result);
        setCarts(res.result.items);
      }
      setLoading(false);
    }
  };

  return (
    <div className={`${loading && "pointer-events-none"}`}>
        <div>
          <div className="shadow-[0_0_5px_rgba(0,0,0,0.12)] md:tracking-[0.03em] rounded-md mb-10">
            <h1 className="md:text-xl font-bold   text-center py-5 left-0 right-0 m-auto bg-gray-1350">
              Pickup or delivery from store, within 3 working days
            </h1>
            {carts.map((item,i) => {
              return (
                <div
                  key={i}
                  className={`md:px-5 ${
                    item.in_stock < 1
                      ? "bg-red-100"
                      : item.in_stock === 1 &&
                        item.product?.tracking_type === 1 &&
                        "bg-white"
                  } ${
                    item.in_stock === 1 &&
                    item.product?.tracking_type === 2 &&
                    item.actual_quantity > item.available_quantity
                      ? "bg-red-100"
                      : "bg-white"
                  }   ${
                    item.in_stock === 1 &&
                    item.product?.tracking_type === 3 &&
                    item.actual_quantity > item.available_quantity
                      ? "bg-red-100"
                      : "bg-white"
                  }`}
                >
                  <div className="md:flex flex-row ">
                    <div className=" mt-2  product-slider-img mr-2">
                      {item.product?.image?.id ? (
                        <img
                          className="md:h-32 sm: sm:w-[90%] top-0 left-0 right-0 bottom-0 m-auto product-slider-img w-32 "
                          src={item.product?.image.path}
                          alt=""
                        />
                      ) : (
                        <Image src={no_image} />
                      )}
                    </div>
                    <div className="flex flex-col sm:mx-4 md:mx-0 space-y-2 mt-2 justify-center">
                      <div className="flex sm:flex-col md:flex-row justify-between sm:mr-4 md:mr-7">
                        <h1 className="inline-block  text-sm ">
                          {item.description}
                        </h1>
                        <span className="sm:text-sm md:text-base font-bold ">
                          ${item.variation?.price}
                        </span>
                      </div>
                      <span className="text-sm">{item.product?.name}</span>
                      {item.in_stock === 1 &&
                        (item.product?.tracking_type === 2 ||
                          item.product?.tracking_type === 3) &&
                        item.quantity >= item.actual_quantity && (
                          <span className="text-sm text-red-1000 ">
                            Only {item.available_quantity} left
                          </span>
                        )}
                    </div>
                  </div>
                  <div className="whitespace-nowrap ml-8  mr-10 w-full">
                    {item.modifierGroups.map((it,i) => {
                      return (
                        <Collapsible
                          key={i}
                          trigger={
                            <BaseButton className="shadow-md flex mt-1 bg-gray-1350 justify-between items-center w-[90%] border">
                              <span className="font-semibold">{it.name}</span>
                              <div className="space-x-3">
                                <span className="font-semibold">
                                  ${it.total_price}
                                </span>
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
                          <div className="ml-3 flex space-x-1 mt-2">
                            {it.modifiers.map((modi,i) => {
                              return (
                                <img
                                  key={i}
                                  className="w-16 bg-cover flex"
                                  src={modi.image}
                                  alt="Picture of the author"
                                />
                              );
                            })}
                          </div>
                        </Collapsible>
                      );
                    })}
                    <div className="h-4">
                      {item.actual_quantity === item.available_quantity && (
                        <span className="text-red-950 text-xs ">
                          you cant add more of this product
                        </span>
                      )}

                    </div>
                  </div>
                  <div
                    className={`flex sm:justify-around items-center md:justify-between sm:space-x-2 md:space-x-14 border-b  mx-8 py-6 `}
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
                    {item.in_stock > 1 && (
                      <span className="text-sm text-red-400">
                        this item is out of stock
                      </span>
                    )}

                    <div className=" w-[129px] border sm:space-x-3 md:space-x-7 px-2 flex justify-around items-center rounded-full border-black">
                      <BaseButton
                        onClick={() => item.id && handleRemoveFromCart(item.id)}
                        className="text-2xl  py-2  h-full"
                      >
                        <MinusIcon className="w-3.5 text-black" />
                      </BaseButton>
                      <span className="text-lg font-bold">{item.quantity}</span>
                      {item.in_stock === 1 &&
                        item.product?.tracking_type === 1 && (
                          <BaseButton
                            // disabled={
                            //   item.actual_quantity === item.available_quantity ? true : false
                            // }
                            onClick={() => handleAddToCart(item)}
                            className="disabled:cursor-not-allowed h-full py-0.5"
                          >
                            <BlusIcon className="text-black w-4 " />
                          </BaseButton>
                        )}{" "}
                      {item.in_stock === 1 &&
                        (item.product?.tracking_type === 2 ||
                          item.product?.tracking_type === 3) && (
                          <BaseButton
                            disabled={
                              item.actual_quantity === item.available_quantity
                                ? true
                                : false
                            }
                            onClick={() => handleAddToCart(item)}
                            className="disabled:cursor-not-allowed py-0.5 h-full"
                          >
                            <BlusIcon className="text-black w-4 " />
                          </BaseButton>
                        )}
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

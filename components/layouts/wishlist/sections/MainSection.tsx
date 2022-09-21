import Link from "next/link";
import { useRouter } from "next/router";
import { MutableRefObject, useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import {
  AllWishListsInfoAtom,
  deleteWishList,
  getWishList,
  handelMoveWishListToCart,
  OpenMessageModalAtom,
  TokenAtom,
  updateWishList,
  WishListAtom,
  WishListItems,
} from "../../../../helper";
import { Breadcrumbs } from "../../../breadcrumbs";
import { Searchbar } from "../../../header";
import { MessageModal } from "../../../messageModal";
import { Spinner } from "../../../spinner";
import MobileWishList from "./MobileWishList";
import WishListTableDetails from "./WishListTableDetails";

const MainSection = () => {
  const [allWishListsInfo, setAllWishListInfo] =
    useRecoilState(AllWishListsInfoAtom);
  const [wishList, setWishList] = useRecoilState(WishListAtom);
  const [token, setToken] = useRecoilState(TokenAtom);
  const [loading, setLoading] = useState(false);
  const timerRef = useRef() as MutableRefObject<NodeJS.Timeout>;
  const [openMessageModal, setOpenMassegModal] =
    useRecoilState(OpenMessageModalAtom);
    const [wrongMessage,setWrrongMessage]=useState("")

  const { push } = useRouter();

  useEffect(() => {
    const getData = async () => {
      const response = await getWishList(token);
      setAllWishListInfo(response.result);
    };
    if (token.length > 1) {
      getData();
    }
  }, []);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const response = await getWishList(token);
      setWishList(response.result.items);
      setLoading(false);
    };
    if (token.length > 1) {
      getData();
    }
  }, []);

  const handelincreaseWishList = async (clickedItem: WishListItems) => {
    setWishList((prev) => {
      const isItemInCarts = prev.find(
        (item) =>
          item.product_id === clickedItem.product_id &&
          item.variation_id === clickedItem.variation_id
      );
      if (isItemInCarts) {
        return prev.map((item) =>
          item.product_id === clickedItem.product_id &&
          item.variation_id === clickedItem.variation_id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [
        ...prev,
        {
          ...clickedItem,
          quantity: 1,
          product_id: clickedItem.product_id,
          branch_id: 1,
          description: "",
          variation_id: clickedItem.variation_id,
          company_id: 1,
          title: clickedItem.title,
        },
      ];
    });
    const isItemInCarts = wishList.findIndex(
      (item) =>
        item.product_id === clickedItem.product_id &&
        item.variation_id === clickedItem.variation_id
    );
    if (isItemInCarts >= 0) {
      let newQuantity = wishList[isItemInCarts].quantity;
      newQuantity++;
      let id = wishList[isItemInCarts].id;
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(async () => {
        if (id) {
          const res = await updateWishList(
            token,
            id,
            newQuantity,
            "item",
            clickedItem.title
          );
        }
      }, 1000);
    }
  };

  const handelDecreaseWishList = async (id: number, remove?: string) => {
    setWishList((prev) =>
      prev.reduce((ack, item) => {
        if (item.id === id) {
          if (item.quantity === 1) return ack;
          if (remove) return ack;
          return [...ack, { ...item, quantity: item.quantity - 1 }];
        } else {
          return [...ack, item];
        }
      }, [] as WishListItems[])
    );

    const isItemInCarts = wishList.findIndex((item) => item.id === id);
    let itemQuantity = wishList[isItemInCarts].quantity;
    let title = wishList[isItemInCarts].title;
    if (itemQuantity > 1) {
      itemQuantity--;
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(async () => {
        const res = await updateWishList(
          token,
          id,
          itemQuantity,
          "item",
          title
        );
      }, 1000);
    } else if (itemQuantity === 1 || remove) {
      const res = await deleteWishList(token, id);
    }
  };

  const moveWishListToCart = async (id: number) => {
    const res = await handelMoveWishListToCart(token, id);
    if (res === null) {
      setWrrongMessage("there is no available quantity");
      setOpenMassegModal(true)
    }

    push("./cart");
  };

  return (
    <div>
      <Searchbar />
      {!loading ? (
        <div>
          <div className="md:ml-10 mt-5">
            <Breadcrumbs />
          </div>
          <div className="py-3 flex flex-row justify-between items-center md:px-10 mt-10">
            <h1 className="text-[30px] font-bold">Wishlist</h1>
            <div className="w-[75%] mb-2 sm:hidden md:block h-6 border-b-2  border-gray-1600 "></div>
            <Link href="/shop">
              <a className="underline text-lg  whitespace-nowrap">
                Back to shopping
              </a>
            </Link>
          </div>
          <div>
            {wishList.length > 0 ? (
              <div>
                <WishListTableDetails
                  handelDecreaseWishList={handelDecreaseWishList}
                  handelincreaseWishList={handelincreaseWishList}
                  moveWishListToCart={moveWishListToCart}
                />
                <MobileWishList
                  handelDecreaseWishList={handelDecreaseWishList}
                  handelincreaseWishList={handelincreaseWishList}
                  moveWishListToCart={moveWishListToCart}
                />
                <div className="flex sm:justify-center md:justify-end px-10 space-x-10 md:text-xl font-medium mb-10">
                  <span>Sub-total</span>
                  <span>${allWishListsInfo.subtotal_price}</span>
                </div>
              </div>
            ) : (
              <div className="text-center my-10">
                <h1 className="font-semibold text-xl tracking-[0.03em]">
                  wish List is Empty Start shoping
                </h1>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="flex justify-center mt-20">
          <Spinner className="h-40 w-40 fill-green-950" />
        </div>
      )}
      <MessageModal message={wrongMessage} />
    </div>
  );
};

export default MainSection;

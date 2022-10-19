import Link from "next/link";
import { useRouter } from "next/router";
import { MutableRefObject, useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import {
  AllWishListsInfoAtom,
  deleteWishList,
  ErroreMessageAtom,
  getWishList,
  handelMoveWishListToCart,
  OpenMessageModalAtom,
  SelectedBranchAtom,
  TokenAtom,
  updateWishList,
  WishListAtom,
  WishListItems,
} from "../../../../helper";
import { Breadcrumbs } from "../../../breadcrumbs";
import { Searchbar } from "../../../header";
import { Spinner } from "../../../spinner";
import MobileWishList from "./MobileWishList";
import WishListTableDetails from "./WishListTableDetails";
import { toast } from "react-toastify";

const MainSection = () => {
  const [allWishListsInfo, setAllWishListInfo] =
    useRecoilState(AllWishListsInfoAtom);
  const [wishList, setWishList] = useRecoilState(WishListAtom);
  const [token, setToken] = useRecoilState(TokenAtom);
  const [loading, setLoading] = useState(false);
  const timerRef = useRef() as MutableRefObject<NodeJS.Timeout>;
  const [openMessageModal, setOpenMassegModal] =
    useRecoilState(OpenMessageModalAtom);
  const [wrongMessage, setWrrongMessage] = useRecoilState(ErroreMessageAtom);
  const [selectedBranch, setSelectedBranch] =
    useRecoilState(SelectedBranchAtom);
  const [updateLoading,setUpdateLoading]=useState(false)

  const { push } = useRouter();

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const response = await getWishList(token);
      if (response === null) {
        toast.error("some thing wrong happend");
      } else {
        setWishList(response.result.items);
        setAllWishListInfo(response.result);
      }
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
          branch_id: selectedBranch?.id,
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
        setUpdateLoading(true)
        if (id) {
          const res = await updateWishList(
            token,
            id,
            newQuantity,
            "item",
            clickedItem.title
          );
          if (res === null) {
            setWrrongMessage("wrong");
            setOpenMassegModal(true);
          }else{
            setWishList(res.result.items);
            setAllWishListInfo(res.result);
          }
        }
        setUpdateLoading(false)
      }, 700);
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
        setUpdateLoading(true)
        const res = await updateWishList(
          token,
          id,
          itemQuantity,
          "item",
          title
        );
        if (res === null) {
          setWrrongMessage("some thing went wrong");
          setOpenMassegModal(true);
        }
        else{
          setWishList(res.result.items);
          setAllWishListInfo(res.result);
        }
        setUpdateLoading(false)
      }, 700);
    } else if (itemQuantity === 1 || remove) {
      setUpdateLoading(true)
      const res = await deleteWishList(token, id);
      if (res === null) {
        setWrrongMessage("some thing went wrong");
        setOpenMassegModal(true);
      }
      else{
        setWishList(res.result.items);
        setAllWishListInfo(res.result);
      }
      setUpdateLoading(false)
    }
  };

  const moveWishListToCart = async (id: number) => {
    setUpdateLoading(true)
    const res = await handelMoveWishListToCart(token, id);
    if (res === null) {
      setWrrongMessage("some thing went wrong");
      setOpenMassegModal(true);
    }else if(res==400){
      setWrrongMessage("there is no available quantity");
      setOpenMassegModal(true);
    }
    push("./cart");
    setUpdateLoading(false)
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
          <div className={`${updateLoading && "pointer-events-none"}`}>
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
    </div>
  );
};

export default MainSection;

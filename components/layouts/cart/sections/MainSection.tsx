import Link from "next/link";
import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import {
  AllCartsInfo,
  AllWishListsInfoAtom,
  FetchedCartItemsAtom,
  getCartItems,
  NewCartAtom,
  TokenAtom,
  WishListAtom,
} from "../../../../helper";
import { Breadcrumbs } from "../../../breadcrumbs";
import { Searchbar } from "../../../header";
import { Spinner } from "../../../spinner";
import { EditAddressModal } from "../../account";
import { CartItems } from "../elements";
import CartSummary from "./CartSummary";
import { OpenSelectAddressAtom } from "./SelectAddAddress";
import { SelectDelivaryTypeAtom } from "./SelectDelivaryType";

const MainSection = () => {
  const [carts, setCarts] = useRecoilState(FetchedCartItemsAtom);
  const [newCart, setNewCart] = useRecoilState(NewCartAtom);
  const [token, setToken] = useRecoilState(TokenAtom);
  const [allCartsInfo, setAllCartsInfo] = useRecoilState(AllCartsInfo);
  const [allWishListsInfo, setAllWishListInfo] =
    useRecoilState(AllWishListsInfoAtom);
  const [wishList, setWishList] = useRecoilState(WishListAtom);
  const [loading, setLoading] = useState(false);
  const [openSelectAddress, setOpenSelectAddress] = useRecoilState(
    OpenSelectAddressAtom
  );
  const [selectDelivaryTypeState, setSelectDelivaryTypeState] = useRecoilState(
    SelectDelivaryTypeAtom
  );
  const timerRef = useRef() as MutableRefObject<NodeJS.Timeout>;


  useEffect(() => {
    setNewCart([]);
    const getData = async () => {
      const res = await getCartItems(token);
      console.log(res);
      
      if(res===null){
      }else{
        setAllCartsInfo(res.result);
      }
    };
    if (token.length > 1) {
      clearTimeout(timerRef.current);
      timerRef.current=setTimeout(() => {
        getData();
        
      }, 1000);

    }
  }, [carts]);

  useEffect(() => {
    setLoading(true);
    const getData = async () => {
      const res = await getCartItems(token);
      console.log(res);
      
      if(res===null){
      }else{
        setCarts(res.result.items);
      }
        setLoading(false);
    };
    if (token.length > 1) {
      clearTimeout(timerRef.current);
      timerRef.current=setTimeout(() => {
        getData();
        
      }, 1000);

    }
  }, []);

  return (
    <div
      onClick={ () =>
        (openSelectAddress === true
          ? setOpenSelectAddress(false)
          : selectDelivaryTypeState === true
          && setSelectDelivaryTypeState(false)
          )
      }
      className="md:px-10  2xl:px-24 md:ml-4 my-16 2xl:container"
    >
      <Searchbar />
      <div>
        {!loading ? (
          <div>
            <div className="md:ml-10 mt-5">
              <Breadcrumbs />
            </div>
            <div className="py-3 flex flex-row justify-between items-center md:px-10 mt-10">
              <h1 className="text-[30px] font-bold  whitespace-nowrap">
                My Cart
              </h1>
              <div className="w-[75%] sm:hidden md:block mb-2 h-6 border-b-2  border-[#ECECEC] "></div>
              <Link href="/shop">
                <a className="underline text-lg  whitespace-nowrap">
                  Back to shopping
                </a>
              </Link>
            </div>
            {carts.length > 0 ? (
              <div className="md:ml-10 flex sm:flex-col lg:flex-row justify-around mt-10 md:pr-10">
                <div className="lg:w-[56%]">
                  <CartItems />
                </div>
                <div className="lg:w-[35%]">
                  <CartSummary />
                </div>
              </div>
            ) : (
              <div className="text-center ">
                <h1 className="font-semibold text-xl tracking-[0.03em]">
                  Your cart is Empty Start Shoping{" "}
                </h1>
              </div>
            )}
          </div>
        ) : (
          <div className="flex justify-center mt-20">
            <Spinner className="h-40 w-40 fill-green-950" />
          </div>
        )}
      </div>
      <EditAddressModal />
    </div>
  );
};

export default MainSection;

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { AllCartsInfo, AllWishListsInfoAtom, CartItemsAtom, FetchedCartItemsAtom, getCartItems, getWishList, NewCartAtom, TokenAtom, WishListAtom } from "../../../../helper";
import { Breadcrumbs } from "../../../breadcrumbs";
import { Searchbar } from "../../../header";
import { Spinner } from "../../../spinner";
import { CartItems } from "../elements";
import CartSummary from "./CartSummary";

const MainSection = () => {
  const [carts, setCarts] = useRecoilState(FetchedCartItemsAtom);
  const [newCart,setNewCart] = useRecoilState(NewCartAtom)
  const [token, setToken] = useRecoilState(TokenAtom);
  const [allCartsInfo,setAllCartsInfo]=useRecoilState(AllCartsInfo)
  const [allWishListsInfo, setAllWishListInfo] =
    useRecoilState(AllWishListsInfoAtom);
  const [wishList, setWishList] = useRecoilState(WishListAtom);
  const [loading,setLoading]=useState(false)

  useEffect(() => {
    setNewCart([])

    const getData = async () => {
      const res = await getCartItems(token);
      setAllCartsInfo(res.result)
     
    };
    if(token.length>1) {
      getData();
    }
  }, [carts]);

  useEffect(() => {
    
    setLoading(true)
    const getData = async () => {
      const res = await getCartItems(token);
      setCarts(res.result.items);
      if(res){
        setLoading(false)
      }
    };
    if(token.length>1) {
      getData();
    }
  }, []);


  return (
    <div className="md:px-10  2xl:px-24 md:ml-4 my-16 2xl:container">
      <Searchbar />
      <div>
        {!loading ? 
        
        <div>
        <div className="md:ml-10 mt-5">
          <Breadcrumbs />
        </div>
        <div className="py-3 flex flex-row justify-between items-center md:px-10 mt-10">
          <h1 className="text-[30px] font-bold  whitespace-nowrap">My Cart</h1>
          <div className="w-[75%] sm:hidden md:block mb-2 h-6 border-b-2  border-[#ECECEC] "></div>
          <Link href="/shop">
            <a className="underline text-lg  whitespace-nowrap">
              Back to shopping
            </a>
          </Link>
        </div>
        {carts.length > 0 ? (
          <div className="md:ml-10 flex sm:flex-col lg:flex-row justify-between mt-10 md:pr-10">
            <div className="lg:w-[56%]">
              <CartItems />
            </div>
            <div className="lg:w-[35%]">
              <CartSummary />
            </div>
          </div>
        ) : (
          <div className="text-center ">
            <h1 className="font-semibold text-xl tracking-[0.11em]">
              Your cart is Empty Start Shoping{" "}
            </h1>
          </div>
        )}

      </div> :
      <div className="flex justify-center mt-20">
        <Spinner className="h-40 w-40 fill-green-950" />
        
      </div>
        }

      </div>
    </div>
  );
};

export default MainSection;

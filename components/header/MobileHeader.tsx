import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {  ActiveDropDownAtom, CouninueAsGuestModalAtom, FetchedCartItemsAtom, NewCartAtom, ShowSidbarAtom, TokenAtom, WishListAtom } from "../../helper/state";
import { goingUpAtom } from "./FixedNavbar";
import Dropdown from "../dropdown/Dropdown";
import { burgerIcon } from "../icons/Icons";
import HeartIcon from "../icons/HeartIcon";
import CartIcon from "../icons/CartIcon";
import PersonIcon from "../icons/PersonIcon";
import Link from "next/link";
import img1 from "../../public/assets/image/img1.png";
import Image from "next/image";
import { useRouter } from "next/router";
import { BaseButton } from "../buttons";

const MobileHeader = () => {
  const [showSidbarState, setShowSidbarState] = useRecoilState(ShowSidbarAtom);
  const goingUp = useRecoilValue(goingUpAtom);
  const [activeDropDown, setActiveDropDown] =
    useRecoilState(ActiveDropDownAtom);
    const wishList=useRecoilValue(WishListAtom)
    const carts = useRecoilValue(FetchedCartItemsAtom)
    const setContinueAsGuestModal = useSetRecoilState(CouninueAsGuestModalAtom);
    const [token, setToken] = useRecoilState(TokenAtom);

  const {push} = useRouter()

    const handelGoToCart = () => {
      push("/cart");
    };
  
    const handelGoToWishList = () => {
      push("/wishlist");
    };

    let useType
  if(typeof window !== "undefined"){

     useType = localStorage.getItem("type" || "");
  }

  return (
    <div
      className={`flex justify-between  h-14  top-0 bg-white items-center w-screen ${
        !goingUp ? " h-14" : "downn fixed z-50 shadow-md "
      }`}
    >
      <div className="flex items-center">
        <div onClick={() => setShowSidbarState(true)} className="w-fit ">
          {burgerIcon}
        </div>
        <div className="w-28 mt-2">
          <Image  src={img1} />
        </div>
      </div>

      <div className="flex items-center space-x-10   mr-5 sa">
        <div className="relative  flex space-x-7 ">
          <BaseButton onClick={() =>
                  token.length > 1
                    ? handelGoToWishList()
                    : setContinueAsGuestModal(true)
                } className="w-5">
              <div>
                <div className="absolute -top-0 right-[60%]  flex items-center cursor-pointer justify-center text-white bg-red-950 rounded-full text-sm w-4 h-4 ">
                  {wishList.length}
                </div>
                <HeartIcon className="w-6" />
              </div>
          </BaseButton>
          <BaseButton onClick={() =>
                  token.length > 1
                    ? handelGoToCart()
                    : setContinueAsGuestModal(true)
                } className=" " >
              <div>
                <div className="absolute -top-0 -right-[5%] cursor-pointer flex items-center justify-center text-white bg-red-950 rounded-full text-sm w-4 h-4 ">
                  {carts.length}
                </div>

                <CartIcon className="text-black w-6" />
              </div>
          </BaseButton>
        </div>
        
        {  useType === "user" &&
            <div 
              onClick={() => setActiveDropDown(!activeDropDown)}
              className={`space-x-2 flex relative  items-center cursor-pointer h-full px-2.5 ${
                !activeDropDown ? "" : "bg-white"
              }`}
            >
              {!activeDropDown ? (
                <PersonIcon className="w-5 text-black" />
              ) : (
                <PersonIcon className="w-5 text-green-950" />
              )}
              {activeDropDown ? (
                <div className="bg-white absolute  z-10 top-[100%] right-[1%]  shadow-[0_0_5px_rgba(0,0,0,0.12)]">
                  <Dropdown />
                </div>
              ) : null}
            </div>
        }
        {   useType === "guest"&&
            <div 
              onClick={() => setActiveDropDown(!activeDropDown)}
              className={`space-x-2 flex  relative items-center cursor-pointer h-full px-2.5 ${
                !activeDropDown ? "" : "bg-white"
              }`}
            >
              {!activeDropDown ? (
                <PersonIcon className="w-5 text-black" />
              ) : (
                <PersonIcon className="w-5 text-green-950" />
              )}
              {activeDropDown ? (
                <div className="bg-white absolute  z-10 top-[100%] right-[1%]  shadow-[0_0_5px_rgba(0,0,0,0.12)]">
                  <Dropdown />
                </div>
              ) : null}
            </div>
        }
      </div>
    </div>
  );
};

export default MobileHeader;

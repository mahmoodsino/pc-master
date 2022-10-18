import {
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";
import {
  ActiveDropDownAtom,
  AllCartsInfo,
  CouninueAsGuestModalAtom,
  FetchedCartItemsAtom,
  SearchAtom,
  TokenAtom,
  WishListAtom,
} from "../../helper/state";
import BaseInput from "../inputs/BaseInput";
import { searchForInputIcon } from "../icons/Icons";
import BaseButton from "../buttons/BaseButton";
import Dropdown from "../dropdown/Dropdown";
import HeartIcon from "../icons/HeartIcon";
import CartIcon from "../icons/CartIcon";
import PersonIcon from "../icons/PersonIcon";
import { useRouter } from "next/router";

const Searchbar = () => {
  const [activeDropDown, setActiveDropDown] =
    useRecoilState(ActiveDropDownAtom);
  const [searchState, setSearchState] = useRecoilState(SearchAtom);
  const wishList = useRecoilValue(WishListAtom);
  const carts = useRecoilValue(FetchedCartItemsAtom);
  const allCartsInfo = useRecoilValue(AllCartsInfo);
  const [token, setToken] = useRecoilState(TokenAtom);
  const setContinueAsGuestModal = useSetRecoilState(CouninueAsGuestModalAtom);

  const push = useRouter().push;

  const handelGoToCart = () => {
    push("/cart");
  };

  const handelGoToWishList = () => {
    push("/wishlist");
  };

  const handelSearch = async () => {
    push({
      pathname: "/shop",
      query: { search: encodeURI(searchState) },
    });
  };
  let useType;
  if (typeof window !== "undefined") {
    useType = localStorage.getItem("type" || "");
  }

  return (
    <div className="relative sm:hidden md:block sm:mx-2 lg:mx-0 ">
      <div className="flex flex-row justify-between h-fit  bg-green-950 rounded-r-md ">
        <div className="my-2  ml-2 sm:pl-5 lg:pl-0 w-[58%]  ">
          <form>
            <BaseInput
              placeholder="Search by item"
              onChange={(e) => setSearchState(e.target.value)}
              value={searchState}
              type="search"
              className={
                "bg-white pr-12 w-full h-[30px] px-5 rounded-full text-sm focus:outline-none"
              }
            />

            <BaseButton
              onClick={() => handelSearch()}
              className="absolute right-[41.5%]  top-0 mt-2.5 mr px-0.5 py-0.5"
            >
              {searchForInputIcon}
            </BaseButton>
          </form>
        </div>

        <div className="  px-10 flex flex-row justify-end items-center w-[40%] ">
          <div className="flex relative  flex-row">
            <div className="flex w-fit mr-10">
              <BaseButton
                onClick={() =>
                  token.length > 1
                    ? handelGoToWishList()
                    : setContinueAsGuestModal(true)
                }
                className="w-5"
              >
                <div className="absolute -top-1 right-[70%]  flex items-center cursor-pointer justify-center text-white bg-red-950 rounded-full text-sm w-4 h-4 ">
                  {wishList.length}
                </div>
                <HeartIcon className="w-6 text-white" />
              </BaseButton>
            </div>

            <div className=" flex w-fit">
              <BaseButton
                onClick={() =>
                  token.length > 1
                    ? handelGoToCart()
                    : setContinueAsGuestModal(true)
                }
                className=" "
              >
                <div className="absolute -top-1 right-[9%] cursor-pointer flex items-center justify-center text-white bg-red-950 rounded-full text-sm w-4 h-4 ">
                  {carts.length}
                </div>
                <CartIcon className="text-white w-6 mr-5" />
              </BaseButton>
            </div>
          </div>
          <div className="w-[35%] ">
            <span className="  inline-block text-white  w- text-xs font-medium  ">
              ${allCartsInfo?.sub_total_price.toFixed(2)}
            </span>
          </div>

          {useType === "user" && (
            <BaseButton
              onClick={() => setActiveDropDown(!activeDropDown)}
              className={`space-x-2 flex   items-center cursor-pointer h-full px-2.5 ${
                !activeDropDown ? "" : "bg-white"
              }`}
            >
              {!activeDropDown ? (
                <PersonIcon className="w-5 text-white" />
              ) : (
                <PersonIcon className="w-5 text-green-950" />
              )}
            </BaseButton>
          )}
          {useType === "guest" && (
            <BaseButton
              onClick={() => setActiveDropDown(!activeDropDown)}
              className={`space-x-2 flex   items-center cursor-pointer h-full px-2.5 ${
                !activeDropDown ? "" : "bg-white"
              }`}
            >
              {!activeDropDown ? (
                <PersonIcon className="w-5 text-white" />
              ) : (
                <PersonIcon className="w-5 text-green-950" />
              )}
            </BaseButton>
          )}
          {activeDropDown ? (
            <div className="bg-white absolute  z-10 top-[100%] right-10  shadow-[0_0_5px_rgba(0,0,0,0.12)]">
              <Dropdown />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Searchbar;

import { useRecoilState } from "recoil";
import { Breadcrumbs } from "../../../breadcrumbs";
import { BaseButton } from "../../../buttons";
import FillterProductsMobile from "./FillterProductsMobile";
import FilterShop from "./FilterShop";
import ShopProducts from "./ShopProducts";
import ShopSelect from "./ShopSelect";
import {
  ActiveDropDownAtom,
  AllCartsInfo,
  currentPageAtom,
  FetchedCartItemsAtom,
  FillterProductAtom,
  ProductsAtom,
  RangeSliderAtom,
  SelectedBranchAtom,
  SelectedShopCategoryAtom,
  TokenAtom,
  totalPagesAtom,
  WishListAtom,
} from "../../../../helper/state";
import { useRouter } from "next/router";
import { MutableRefObject, useEffect, useRef, useState } from "react";
import { getProducts } from "../../../../helper";
import { Spinner } from "../../../spinner";
import useBrands from "./Brands";
import useRating from "./Rating";
import useAttributes from "./Attributes";
import { AddToWishList } from "../../wishlist";
import Link from "next/link";
import { CartIcon, HeartIcon, PersonIcon } from "../../../icons";
import { Dropdown } from "../../../dropdown";
import { Pagination } from "../../../pagination";
import ContinueAsGuest from "../../details/sections/ContinueAsGuest";

const MainSection = () => {
  const [showFillterProducts, setShowFillterProducts] =
    useRecoilState(FillterProductAtom);
  const [productsState, setProductsState] = useRecoilState(ProductsAtom);
  const [wishList, setWishList] = useRecoilState(WishListAtom);
  const [loading, setLoading] = useState(true);
  const [rangeSlider, setRangeSlider] = useRecoilState(RangeSliderAtom);
  const [selecterCategory, setSelectedCategory] = useRecoilState(
    SelectedShopCategoryAtom
  );
  const { selectBrand, setSelectBrand } = useBrands();
  const { ratingState, setRatingState } = useRating();
  const { selectedAttribute, setSelectedAttribute } = useAttributes();
  const [token, setToken] = useRecoilState(TokenAtom);
  const [carts, setCarts] = useRecoilState(FetchedCartItemsAtom);
  const [activeDropDown, setActiveDropDown] =
    useRecoilState(ActiveDropDownAtom);
  const [allCartsInfo, setAllCartsInfo] = useRecoilState(AllCartsInfo);
  const [totalPages, setTotalPages] = useRecoilState(totalPagesAtom);
  const [currentPage, setCurrentPage] = useRecoilState(currentPageAtom);
  const [selectedBranch,setSelectedBranch]=useRecoilState(SelectedBranchAtom)

  const timerRef = useRef() as MutableRefObject<NodeJS.Timeout>;

  const query = useRouter().query;
  let useType;
  if (typeof window !== "undefined") {
    useType = localStorage.getItem("type" || "");
  }

  useEffect(() => {
    if (typeof query.categorey !== "undefined") {
      //@ts-ignore
      setSelectedCategory((prev) => [...prev, +query.categorey]);
    }
  }, [query.categorey]);

  

  useEffect(() => {
    const leave = () => {
      setSelectedCategory([]);
      setSelectBrand([]);
      setSelectedAttribute({});
      setCurrentPage(1);
      setRatingState(0);
      setRangeSlider([0, 5000]);
    };
    return () => {
      leave();
    };
  }, []);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const res = await getProducts({
        token: token,
        //@ts-ignore
        product_name: query.search,
        categoryId: selecterCategory,
        AttributeValues: selectedAttribute,
        Brands: selectBrand,
        MinPrice: rangeSlider[0],
        MaxPrice: rangeSlider[1],
        page: currentPage,
        rate: ratingState,
        branchId:selectedBranch.id
      });

      if(res===null){

      }else{
        setTotalPages(res.result.pages_count);
        setProductsState(res.result.items);
      }
        setLoading(false);
    };
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      getData();
    }, 500);
  }, [
    query.search,
    selecterCategory,
    selectBrand,
    selectedAttribute,
    rangeSlider,
    currentPage,
    ratingState,
    selectedBranch
  ]);

  useEffect(() => {
    const getData = async () => {
      const res = await getProducts({
        token: token,
        //@ts-ignore
        product_name: query.search,
        categoryId: selecterCategory,
        AttributeValues: selectedAttribute,
        Brands: selectBrand,
        MinPrice: rangeSlider[0],
        MaxPrice: rangeSlider[1],
        page: currentPage,
        branchId:selectedBranch.id
      });
      if(res===null){

      }else{
        setTotalPages(res.result.pages_count);
        setProductsState(res.result.items);
      }
        setLoading(false);
    };
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      getData();
    }, 500);
  }, [wishList]);
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="lg:ml-4">
      <div className=" md:ml-0">
        <div className="flex justify-between sm:px-1">
          <Breadcrumbs />
          <div>
            <div className="flex items-center space-x-5 relative sm:hidden md:flex   mr-5 ">
              {useType === "user" && (
                <div
                  onClick={() => setActiveDropDown(!activeDropDown)}
                  className={`space-x-2 flex   items-center cursor-pointer h-full px-2.5 ${
                    !activeDropDown ? "" : "bg-white"
                  }`}
                >
                  {!activeDropDown ? (
                    <PersonIcon className="w-5 text-black" />
                  ) : (
                    <PersonIcon className="w-5 text-green-950" />
                  )}
                </div>
              )}
              {useType === "guest" && (
                <div
                  onClick={() => setActiveDropDown(!activeDropDown)}
                  className={`space-x-2 flex   items-center cursor-pointer h-full px-2.5 ${
                    !activeDropDown ? "" : "bg-white"
                  }`}
                >
                  {!activeDropDown ? (
                    <PersonIcon className="w-5 text-black" />
                  ) : (
                    <PersonIcon className="w-5 text-green-950" />
                  )}
                </div>
              )}
              {activeDropDown ? (
                <div className="bg-white absolute  z-10 top-[102%] right-[90%]  shadow-[0_0_5px_rgba(0,0,0,0.12)]">
                  <Dropdown />
                </div>
              ) : null}
              <span className=" text-black inline-block text-xs font-semibold  ">
                ${allCartsInfo.sub_total_price.toFixed(2)}
              </span>
              <div className="relative flex space-x-5">
                <Link href="/wishlist">
                  <a className="w-5">
                    <div>
                      <div className="absolute -top-2 right-[54%]  flex items-center cursor-pointer justify-center text-white bg-red-950 rounded-full text-sm w-4 h-4 ">
                        {wishList.length}
                      </div>
                      <HeartIcon className="w-6" />
                    </div>
                  </a>
                </Link>
                <Link className="" href="/cart">
                  <a>
                    <div>
                      <div className="absolute -top-2 right-[0%] cursor-pointer flex items-center justify-center text-white bg-red-950 rounded-full text-sm w-4 h-4 ">
                        {carts.length}
                      </div>

                      <CartIcon className="text-black w-6" />
                    </div>
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      {!loading ? (
        <div>
          <div className=" mt-10">
            <div className="flex md:flex-row sm:px-1  md:space-x-10 items-end lg:tracking-[0.08em] sm:justify-between md:justify-end md:mx-3 mb-7 text-gray-1250">
              <div className="sm:block md:hidden">
                <BaseButton
                  onClick={() => setShowFillterProducts(true)}
                  className="px-7 py-2.5 rounded-full text-white bg-gray-1250"
                  title="Fillter"
                />
              </div>
              <div className="flex md:flex-row sm:flex-col md:space-x-5 items-center md:justify-end sm:w-fit md:w-full">
                <span className="sm:text-sm sm:mb-5 md:mb-0">
                  Showing 1-25 of {totalPages*25} results
                </span>
                <ShopSelect />
              </div>
            </div>
            <div className="grid grid-cols-5">
              <div className="sm:hidden md:block md:col-span-2 lg:col-span-1 relative ">
                <FilterShop />
              </div>
              <div className="sm:col-span-5 md:col-span-3 lg:col-span-4 md:ml-5 h-full mb-10">
                <ShopProducts />
                <Pagination paginate={paginate} />
              </div>
              <FillterProductsMobile />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center">
          <Spinner className="w-40 fill-green-950" />
        </div>
      )}
      <AddToWishList />
    </div>
  );
};

export default MainSection;

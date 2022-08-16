import { useRecoilState } from "recoil";
import { Breadcrumbs } from "../../../breadcrumbs";
import { BaseButton } from "../../../buttons";
import FillterProductsMobile from "./FillterProductsMobile";
import FilterShop from "./FilterShop";
import ShopProducts from "./ShopProducts";
import ShopSelect from "./ShopSelect";
import {
  FillterProductAtom,
  ProductsAtom,
  RangeSliderAtom,
  SelectedShopCategoryAtom,
  TokenAtom,
  WishListAtom,
} from "../../../../helper/state";
import { useRouter } from "next/router";
import { MutableRefObject, useEffect, useRef, useState } from "react";
import { getProducts, shopFilterProducts } from "../../../../helper";
import { Spinner } from "../../../spinner";
import useBrands from "./Brands";
import useRating from "./Rating";
import useAttributes from "./Attributes";
import { AddToWishList } from "../../wishlist";

const MainSection = () => {
  const [showFillterProducts, setShowFillterProducts] =
    useRecoilState(FillterProductAtom);
  const [productsState, setProductsState] = useRecoilState(ProductsAtom);
  const [wishList, setWishList] = useRecoilState(WishListAtom);
  const [loading, setLoading] = useState(false);
  const [rangeSlider, setRangeSlider] = useRecoilState(RangeSliderAtom);
  const [selecterCategory, setSelectedCategory] = useRecoilState(
    SelectedShopCategoryAtom
  );
  const { selectBrand } = useBrands();
  const { ratingState } = useRating();
  const { selectedAttribute } = useAttributes();
  const [token, setToken] = useRecoilState(TokenAtom);
  const [inWishList,setInwishList]=useState(false)

  const timerRef = useRef() as MutableRefObject<NodeJS.Timeout>;

  const query = useRouter().query;

    

  useEffect(() => {
    const getDAta = async () => {
      setLoading(true);
      const res = await shopFilterProducts(
        token,
        selectBrand,
        selecterCategory,
        rangeSlider[0],
        rangeSlider[1],
        ratingState,
        selectedAttribute
      );
      //  setProductsState(res.result.items);
      setLoading(false);
    };
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      getDAta();
    }, 1000);
  }, [
    selectBrand,
    ratingState,
    selectedAttribute,
    rangeSlider,
    selecterCategory
  ]);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      
      if (query.search) {
        const res = await getProducts(token,query.search.toString());
        setProductsState(res.result.items);
        setLoading(false);
      } else if (query.categorey) {
        const res = await getProducts(token,"", +query.categorey);
        setProductsState(res.result.items);
        setLoading(false);
      } else {
        const res = await getProducts(token);
        setProductsState(res.result.items);
        setLoading(false);
      }
    };
    getData();
  }, [query.search, query.categorey]);

  useEffect(() => {
    const getData = async () => {
      if (query.search) {
        const res = await getProducts(token,query.search.toString());
        setProductsState(res.result.items);
      } else if (query.categorey) {
        const res = await getProducts(token,"", +query.categorey);
        setProductsState(res.result.items);
      } else {
        const res = await getProducts(token);
        setProductsState(res.result.items);
      }
    };
    getData();
  }, [wishList]);

  

  return (
    <div>
      <div className="sm:ml-4 md:ml-0">
        <Breadcrumbs />
      </div>
      {!loading ? (
        <div>
          <div className=" mt-10">
            <div className="flex md:flex-row  md:space-x-10 items-end lg:tracking-[0.08em] sm:justify-between md:justify-end mx-3 mb-7 text-gray-1250">
              <div className="sm:block md:hidden">
                <BaseButton
                  onClick={() => setShowFillterProducts(true)}
                  className="px-7 py-2.5 rounded-full text-white bg-gray-1250"
                  title="Fillter"
                />
              </div>
              <div className="flex md:flex-row sm:flex-col md:space-x-5 items-center md:justify-end sm:w-fit md:w-full">
                <span className="sm:text-sm sm:mb-5 md:mb-0">
                  Showing 1-12 of 23 results
                </span>
                <ShopSelect />
              </div>
            </div>
            <div className="grid grid-cols-5">
              <div className="sm:hidden md:block md:col-span-2 lg:col-span-1 relative ">
                <FilterShop />
              </div>
              <div className="sm:col-span-5 md:col-span-3 lg:col-span-4 md:ml-5 h-full">
                <ShopProducts />
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

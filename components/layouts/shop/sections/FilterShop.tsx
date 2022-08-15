import { useRecoilState } from "recoil";
import { MultiRangeSlider } from "../../../inputs";
import ShopTree from "./ShopTree";
import {
  AttributesShopAtom,
  BrandsAtom,
  HomePageAtom,
  OrderByAtom,
  ProductsAtom,
  RangeSliderAtom,
  SearchAtom,
} from "../../../../helper/state";
import { BaseButton } from "../../../buttons";
import { BaseInput } from "../../../inputs";
import { searchIcon } from "../../../icons/Icons";
import { useEffect, useState } from "react";
import {
  categoriesType,
  getProducts,
  handelFilterProduct,
} from "../../../../helper";
import { useRouter } from "next/router";
import useBrands from "./Brands";
import useRating from "./Rating";
import useAttributes from "./Attributes";

const FilterShop = () => {
  const [searchState, setSearchState] = useRecoilState(SearchAtom);
  const [productsState, setProductsState] = useRecoilState(ProductsAtom);
  const [orderByState, setOrderByState] = useRecoilState(OrderByAtom);
  const [shopCategorey, setShopCategory] = useState<categoriesType[]>([]);
  const [brands, setBrands] = useRecoilState(BrandsAtom);
  const [attributes, setAttributes] = useRecoilState(AttributesShopAtom);
  const [rangeSlider, setRangeSlider] = useRecoilState(RangeSliderAtom);
  const { render } = useBrands();
  const { rende } = useRating();
  const { AttributeRender } = useAttributes();

  const handleChange = (value: number[]) => {
    setRangeSlider(value);
  };

  const push = useRouter().push;

  const handelSearch = async (productToSearch: string) => {
    const res = await getProducts(productToSearch);

    setProductsState(res.result.items);
    push({
      pathname: "/shop",
      query: { search: encodeURI(searchState) },
    });
  };

  useEffect(() => {
    const getData = async () => {
      const res = await handelFilterProduct();
      setBrands(res.result.brands);
      setAttributes(res.result.attributes);
      const modifieOrderBy: string[] = [...res.result.order_by_clauses];
      const result = modifieOrderBy.map((item, index) => ({
        label: item,
        value: index,
      }));
      setOrderByState(result);
      setShopCategory(res.result.categories);
    };

    getData();
  }, []);

  return (
    <div className="mt-7 md:pl-10 lg:pl-0">
      <div className="sticky top-0">
        <div className="text-gray-1400 flex cursor-pointer  ">
          <BaseInput
            placeholder="Search..."
            onChange={(e) => setSearchState(e.target.value)}
            value={searchState}
            type="search"
            className={
              "border-2 box-border  sm:w-[100%] md:w-[100%]  h-10 outline-none rounded-sm focus:border-black"
            }
          />
          <BaseButton
            onClick={() => handelSearch(searchState)}
            className="md:w-[19%] sm:w-[50px] h-10 bg-green-950 hover:bg-green-950/90 inline-block rounded-r-md"
          >
            {searchIcon}
          </BaseButton>
        </div>
        <div className="ml-2 mt-10">
          <h1 className="text-lg font-bold tracking-[0.11em] text-[#7A797B]">
            FILTER BY PRICE
          </h1>
          <div className="w-[45px] ml-1 border border-[#7A797B]  mt-3"></div>
          <div>
            <div className="my-10 pr-3 ">
              <MultiRangeSlider
                from={rangeSlider[0]}
                to={rangeSlider[1]}
                lower={0}
                higher={20000}
                handleChange={handleChange}
              />
              <div className="pt-1 flex flex-wrap flex-row justify-between ">
                <h1 className="pt-3 inline-block text-[#B2ACB6] tracking-[0.11em]">
                  Price:${rangeSlider[0]} - ${rangeSlider[1]}
                </h1>
              </div>
            </div>
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-[0.11em] text-[#7A797B]">
              PRODUCT CATEGORIES
            </h1>
            <div className="w-[45px] ml-1 border border-[#7A797B]  mt-3"></div>
          </div>
          <h1 className="font-semibold px-5 mt-10">Categories</h1>

          <div className=" h-[350px] overflow-y-auto pr-4 mb-10">
            <ShopTree data={shopCategorey} />
          </div>
          <h1 className="font-semibold px-5">Brands</h1>
          <div className=" h-[350px] overflow-y-auto pr-4 mb-10">{render}</div>
          <h1 className="font-semibold px-5">Attributes</h1>
          <div className="pl-5 h-[350px] overflow-y-auto pr-4 mb-10">
            {AttributeRender}
          </div>
          <h1 className="font-semibold px-5">Rating</h1>
          <div className=" h-[350px] overflow-y-auto pr-4 mb-10">{rende}</div>
        </div>
      </div>
    </div>
  );
};

export default FilterShop;

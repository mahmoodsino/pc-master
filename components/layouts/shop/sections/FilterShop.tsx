import { useRecoilState } from "recoil";
import { MultiRangeSlider } from "../../../inputs";
import ShopTree from "./ShopTree";
import {
  AttributesShopAtom,
  BrandsAtom,
  OrderByAtom,
  ProductsAtom,
  RangeSliderAtom,
  SearchAtom,
  SelectedBranchAtom,
} from "../../../../helper/state";
import { BaseButton } from "../../../buttons";
import { BaseInput } from "../../../inputs";
import { searchIcon } from "../../../icons/Icons";
import { useEffect, useState } from "react";
import { categoriesType, handelFilterProduct } from "../../../../helper";
import { useRouter } from "next/router";
import useBrands from "./Brands";
import useRating from "./Rating";
import useAttributes from "./Attributes";
import { toast } from "react-toastify";
import { FiltersQueryAtom } from "./MainSection";



const FilterShop = () => {
  const [searchState, setSearchState] = useRecoilState(SearchAtom);
  const [orderByState, setOrderByState] = useRecoilState(OrderByAtom);
  const [shopCategorey, setShopCategory] = useState<categoriesType[]>([]);
  const [brands, setBrands] = useRecoilState(BrandsAtom);
  const [attributes, setAttributes] = useRecoilState(AttributesShopAtom);
  // const [rangeSlider, setRangeSlider] = useRecoilState(RangeSliderAtom);
  const { render } = useBrands();
  const { rende } = useRating();
  const { AttributeRender } = useAttributes();
  const [selectedBranch,setSelectedBranch]=useRecoilState(SelectedBranchAtom)
  const [queryFilters,setQueryFilters]=useRecoilState(FiltersQueryAtom)

  const handleChange = (value: number[]) => {
    setQueryFilters(prev=>{
      return(
        {
          ...prev,minPrice:value[0],maxPrice:value[1]
        }
      )
    })
  };

  const push = useRouter().push;

  const handelSearch = async () => {
    push({
      pathname: "/shop",
      query: { search: encodeURI(searchState) },
    });
  };

  useEffect(() => {
    const getData = async () => {
      const res = await handelFilterProduct(selectedBranch?.id);
      if(res===null){
        toast.error("some thing went wrong")
      }else{
        setBrands(res.result.brands);
        setAttributes(res.result.attributes);
        const modifieOrderBy: string[] = [...res.result.order_by_clauses];
        const result = modifieOrderBy.map((item, index) => ({
          label: item,
          value: index,
        }));
        setOrderByState(result);
        setShopCategory(res.result.categories);

      }
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
              "border-2 box-border pl-3  sm:w-[100%] md:w-[100%]  h-10 outline-none  "
            }
          />
          <BaseButton
            onClick={() => handelSearch()}
            className="md:w-[19%] sm:w-[50px] h-10 bg-green-950 hover:bg-green-950/90 inline-block rounded-r-md"
          >
            {searchIcon}
          </BaseButton>
        </div>
        <div className="ml-2 mt-10">
          <span className="text-lg block font-bold tracking-[0.03em] text-[#7A797B]">
            FILTERS
          </span>
          <div>
            <div className="my-5 pr-3 ">
              <MultiRangeSlider
                from={queryFilters.minPrice}
                to={queryFilters.maxPrice}
                lower={0}
                higher={5000}
                handleChange={handleChange}
              />
              <div className="pt-1 flex flex-wrap flex-row justify-between ">
                <span className="pt-3 inline-block text-[#B2ACB6] tracking-[0.03em]">
                  Price:${queryFilters.minPrice} - ${queryFilters.maxPrice}
                </span>
              </div>
            </div>
          </div>
          <div className={`${shopCategorey.length !== 0 ? "" : "hidden"}`}>
            <h1 className="font-semibold px-5 mt-10">Categories</h1>

            <div className="max-h-[350px] overflow-y-auto pr-4 mt-3  mb-10">
              <ShopTree data={shopCategorey} />
            </div>
          </div>
          <div className={`${brands.length!==0 ? "" : "hidden"}   `}>
            
          <h1 className="font-semibold px-5">Brands</h1>
          <div className=" max-h-[350px] overflow-y-auto pr-4 mt-3 mb-10">
            {render}
          </div>
          </div>
          <div className={`${attributes.length !== 0 ? "" : "hidden"}`}>
            <h1 className="font-semibold px-5">Attributes</h1>
            <div className="pl-5 max-h-[350px] overflow-y-auto pr-4 mb-10">
              {AttributeRender}
            </div>
          </div>
          <h1 className="font-semibold px-5 mt-3">Rating</h1>
          <div className=" h-[350px] overflow-y-auto pr-4 mb-10">{rende}</div>
        </div>
      </div>
    </div>
  );
};

export default FilterShop;

import { useState } from "react";
import { categoriesType } from "../../../../helper/interfaces";
import { shopArrowIcon } from "../../../icons/Icons";
import { v4 as uuidv4 } from "uuid";
import { SelectedShopCategoryAtom } from "../../../../helper";
import { useRecoilState } from "recoil";
import { useRouter } from "next/router";
import { FiltersQueryAtom } from "./MainSection";

interface data {
  data: categoriesType[] | categoriesType;
}
export let selCategory :number[] =[]


const ShopTree = ({ data }: data) => {
  const [ShopselectedParentId, setShopParentId] = useState(-1);
  if (Array.isArray(data)) {
    return (
      <div className=" ">
        <ul className="">
          {data.map((tree) => (
            <ShopTreeNode
              key={uuidv4()}
              node={tree}
              ShopselectedParentId={ShopselectedParentId}
              setShopParentId={setShopParentId}
            />
          ))}
        </ul>
      </div>
    );
  } else
    return (
      <div className=" ">
        <ul className="">
          {data.categories.map((tree) => (
            <ShopTreeNode
              key={uuidv4()}
              node={tree}
              ShopselectedParentId={ShopselectedParentId}
              setShopParentId={setShopParentId}
            />
          ))}
        </ul>
      </div>
    );
};

interface node {
  node: categoriesType;
  ShopselectedParentId: number;
  setShopParentId: (value: number) => void;
}

const ShopTreeNode = ({
  node,
  ShopselectedParentId,
  setShopParentId,
}: node) => {
  // const [selecterCategory, setSelectedCategory] = useRecoilState(
  //   SelectedShopCategoryAtom
  // );
  const [queryFilters,setQueryFilters]=useRecoilState(FiltersQueryAtom)

  const { push } = useRouter();

  const hasChild = node.categories?.length > 0 ? true : false;

  const handelSearch = async (categoreyID: number) => {
    const index = selCategory.findIndex(
      (category) => category === categoreyID
    );
    if (index < 0) {
      selCategory=[...selCategory,categoreyID]
      // setSelectedCategory((prev) => [...prev, categoreyID]);
    } else if (index >= 0) {
      selCategory=selCategory.filter((item) => item !== categoreyID)
      // setSelectedCategory((prev) =>
      //   prev.filter((item) => item !== categoreyID)
      // );
    }

    // let stringwithhyphen=cat.map(element=>element).join("-")
    setQueryFilters(prev=>{
      return(
        {
          ...prev , SelectedCategories:selCategory
        }
      )
    })    
   
  };

  return (
    <li className=" relative ">
      <div className="">
        <div className=" flex justify-between  text-sm tracking-[0.03em] cursor-pointer  border-t border-b border-t-white">
          <label className="shopContainer flex items-center mt-0 mb-0 py-2">
            {node.name}
            <input
              checked={
                selCategory.findIndex(
                  (categorey) => categorey === node.id
                ) > -1
                  ? true
                  : false
              }
              onChange={() => handelSearch(node.id)}
              className="checkbox"
              type="checkbox"
            />
            <span className="text-sm  shopCheckmark"></span>
          </label>
          <div className="flex items-center space-x-1">
            <h1 className="text-[10px] mt-2 inline-block text-[#7A797B] tracking-[0.03em]"></h1>
            <div
              onClick={() => (
                setShopParentId(node.id),
                ShopselectedParentId === node.id ? setShopParentId(-1) : null
              )}
              className={` mt-1 ${hasChild ? "block w-fit" : "hidden"}`}
            >
              {shopArrowIcon}
            </div>
          </div>
        </div>
        {hasChild && ShopselectedParentId === node.id && (
          <div className=" ">
            <ul className="px-3 z-50">
              <ShopTree data={node} />
            </ul>
          </div>
        )}
      </div>
    </li>
  );
};

export default ShopTree;

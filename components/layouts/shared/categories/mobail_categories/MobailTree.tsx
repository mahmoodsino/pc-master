import  { useState } from "react";
import { categoriesType } from "../../../../../helper/interfaces";
import { totherightArrowIcon } from "../../../../icons/Icons";
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { OpenCategoryModalAtom } from "../../../../../helper";

interface data {
  data: categoriesType[] | categoriesType;
}

const MobailTree = ({ data }: data) => {
  const [MobailselectedParentId, setMobailParentId] = useState<number>(-1);
  if (Array.isArray(data)) {
    return (
      <div className=" ">
        <ul className="">
          {data.map((tree) => (
            <MobailTreeNode key={uuidv4()} node={tree} MobailselectedParentId={MobailselectedParentId} setMobailParentId={setMobailParentId} />
          ))}
        </ul>
      </div>
    );
  } else
    return (
      <div className=" ">
        <ul className="">
          {data.categories.map((tree) => (
            <MobailTreeNode key={uuidv4()} node={tree} MobailselectedParentId={MobailselectedParentId} setMobailParentId={setMobailParentId}/>
          ))}
        </ul>
      </div>
    );
};

interface node {
  node: categoriesType,
  MobailselectedParentId:number,
  setMobailParentId:(value:number)=>void

}

const MobailTreeNode = ({ node,MobailselectedParentId,setMobailParentId }: node) => {
  const [openCategoryModal, setOpencategoryModal] = useRecoilState(
    OpenCategoryModalAtom
  );
 

  const hasChild = node.categories?.length>0 ? true : false;
  const push = useRouter().push


  const handelSearch = async (categoreyID: number) => {
    
    push({
      pathname: '/shop',
      query: { categorey: encodeURI(`${categoreyID}`) },
  });
  setOpencategoryModal(false)
  };
  return (
    <li className=" relative ">
      <div className="">
        {hasChild && (
          <div
            className={` w10  ${
              MobailselectedParentId === node.id ? "active" : ""
            }`}
          ></div>
        )}

        <div className=" flex justify-between py-3 text-sm font-medium tracking-[0.11em] cursor-pointer  border-t border-b border-t-white">
          <div onClick={() => handelSearch(node.id)}  className="text">
            {node.name}
          </div>
          <div className="flex items-center space-x-1">
            <h1 className="text-[10px] mt-2 inline-block text-[#7A797B] tracking-[0.11em]"></h1>
            <div
              onClick={() => (
                setMobailParentId(node.id),
                MobailselectedParentId === node.id
                  ? setMobailParentId(-1)
                  : null
              )}
              className={`w-fit  ${hasChild ? "" : "hidden"}`}
            >
              {totherightArrowIcon}
            </div>
          </div>
        </div>
        {hasChild && MobailselectedParentId === node.id && (
          <div className=" ">
            <ul className="px-5 z-50">
              <MobailTree data={node} />
            </ul>
          </div>
        )}
      </div>
    </li>
  );
};

export default MobailTree;

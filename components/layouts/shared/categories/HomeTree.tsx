import { useRouter } from "next/router";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { getProducts } from "../../../../helper";
import { categoriesType } from "../../../../helper/interfaces";
import { ProductsAtom } from "../../../../helper/state";
import { v4 as uuidv4 } from 'uuid';


interface data {
  data: categoriesType[] | categoriesType;
}
const HomeTree = ({ data }: data) => {
  const [selectedParentId, setParentId] = useState(-1);
  if (Array.isArray(data)) {
    return (
        <ul onMouseLeave={() => setParentId(-1)} className="">
          {data.map((tree) => (
            <TreeNode
            key={uuidv4()}
              node={tree}
              selectedParentId={selectedParentId}
              setParentId={setParentId}
            />
          ))}
        </ul>
    );
  } else
    return (
        <ul onMouseLeave={() => setParentId(-1)} className="">
          {data.categories.map((tree) => (
            <TreeNode
            key={uuidv4()}
              node={tree}
              selectedParentId={selectedParentId}
              setParentId={setParentId}
            />
          ))}
        </ul>
    );
};
interface node {
  node: categoriesType;
  selectedParentId: number;
  setParentId: (value: number) => void;
}

const TreeNode = ({ node, selectedParentId, setParentId }: node) => {

  const[categoreyId,setCategoreyId]=useState(-1)
  const [productsState,setProductsState]=useRecoilState(ProductsAtom)


  const hasChild = node.categories?.length > 0 ? true : false;
  const push = useRouter().push


  const handelSearch = async (categoreyID: number) => {
    
    push({
      pathname: '/shop',
      query: { categorey: encodeURI(`${categoreyID}`) },
  });
  };
  return (
    <li className="">
      <div
        className=""
        onMouseEnter={() => (
          setParentId(node.id),
          selectedParentId === node.id ? setParentId(-1) : null
        )}
      >
        {/* {hasChild && (
          <div
            className={`${selectedParentId === node.id ? "active" : ""}`}
          ></div>
        )} */}
        <div onClick={() => handelSearch(node.id)} className="bg-[#303030] rounded-sm hover:bg-[#303030]/80 block  py-3 text-sm px-3  tracking-[0.03em] cursor-pointer   border-b border-t-white">
          {node.name}
        </div>
        {hasChild && selectedParentId === node.id && (
          <div className=" text-white text-left ">
            <ul className={` absolute h-[440px] w-[230px]  bg-[#303030] overflow-y-scroll overflow-x-hidden top-[0px] left-[96.5%]  z-50`}>
              <HomeTree data={node} />
            </ul>
          </div>
        )}
      </div>
    </li>
  );
};

export default HomeTree;

import { atom, useRecoilState } from "recoil";
import {CloseIcon} from "../../../icons";
import FilterShop from "./FilterShop";
import  {FillterProductAtom}  from "../../../../helper/state";



const FillterProductsMobile = () => {
  const [showFillterProducts, setShowFillterProducts] =
    useRecoilState(FillterProductAtom);
  return (
    <div>
      <>
        <div
          className={`${
            showFillterProducts ? "bottom-0 " : "-bottom-full"
          } h-[70vh] shadow-[0_0_10px_rgba(0,0,0,0.25)] overflow-y-auto z-50 fixed bg-white w-full rounded-t-2xl transition-all duration-300 ease-in-out`}
        >
          <div className="fixed m-3">
            <button onClick={() => setShowFillterProducts(false)}>
              <CloseIcon className="w-6"/>
            </button>
          </div>
          <div className="px-10 pt-7">
            <FilterShop />
          </div>
        </div>
      </>
    </div>
  );
};

export default FillterProductsMobile;

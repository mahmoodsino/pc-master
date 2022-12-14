import { useRecoilState } from "recoil";
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
          } h-[70vh] shadow-[0_0_5px_rgba(0,0,0,0.12)] overflow-y-auto z-50 fixed bg-white w-full rounded-t-2xl transition-all duration-300 ease-in-out`}
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

        {showFillterProducts ? (
          <div onClick={() => setShowFillterProducts(false)} className="opacity-25 fixed inset-0 z-40 bg-black "></div>
        ) : null}
      </>
    </div>
  );
};

export default FillterProductsMobile;

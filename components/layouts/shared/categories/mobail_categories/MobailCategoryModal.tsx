import {  useRecoilState } from "recoil";
import MobailTree from "./MobailTree";
import { AllCategoriesAtom,HomePageAtom,OpenCategoryModalAtom } from "../../../../../helper/state";
import {BaseButton} from "../../../../buttons";
import {CloseIcon} from "../../../../icons";



const MobailCategoryModal = () => {
  const [openCategoryModal, setOpencategoryModal] = useRecoilState(
    OpenCategoryModalAtom
  );
  const [homePageState,setHomePageState]=useRecoilState(HomePageAtom)

  return (
    <div>
      <>
        <div
          className={`${
            openCategoryModal ? "left-0 " : "-left-[200%]"
          } inset-0 sm:w-[70%] bg-white rounded-lg h-[70vh] overflow-y-auto left-0 right-0 top-0 bottom-0 mx-auto my-auto shadow-lg z-50 fixed transition-all duration-300 ease-in-out`}
        >
            <div className="flex flex-row justify-between bg-white z-10 w-[67%] px-4 h-11 fixed   items-center">
              <h1 className="text-lg font-bold  text-gray-950 ">
                Categories
              </h1>
              <BaseButton onClick={() =>setOpencategoryModal(false) } className=" ">
                    <CloseIcon className="w-6"/>
              </BaseButton>
             
            </div>
            <div className="text-left mt-14 px-4">
              <MobailTree data={homePageState.all_categories} />
            </div>
          </div>
        {openCategoryModal ? (
          <div className="opacity-25 fixed inset-0 z-40 bg-black "></div>
        ) : null}
      </>
    </div>
  );
};

export default MobailCategoryModal;

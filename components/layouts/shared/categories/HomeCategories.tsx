import HomeTree from "./HomeTree";
import { useEffect } from "react";
import {  useRecoilState } from "recoil";
import  {HomePageAtom,OpenCategoryModalAtom} from "../../../../helper/state"
import axios from "axios";
import { getCategories } from "../../../../helper";


const HomeCategories = () => {
  const [openCategoryModal, setOpencategoryModal] = useRecoilState(
    OpenCategoryModalAtom
  );

    const [homePageState,setHomePageState]=useRecoilState(HomePageAtom)
  

  
  useEffect(() => {
    const getdata = async () => {

      const res = await getCategories()
      setHomePageState(res.result)
    }
    getdata()
  
  },[])

  return (
    <>
      <div className=" lg:block sm:hidden">
        <div className=" ml-5 h-fit w-[230px]  text-white">
          <div className="relative z-50  py-[11px] rounded-l-md bg-green-950  ">
            <span className=" tracking-[0.11em]  text-white top-2  di font-extrabold after:w-0 after:h-0 after:border-solid">
            CATEGORIES
            </span>
          </div>
            <div className="relative">
              <div className="h-[440px] overflow-y-scroll overflow-x-hidden ">
                <HomeTree data={homePageState.all_categories} />
              </div>
            </div>
        </div>
      </div>
    </>
  );
};

export default HomeCategories;

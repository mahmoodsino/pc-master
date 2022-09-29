import HomeTree from "./HomeTree";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { HomePageAtom } from "../../../../helper/state";
import { getCategories } from "../../../../helper";

const HomeCategories = () => {
  const [homePageState, setHomePageState] = useRecoilState(HomePageAtom);

  useEffect(() => {
    const getdata = async () => {
      const res = await getCategories();
      if (res === null) {
      } else {
        setHomePageState(res.result);
      }
    };
    getdata();
  }, []);

  return (
    <>
      <div className=" lg:block sm:hidden">
        <div className=" ml-5 h-fit w-[230px]  text-white">
          <div className="relative z-50  py-[11px] rounded-l-md bg-green-950  ">
            <span className=" tracking-[0.03em]  text-white top-2  di font-extrabold after:w-0 after:h-0 after:border-solid">
              CATEGORIES
            </span>
          </div>
          <div className="relative">
            <div className="max-h-[440px] overflow-y-scroll overflow-x-hidden ">
              <HomeTree data={homePageState.all_categories} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeCategories;

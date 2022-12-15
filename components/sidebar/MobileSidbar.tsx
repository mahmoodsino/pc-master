import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { routseWAuth, routswithout } from "../header/FixedNavbar";
import { MobailCategoryModal } from "../layouts";
import { BaseInput } from "../inputs";
import { BaseButton } from "../buttons";
import { searchForInputIcon } from "../icons/Icons";
import { InstagramIcon, FacebookIcon, LinkedInIcon, CloseIcon } from "../icons";
import {
  ShowSidbarAtom,
  OpenCategoryModalAtom,
  SearchAtom,
  ContactAtom,
  BranchesAtom,
  SelectedBranchAtom,
} from "../../helper/state";
import Link from "next/link";
import { useRouter } from "next/router";
import { BranchsType } from "../../helper";

const MobileSidbar = () => {
  const [showSidbarState, setShowSidbarState] = useRecoilState(ShowSidbarAtom);
  const setOpencategoryModal = useSetRecoilState(OpenCategoryModalAtom);
  const [searchState, setSearchState] = useRecoilState(SearchAtom);
  const contact = useRecoilValue(ContactAtom);
  const barnches = useRecoilValue(BranchesAtom);
  const [selectedBranch, setSelectedBranch] =
    useRecoilState(SelectedBranchAtom);
  const push = useRouter().push;
  let useType;
  if (typeof window !== "undefined") {
    useType = localStorage.getItem("type" || "");
  }

  const handelSearch = async () => {
    setShowSidbarState(false);
    push({
      pathname: "/shop",
      query: { search: encodeURI(searchState) },
    });
  };

  const branchSelect = (branch: BranchsType) => {
    localStorage.setItem("branch", JSON.stringify(branch));
    setSelectedBranch(branch);
    window.location.href = "/";
  };

  return (
    <div>
      <>
        <div
          className={` ${
            showSidbarState ? "left-0 " : "-left-full"
          } top-0 left-0 w-[60vw]  bg-gray-1700 shadow-lg z-50 fixed h-[100vh]  transition-all duration-300 ease-in-out`}
        >
          <div className="overflow-y-auto h-[100%]">
            <div className=" mb-5 pr-2">
              <div className="flex justify-end my-2">
                <BaseButton
                  className=" "
                  onClick={() => setShowSidbarState(false)}
                >
                  <CloseIcon className="w-6 text-white" />
                </BaseButton>
              </div>

              <div className="  relative w-[100%] pl-3">
                <form>
                  <BaseInput
                    placeholder="Search"
                    onChange={(e) => setSearchState(e.target.value)}
                    value={searchState}
                    type="search"
                    className={
                      "bg-white pr-12 border border-gray-1700  w-full h-[30px] px-5 rounded-md text-sm focus:outline-none focus:border-green-950"
                    }
                  />

                  <BaseButton
                    className="absolute  right-[2%] top-1"
                    onClick={() => handelSearch()}
                  >
                    {searchForInputIcon}
                  </BaseButton>
                </form>
              </div>
            </div>
            <div className="text-white  mx-3">
              <span className="font-bold">Selected branch</span>
              <div className="group z-50  inline-block  relative w-[100%]">
                <button className="bg-white text-xs w-[100%] px-2 text-gray-700 font-semibold py-2  rounded flex justify-between  items-center">
                  <span className="mr-1 whitespace-nowrap">
                    {selectedBranch?.name}
                  </span>
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </button>
                <ul className="absolute hidden text-xs text-gray-700 pt-1 group-hover:block">
                  {barnches.map((branch, i) => {
                    return (
                      <button
                        key={i}
                        onClick={() => branchSelect(branch)}
                        className="w-[100%]"
                      >
                        <li className="rounded-t whitespace-nowrap bg-white hover:bg-gray-400 py-2  block whitespace-no-wrap">
                          {branch.name}
                        </li>
                      </button>
                    );
                  })}
                </ul>
              </div>
            </div>
            {useType !== "user" ? (
              <div
                onClick={() => setShowSidbarState(false)}
                className="text-left   text-white uppercase font-semibold mt-5 overflow-y-auto"
              >
                {routseWAuth.map((item, i) => {
                  return (
                    <Link key={i} href={item.path}>
                      <a className=" block border-b pl-3 py-2">{item.name}</a>
                    </Link>
                  );
                })}
              </div>
            ) : (
              <div
                onClick={() => setShowSidbarState(false)}
                className="text-left  text-white uppercase font-semibold mt-10 overflow-y-auto"
              >
                {routswithout.map((item, i) => {
                  return (
                    <Link key={i} href={item.path}>
                      <a className=" block border-b pl-3 py-2">{item.name}</a>
                    </Link>
                  );
                })}
              </div>
            )}
            <BaseButton
              onClick={() => (
                setOpencategoryModal(true), setShowSidbarState(false)
              )}
              className="uppercase text-white font-semibold py-2 px-3"
            >
              Categories
            </BaseButton>
            <MobailCategoryModal />
            <div className="flex flex-col justify-end  ml-2 mt-10">
              <div className="flex  justify-between">
                <div className="flex items-center justify-around  w-full pb-10">
                  <Link href={contact.insta_link}>
                    <a>
                      <InstagramIcon className="w-9 text-white" />
                    </a>
                  </Link>
                  <Link href={contact.fb_link}>
                    <a>
                      <FacebookIcon className="w-5 text-white" />
                    </a>
                  </Link>
                  <Link href={contact.lin_link}>
                    <a>
                      <LinkedInIcon className="w-8 text-white" />
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </div>
  );
};
export default MobileSidbar;

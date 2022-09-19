import { atom, useRecoilState, useRecoilValue } from "recoil";
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
  ProductsAtom,
  ContactAtom,
} from "../../helper/state";
import Link from "next/link";
import { useRouter } from "next/router";
import { v4 as uuidv4 } from "uuid";

const MobileSidbar = () => {
  const [showSidbarState, setShowSidbarState] = useRecoilState(ShowSidbarAtom);
  const [openCategoryModal, setOpencategoryModal] = useRecoilState(
    OpenCategoryModalAtom
  );
  const [searchState, setSearchState] = useRecoilState(SearchAtom);
  const contact=useRecoilValue(ContactAtom)
  const push = useRouter().push;
  let useType
  if(typeof window !== "undefined"){

     useType = localStorage.getItem("type" || "");
  }


  const handelSearch = async (productToSearch: string) => {
    
    setShowSidbarState(false);
    push({
      pathname: "/shop",
      query: { search: encodeURI(searchState) },
    });
  };

  return (
    <div>
      <>
        <div
          className={` ${
            showSidbarState ? "left-0 " : "-left-full"
          } top-0 left-0 w-[50vw] bg-gray-1700 shadow-lg z-50 fixed h-[100vh] overflow-y-auto transition-all duration-300 ease-in-out`}
        >
          <div className="flex justify-around my-5">
            <BaseButton className=" " onClick={() => setShowSidbarState(false)}>
              <CloseIcon className="w-6 text-white" />
            </BaseButton>

            <div className="  relative w-[75%] ">
              <form>
                <BaseInput
                  placeholder="Search"
                  onChange={(e) => setSearchState(e.target.value)}
                  value={searchState}
                  type="search"
                  className={
                    "bg-white pr-12 border border-gray-1700  w-full h-[40px] px-5 rounded-md text-sm focus:outline-none focus:border-green-950"
                  }
                />

                <BaseButton
                  className="absolute  right-[2%] top-2"
                  onClick={() => handelSearch(searchState)}
                >
                  {searchForInputIcon}
                </BaseButton>
              </form>
            </div>
          </div>
          {useType !== "user" ? 
            <div
              onClick={() => setShowSidbarState(false)}
              className="text-left  text-white uppercase font-semibold mt-10"
            >
              {routseWAuth.map((item) => {
                return (
                  <Link key={uuidv4()} href={item.path}>
                    <a className=" block border-b pl-5 py-2">{item.name}</a>
                  </Link>
                );
              })}
            </div> :
            <div
            onClick={() => setShowSidbarState(false)}
            className="text-left  text-white uppercase font-semibold mt-10"
          >
            {routswithout.map((item) => {
              return (
                <Link key={uuidv4()} href={item.path}>
                  <a className=" block border-b pl-5 py-2">{item.name}</a>
                </Link>
              );
            })}
          </div>
          
        }
          <BaseButton
            onClick={() => (
              setOpencategoryModal(true), setShowSidbarState(false)
            )}
            className="uppercase text-white font-semibold py-2 px-5"
          >
            Categories
          </BaseButton>
          <MobailCategoryModal />
          <div className="flex flex-col justify-end  ml-2 mt-10">
            <div className="flex  justify-between">
              <div className="text-white font-salsa text-sm">Follow US :</div>
              <div className="flex items-center space-x-4">
                <Link href={contact.insta_link}>
                  <a>

                <InstagramIcon className="w-4 text-white" />
                  </a>
                </Link>
                <Link href={contact.fb_link}>
                  <a>

                <FacebookIcon className="w-3 text-white" />
                  </a>
                </Link>
                <Link href={contact.lin_link}>
                  <a>

                <LinkedInIcon className="w-5 text-white" />
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </>
    </div>
  );
};
export default MobileSidbar;

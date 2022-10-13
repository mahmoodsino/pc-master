import MobileHeader from "./MobileHeader";
import { routse } from "../fotter/Fotter";
import { LetterIcon, HeadPhoneIcon } from "../icons";
import { useRouter } from "next/router";
import Link from "next/link";
import { v4 as uuidv4 } from "uuid";
import img1 from "../../public/assets/image/img1.png";
import Image from "next/image";
import {
  BranchesAtom,
  BranchsType,
  ContactAtom,
  SelectedBranchAtom,
} from "../../helper";
import { useRecoilState, useRecoilValue } from "recoil";

const Navbar = () => {
  const { pathname } = useRouter();
  const contact = useRecoilValue(ContactAtom);
  const [barnches, setBranches] = useRecoilState(BranchesAtom);
  const [selectedBranch, setSelectedBranch] =
    useRecoilState(SelectedBranchAtom);

  let useType;
  if (typeof window !== "undefined") {
    useType = localStorage.getItem("type" || "");
  }

  const branchSelect = (branch: BranchsType) => {
    localStorage.setItem("branch", JSON.stringify(branch));
    setSelectedBranch(branch);
    window.location.href = "/";
  };

  return (
    <div className="2xl:container">
      <div className="md:hidden sm:block ">
        <MobileHeader />
      </div>
      <div className="sm:hidden md:block">
        <div className=" flex flex-row justify-between mr-7">
          <div className="ml-10">
            <span className=" mr-3">Selected Branch</span>

            <div className="group z-50  inline-block  relative ml-3">
              <button className="bg-white shadow-[0_0_5px_rgba(0,0,0,0.12)] w-48 text-gray-700 font-semibold py-2  rounded flex justify-between px-3 items-center">
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
              <ul className="absolute shadow-[0_0_5px_rgba(0,0,0,0.12)] hidden text-gray-700 pt-1 group-hover:block">
                {barnches.map((branch,i) => {
                  return (
                    <button
                    key={i}
                      onClick={() => branchSelect(branch)}
                      className="w-48"
                    >
                      <li className="rounded-t bg-white hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap">
                        {branch.name}
                      </li>
                    </button>
                  );
                })}
              </ul>
            </div>
          </div>
          <div className="flex items-center">
            <div className="md:flex sm:hidden items-center lg:hidden">
              <div className=" w-fit h-fit flex mr-7">
                <HeadPhoneIcon className="w-7" />

                <div className=" flex items-center font-medium  ml-2 ">
                  <span className="text-green-950 text-xs block font-bold whitespace-nowrap	">
                    {contact.phone1}
                  </span>
                </div>
              </div>

              <div className=" space-x-2 flex h-fit  mr-8">
                <LetterIcon className="w-4 text-black" />

                <span className="font-medium text-xs">{contact.email}</span>
              </div>
            </div>
            {useType !== "user" && (
              <div className="border flex flex-row bg-gray-1300 text-white w-[150px] h-[34px] justify-around rounded-b-xl leading-[21px] text-[14px] ">
                <Link href="/register">
                  <a className="mt-1">Register</a>
                </Link>
                <div className="border-r h-5 mt-1"></div>
                <Link href="/login">
                  <a className="mt-1">Login</a>
                </Link>
              </div>
            )}
          </div>
        </div>

        <div className="flex  items-center">
          <div className=" w-[18%]">
            <Image src={img1} />
          </div>
          <div className="grow flex justify-evenly items-center  text-sm uppercase  font-bold leading-[21px] tracking-[0.03em]">
            {routse.map((item) => {
              return (
                <Link key={uuidv4()} href={item.path}>
                  <a
                    className={`h-fit px-2 py-1 rounded-xl ${
                      pathname.slice(1) !== item.path.slice(1)
                        ? "hover:bg-green-950 hover:text-white"
                        : "bg-green-950 text-white"
                    } `}
                  >
                    {item.name}
                  </a>
                </Link>
              );
            })}
          </div>
          <div className="lg:flex sm:hidden lg:items-center ">
            <div className=" w-fit  h-fit flex mr-7">
              <HeadPhoneIcon className="" />

              <div className=" font-medium inline-block ml-2 ">
                <h1 className="">call us</h1>
                <span className="text-green-950 block font-bold whitespace-nowrap	">
                  {contact.phone1}
                </span>
              </div>
            </div>
            <div className="mt-4 space-x-2 flex h-fit  mr-8">
              <LetterIcon className="w-5 text-black" />

              <span className="font-medium">{contact.email}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

import MobileHeader from "./MobileHeader";
import { routse } from "../fotter/Fotter";
import { LetterIcon, HeadPhoneIcon } from "../icons";
import { useRouter } from "next/router";
import Link from "next/link";
import { v4 as uuidv4 } from 'uuid';

import img1 from "../../public/assets/image/img1.png";
import Image from "next/image";
import { ContactAtom } from "../../helper";
import { useRecoilState } from "recoil";

const Navbar = () => {
  const { pathname } = useRouter();
  const [contact,setContact]=useRecoilState(ContactAtom)


  return (
    <div className="2xl:container">
      <div className="md:hidden sm:block ">
        <MobileHeader />
      </div>
      <div className="sm:hidden md:block">
        <div className=" flex flex-row justify-end mr-10">
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
          <div className="border flex flex-row bg-gray-1300 text-white w-[150px] h-[34px] justify-around rounded-b-xl leading-[21px] text-[14px] ">
            <Link href="/register">
              <a className="mt-1">Register</a>
            </Link>
            <div className="border-r h-5 mt-1"></div>
            <Link href="/login">
              <a className="mt-1">Login</a>
            </Link>
          </div>
        </div>

        <div className="flex  items-center">
          <div className=" w-[18%]">
            <Image src={img1} />
          </div>
          <div className="grow flex justify-evenly items-center  text-sm uppercase  font-bold leading-[21px] tracking-[0.11em]">
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

              <span className="font-medium">{contact.email  }</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

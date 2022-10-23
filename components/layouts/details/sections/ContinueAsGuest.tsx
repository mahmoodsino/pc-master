import Link from "next/link";
import React, { useState } from "react";
import { useRecoilState } from "recoil";
import {
  CouninueAsGuestModalAtom,
  handelRegisterAsGuest,
  TokenAtom,
} from "../../../../helper";
import { BaseButton } from "../../../buttons";
import { CloseIcon } from "../../../icons";
import img1 from "../../../../public/assets/image/img1.png";
import Image from "next/image";
import { Spinner } from "../../../spinner";


const ContinueAsGuest = () => {
  const [ContinueAsGuestModal, setContinueAsGuestModal] = useRecoilState(
    CouninueAsGuestModalAtom
  );
  const [token, setToken] = useRecoilState(TokenAtom);
  const [loading,setLoading]=useState(false)

  const handelGuest = async () => {
    setLoading(true)
    const res = await handelRegisterAsGuest();
    if(res===null){
      
    }else if (res.result.token) {
      localStorage.setItem("token", res.result.token.access_token);
      localStorage.setItem("id", res.result.user.id);
      localStorage.setItem("email", res.result.user.email);
      localStorage.setItem("type", res.result.user.type);
      setToken(res.result.token.access_token);
      setContinueAsGuestModal(false);
      setLoading(false)
      window.location.reload();
    }
  };

  return (
    <div className="2xl:container">
      <>
        <div
          className={`${
            ContinueAsGuestModal ? "top-0 " : "-top-[200%] invisible"
          } inset-0 sm:w-[95%] bg-white md:w-[50%] rounded-xl lg:w-[40%] w-[50vw] h-fit left-0 right-0 top-0 bottom-0 mx-auto my-auto shadow-lg z-[10000] fixed transition-all duration-300 ease-in-out`}
        >
          <div className=" pb-10 py-5">
            <div className="flex items-center justify-between px-4 pr-10">
              <div className="w-[25%] mr-10">

              <Image src={img1} />
              </div>
              <div
                onClick={() => setContinueAsGuestModal(false)}
                className="w-fit "
              >
                <CloseIcon className="w-5 cursor-pointer" />
              </div>
            </div>
            <span className="font-semibold block mt-5  px-10">Please Login to your account.</span>
            <div className=" mt-3 grid grid-cols-2 gap-3 px-10">
              <Link href="/login">
                <a
                  onClick={() => setContinueAsGuestModal(false)}
                  className="block px-2 font-semibold py-2 bg-gray-100 text-green-950 hover:-translate-y-1 duration-300 ease-in-out"
                >
                  Login
                </a>
              </Link>
              <Link href="/register">
                <a
                  onClick={() => setContinueAsGuestModal(false)}
                  className="block px-2  text-green-1000 font-semibold py-2 bg-gray-100 hover:-translate-y-1 duration-300 ease-in-out "
                >
                  Register
                </a>
              </Link>
            </div>
            <div className="text-center mt-5">
              <span className="befor">OR</span>
            </div>
            <div className="px-10">
            {!loading ? 
            <BaseButton
              onClick={() => handelGuest()}
              className="block px-2 font-semibold mt-2  py-2 w-full bg-gray-100 hover:-translate-y-1 duration-300 ease-in-out "
            >
              Countinue as a guest
            </BaseButton> : 
            <Spinner className="w-12 " />
            
          }
            </div>
          </div>
        </div>
        {ContinueAsGuestModal ? (
          <div className="opacity-25 fixed inset-0 z-50 bg-black  "></div>
        ) : null}
      </>
    </div>
  );
};

export default ContinueAsGuest;

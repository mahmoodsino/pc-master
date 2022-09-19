import Link from "next/link";
import React from "react";
import { useRecoilState } from "recoil";
import { CouninueAsGuestModalAtom, DetailsType, handelRegisterAsGuest, TokenAtom } from "../../../../helper";
import { BaseButton } from "../../../buttons";
import { CloseIcon } from "../../../icons";


interface Props {
  addToCart?: (clickedItem: DetailsType) => void;

}

const ContinueAsGuest = ({addToCart}:Props) => {
  const [ContinueAsGuestModal, setContinueAsGuestModal] = useRecoilState(
    CouninueAsGuestModalAtom
  );
  const [token, setToken] = useRecoilState(TokenAtom);

  



  const handelGuest = async () => {
    const res = await handelRegisterAsGuest()
    if(res.result.token){
      localStorage.setItem("token", res.result.token.access_token);
      localStorage.setItem("id", res.result.user.id);
      localStorage.setItem("email", res.result.user.email);
      localStorage.setItem("type", res.result.user.type);
      setToken(res.result.token.access_token);
      setContinueAsGuestModal(false)
      window.location.reload()
      
    }
}

  return (
    <div className="2xl:container">
      <>
        <div
          className={`${
            ContinueAsGuestModal ? "top-0 " : "-top-[200%]"
          } inset-0 sm:w-[95%] bg-white md:w-[60%] rounded-xl lg:w-[40%] w-[50vw] h-fit left-0 right-0 top-0 bottom-0 mx-auto my-auto shadow-lg z-50 fixed transition-all duration-300 ease-in-out`}
        >
          <div className=" sm:px-5 md:px-16 py-10">
            <div className="flex items-center justify-between">
                <h1 className="text-red-950 text-lg font-semibold">Do you have account ?</h1>
                <div onClick={() => setContinueAsGuestModal(false)} className="w-fit ">
                    <CloseIcon className="w-5 cursor-pointer" />
                </div>
            </div>
            <div className="flex justify-between mt-5">
                <Link href="/login" >
                    <a className="px-4 py-2 rounded-md text-green-950 border border-green-950">Login</a>
                </Link>
                <Link href="/register"><a className="px-4 py-2 border border-black rounded-md">Register</a></Link>
                <BaseButton onClick={() =>( handelGuest())} className="px-4 py-2 border border-black rounded-md" title="Countinue as guest" />

            </div>
          </div>
        </div>
        {ContinueAsGuestModal ? (
          <div className="opacity-25 fixed inset-0 z-40 bg-black  "></div>
        ) : null}
      </>
    </div>
  );
};

export default ContinueAsGuest;

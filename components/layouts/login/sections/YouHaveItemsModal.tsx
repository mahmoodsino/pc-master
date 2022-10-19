import { useRouter } from "next/router";
import React, { useState } from "react";
import { useRecoilState } from "recoil";
import {
  ErroreMessageAtom,
  handelItemGuestToUser,
  OpenMessageModalAtom,
  TokenAtom,
  YouHaveItemsModalAtom,
} from "../../../../helper";
import { BaseButton } from "../../../buttons";
import { Spinner } from "../../../spinner";

interface Props {
  guest_user_id: number | null;
}

const YouHaveItemsModal = ({ guest_user_id }: Props) => {
  const [token, setToken] = useRecoilState(TokenAtom);
  const [openYouHaveItemsModal, setYouHaveItemsModal] = useRecoilState(
    YouHaveItemsModalAtom);
    const [openMessageModal, setOpenMassegModal] =
    useRecoilState(OpenMessageModalAtom);
    const [wrongMessage,setWrrongMessage]=useRecoilState(ErroreMessageAtom)
    const[loading,setLoading]=useState(false)
  const push = useRouter().push;

  const handelItemsGuestTouser = async (guest_user_id: number) => {
    setLoading(true)
    const res = await handelItemGuestToUser(token, guest_user_id);
    if(res===null){
      setYouHaveItemsModal(false)
      setWrrongMessage("some thing went wrong")
      setOpenMassegModal(true)
    }else{
      window.location.href="./"
    }
    setLoading(false)
  };

  return (
    <div className="2xl:container">
      <>
        <div
          className={`${
            openYouHaveItemsModal ? "top-0 " : "-top-[200%]"
          } inset-0 sm:w-[95%] bg-white md:w-[60%] rounded-xl lg:w-[40%] w-[50vw] h-fit left-0 right-0 top-0 bottom-0 mx-auto my-auto shadow-lg z-[100] fixed transition-all duration-300 ease-in-out`}
        >
          <div className=" ">
            <span className=" text-gray-1150 font-bold text-lg rounded-xl py-5 px-5 block bg-gray-100">
            You have items in the cart. Do you want to keep it?
            </span>
            <div className="flex justify-start space-x-5 mt-3 px-5 py-5">
              {!loading ? 
              <BaseButton
                onClick={() =>
                  typeof guest_user_id === "number" &&
                  handelItemsGuestTouser(guest_user_id)
                }
                className="px-5 py-2 text-green-950 border-2 font-bold border-green-950"
                title="yes"
              /> : 
              <Spinner className="w-12 border" />
              
            }
              <BaseButton
                onClick={() => (setYouHaveItemsModal(false), push("./"))}
                className="px-5 py-2 text-red-950 border-2 font-bold border-red-950"
                title="No"
              />
            </div>
          </div>
        </div>
        {openYouHaveItemsModal ? (
          <div className="opacity-25 fixed inset-0 z-[99] bg-black  "></div>
        ) : null}
      </>
    </div>
  );
};

export default YouHaveItemsModal;

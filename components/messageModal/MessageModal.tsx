import React from "react";
import { useRecoilState } from "recoil";
import { OpenMessageModalAtom } from "../../helper";
import { CloseIcon } from "../icons";

interface Props {
    message : string
}

const MessageModal = ({message}:Props) => {
  const [openMessageModal, setOpenMassegModal] =
    useRecoilState(OpenMessageModalAtom);
  return (
    <div className="2xl:container">
      <>
        <div
          className={`${
            openMessageModal ? "top-0 " : "-top-[200%]"
          } inset-0 sm:w-[95%] bg-white md:w-[60%] rounded-xl lg:w-[40%] w-[50vw] h-fit left-0 right-0 top-0 bottom-0 mx-auto my-auto shadow-lg z-50 fixed transition-all duration-300 ease-in-out`}
        >
          <div className=" sm:px-5 md:px-16 py-10">
              <div onClick={() => setOpenMassegModal(false)} className="flex justify-end">
                <CloseIcon className="w-5 cursor-pointer" />
              </div>
              <span>{message}</span>
          </div>
        </div>
        {openMessageModal ? (
          <div className="opacity-25 fixed inset-0 z-40 bg-black  "></div>
        ) : null}
      </>
    </div>
  );
};

export default MessageModal;

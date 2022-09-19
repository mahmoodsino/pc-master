import { useRouter } from "next/router";
import React from "react";
import { useRecoilState } from "recoil";
import {
  handelItemGuestToUser,
  TokenAtom,
  YouHaveItemsModalAtom,
} from "../../../../helper";
import { BaseButton } from "../../../buttons";

interface Props {
  guest_user_id: number | null;
}

const YouHaveItemsModal = ({ guest_user_id }: Props) => {
  const [token, setToken] = useRecoilState(TokenAtom);

  const [openYouHaveItemsModal, setYouHaveItemsModal] = useRecoilState(
    YouHaveItemsModalAtom
  );

  const push = useRouter().push;

  const handelItemsGuestTouser = async (guest_user_id: number) => {
    const res = await handelItemGuestToUser(token, guest_user_id);
    push("./");
  };

  return (
    <div className="2xl:container">
      <>
        <div
          className={`${
            openYouHaveItemsModal ? "top-0 " : "-top-[200%]"
          } inset-0 sm:w-[95%] bg-white md:w-[60%] rounded-xl lg:w-[40%] w-[50vw] h-fit left-0 right-0 top-0 bottom-0 mx-auto my-auto shadow-lg z-50 fixed transition-all duration-300 ease-in-out`}
        >
          <div className=" sm:px-5 md:px-16 py-10">
            <h1 className="text-red-950 font-bold text-lg">
              you have items in your cart you want to keep ?
            </h1>
            <div className="flex justify-between mt-3">
              <BaseButton
                onClick={() =>
                  typeof guest_user_id === "number" &&
                  handelItemsGuestTouser(guest_user_id)
                }
                className="px-5 py-2 text-green-950 border border-green-950"
                title="yes"
              />
              <BaseButton
                onClick={() => (setYouHaveItemsModal(false), push("./"))}
                className="px-5 py-2 text-red-950 border border-red-950"
                title="No"
              />
            </div>
          </div>
        </div>
        {openYouHaveItemsModal ? (
          <div className="opacity-25 fixed inset-0 z-40 bg-black  "></div>
        ) : null}
      </>
    </div>
  );
};

export default YouHaveItemsModal;

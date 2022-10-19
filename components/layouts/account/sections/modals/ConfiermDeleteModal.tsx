import { useRecoilState } from "recoil";
import { ErroreMessageAtom, OpenMessageModalAtom, SuccessEdit, TokenAtom } from "../../../../../helper/state/";
import { BaseButton } from "../../../../buttons";
import {
  AddresToDeleteIdAtom,
  OpenDeleteModalAtom,
} from "../../../../../helper/state/index";
import { deleteAddress } from "../../../../../helper";
import { useState } from "react";
import { Spinner } from "../../../../spinner";

const ConfiermDeleteModal = () => {
  const [openDeleteModal, setOpenDeleteModal] =
    useRecoilState(OpenDeleteModalAtom);
  const [addressTodeleteId, setAddressTodeleteId] =
    useRecoilState(AddresToDeleteIdAtom);
  const [editSuccess, setEditSuccess] = useRecoilState(SuccessEdit);
  const [token, setToken] = useRecoilState(TokenAtom);
  const [loading, setLoading] = useState(false);
  const [openMessageModal, setOpenMassegModal] =
  useRecoilState(OpenMessageModalAtom);
const [wrongMessage, setWrrongMessage] = useRecoilState(ErroreMessageAtom);

  if (typeof window !== "undefined") {
    setToken(localStorage.getItem("token") || "");
  }

  const deletAddressHandler = async () => {
    setLoading(true);
    const res = await deleteAddress(token, addressTodeleteId);
    if (res === null) {
      setOpenDeleteModal(false);
      setWrrongMessage("some thing went wrong")
      setOpenMassegModal(true)
    } else {
      setEditSuccess("deleteSusecc");
    }
    setTimeout(() => {
      setEditSuccess("");
    }, 500);
    setLoading(false);
    setOpenDeleteModal(false);
  };
  return (
    <div className="2xl:container">
      <>
        <div
          className={`${
            openDeleteModal ? "top-0 " : "-top-[200%] invisible"
          } inset-0 sm:w-[90%] text-gray-950 rounded-md bg-white md:w-[50%] lg:w-[30%] w-[50vw] h-fit left-0 right-0 top-0 bottom-0 mx-auto my-auto shadow-lg z-50 fixed transition-all duration-300 ease-in-out`}
        >
          <div className="m-7">
            <h1 className="text-xl font-bold ">Delete Address?</h1>
            <h1 className="mt-5">
              This action will permanently delete the address. Are you sure?
            </h1>
            <div className="flex justify-between mt-10">
              <BaseButton
                onClick={() => setOpenDeleteModal(false)}
                className="border border-gray-950 px-7 py-2"
                title="Cancel"
              />
              {!loading ? (
                <BaseButton
                  onClick={() => deletAddressHandler()}
                  className="border border-red-950 text-red-950 px-7 py-2"
                  title="Delete"
                />
              ) : (
                <Spinner className="w-10" />
              )}
            </div>
          </div>
        </div>
        {openDeleteModal ? (
          <div className="opacity-25 fixed inset-0 z-40 bg-black "></div>
        ) : null}
      </>
    </div>
  );
};

export default ConfiermDeleteModal;

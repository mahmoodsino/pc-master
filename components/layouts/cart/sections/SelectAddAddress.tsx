import React, {useState } from "react";
import { atom, useRecoilState } from "recoil";
import {
  OpenAddNewAddressModalAtom,
  ShippingAddressIdAtom,
} from "../../../../helper";
import { addressatom } from "../../account/sections/AddressBook";

export const OpenSelectAddressAtom = atom({
  key: "OpenSelectAddressAtom",
  default: false,
});

const SelectAddAddress = () => {
  const [address, setaddress] = useRecoilState(addressatom);
  const [openAddNewAddressModal, setOpenAddNewAddressModal] = useRecoilState(
    OpenAddNewAddressModalAtom
  );
  const [openSelectAddress, setOpenSelectAddress] = useRecoilState(
    OpenSelectAddressAtom
  );
  const [shippingAddressId, setShippingAddressId] = useRecoilState(
    ShippingAddressIdAtom
  );
  const [addressName, setAddressName] = useState("SelectAddress");

   

  return (
    <div
      onClick={() => setOpenSelectAddress(!openSelectAddress)}
      className="underline  w-fit   "
    >
      <h1 className="z cursor-pointer   ">
        {addressName}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-arrow-down-short inline-block"
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M8 4a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5A.5.5 0 0 1 8 4z"
          />
        </svg>
      </h1>
      <div
        className={`${
          openSelectAddress ? " absolute border w-fit bg-white" : "hidden"
        }`}
      >
        <div className="text-left ">
          {address.map((addres) => {
            return (
              <h1
                onClick={() => (
                  setShippingAddressId(addres.id), setAddressName(addres.name)
                )}
                key={addres.id}
                className="font-semibold  whitespace-nowrap px-3 py-2 border-b cursor-pointer hover:bg-green-950 hover:text-white"
              >
                {addres.name}
              </h1>
            );
          })}
          <h1
            onClick={() => setOpenAddNewAddressModal(true)}
            className="font-semibold  whitespace-nowrap px-3 py-2 border-b cursor-pointer hover:bg-green-950 hover:text-white"
          >
            Add New Address
          </h1>
        </div>
      </div>
    </div>
  );
};

export default SelectAddAddress;

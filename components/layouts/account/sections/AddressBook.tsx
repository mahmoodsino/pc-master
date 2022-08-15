import { atom, useRecoilState } from "recoil";
import { EditAddressModal } from "./modals";
import { ConfiermDeleteModal } from "./modals";
import { BaseButton } from "../../../buttons";
import { editIcon,trashIcon } from "../../../icons/Icons";
import {
  AddresToDeleteIdAtom,
  EditAddressIdAtom,
  OpenAddNewAddressModalAtom,
  OpenDeleteModalAtom,
  OpenEditAddressModalAtom,
  registerCountryAtom,
  TokenAtom
} from "../../../../helper/state";
import { useEffect } from "react";
import { getAddress, getCountries, optionTypeCountry } from "../../../../helper";

export interface addressType {
  address: string;
  name: string;
  is_default: boolean;
  city_name: string;
  post_code:number,
  id: number ;
}

export const addressatom = atom<addressType[]>({
  key: "addressatom2135",
  default: [],
});
let modifCountries: optionTypeCountry[] = [];


const AddressBook = () => {
  const [address, setaddress] = useRecoilState(addressatom);
  const [openEditAddressModal, setOpenEditAddressModal] = useRecoilState(
    OpenEditAddressModalAtom
  );
  const [editAddress, setEditAddress] = useRecoilState(EditAddressIdAtom);
  const [openAddNewAddressModal, setOpenAddNewAddressModal] = useRecoilState(
    OpenAddNewAddressModalAtom
  );
  const [addressTodeleteId, setAddressTodeleteId] =
    useRecoilState(AddresToDeleteIdAtom);
  const [openDeleteModal, setOpenDeleteModal] =
    useRecoilState(OpenDeleteModalAtom);
  const [token, setToken] = useRecoilState(TokenAtom);
  const [registerCountry, setRegisterCountry] = useRecoilState(registerCountryAtom);

  const openModalHandler = (addres: addressType) => {
    setOpenEditAddressModal(true);
    setEditAddress(addres);
  };

  // useEffect(() => {
  //   const getdata = async () => {
  //     const res = await getCountries();
  //     let modifiedResponse = res.result;
  //     modifiedResponse.map((item: { id: number; name: string }) => {
  //       let countreyValue = item.id.toString();

  //       let countreyLabel = item.name;
  //       let newCountriesStructur = {
  //         label: countreyLabel,
  //         value: countreyValue,
  //       };
  //       modifCountries.push(newCountriesStructur);
  //     });
  //     setRegisterCountry(modifCountries);
  //   };
  //   getdata();
  // }, []);

  

  return (
    <div className=" sm:w-[100%] md:w-[65%]">
      <div className="w-[100%] mr-20 text-gray-950 px-10 shadow-[0_0_10px_rgba(0,0,0,0.25)] py-5">
        <div className="flex md:flex-row sm:flex-col   sm:items-start sm:mb-5 md:mb-0 sm:justify-start md:justify-between items-center">
          <h1 className="font-bold text-xl   mb-5">Address book</h1>
          <BaseButton
            onClick={() => setOpenAddNewAddressModal(true)}
            title="+Add new address"
            className="underline  text-sm font-medium cursor-pointer"
          />
        </div>

        {address.map((item) => {
          return (
            <div key={item.id} className="flex sm:flex-col  md:flex-row md:justify-between border-b pb-3 mb-4">
              <div>
                <span className="font-bold">{item.name}</span>
                {
                  item.is_default ? 
                <span className="text-sm text-gray-1000 font-medium">
                  (DEFAULT)
                </span> : null

                }
                <h1 className="text-sm font-medium">
                  {item.city_name},{item.address}
                </h1>
              </div>
              <div className="flex flex-col md:items-end md:justify-end">
                <div className="flex md:flex-row sm:flex-col sm:mt-3 md:mt-0">
                  <div
                    onClick={() => (
                      setOpenDeleteModal(true), setAddressTodeleteId(item.id)
                    )}
                    className="inline-block cursor-pointer "
                  >
                    {trashIcon}
                    <span className="text-sm text-red-950"> Delete</span>
                  </div>
                  <div
                    onClick={() => openModalHandler(item)}
                    className="inline-block cursor-pointer   md:ml-2"
                  >
                    {editIcon}
                    <span className="text-sm font-medium"> Edit</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        <EditAddressModal />
        <ConfiermDeleteModal />
      </div>
    </div>
  );
};

export default AddressBook;

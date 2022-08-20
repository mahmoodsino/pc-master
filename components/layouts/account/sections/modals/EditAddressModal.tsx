import { MouseEvent, useEffect, useId } from "react";
import { useRecoilState } from "recoil";
import { registerCountryAtom, ShippingAddressIdAtom, SuccessEdit, TokenAtom } from "../../../../../helper/state/index";
import { BaseButton } from "../../../../buttons";
import { BaseInput } from "../../../../inputs";
//@ts-ignore
import Select, { ActionMeta,StylesConfig } from "react-select";

import {
  AddresToDeleteIdAtom,
  EditAddressIdAtom,
  OpenAddNewAddressModalAtom,
  OpenEditAddressModalAtom,
} from "../../../../../helper/state/account/index";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { addressBookSchema } from "../../../../../helper/validation";

import { handelAddAress, handelUpdateAddress, optionTypeCountry } from "../../../../../helper";

interface IFormInputs {
  addressName: string;
  address: string;
  countries: string;
  cities: string;
  zipPostalCode: number;
  houseBuildingNo: number;
  check: boolean;
}
const EditAddressModal = () => {
  const [openEditAddressModal, setOpenEditAddressModal] = useRecoilState(
    OpenEditAddressModalAtom
  );
  const [openAddNewAddressModal, setOpenAddNewAddressModal] = useRecoilState(
    OpenAddNewAddressModalAtom
  );
  const [editSuccess, setEditSuccess] = useRecoilState(SuccessEdit);
  const [registerCountry, setRegisterCountry] =
    useRecoilState(registerCountryAtom);
  const [token, setToken] = useRecoilState(TokenAtom);
  const [editAddress, setEditAddress] = useRecoilState(EditAddressIdAtom);

  const [shippingAddressId,setShippingAddressId]=useRecoilState(ShippingAddressIdAtom)




  const customStyles: StylesConfig<optionTypeCountry> = {
    option: (provided: ActionMeta, state: ActionMeta) => ({
      ...provided,
      borderBottom: "1px solid #F8F8F8",
      color: state.isSelected ? "#373737" : "#373737",
      // paddingRight: 40,
    }),
    control: (base: ActionMeta) => ({
      ...base,
      "&:hover": { borderColor: "gray" },
      border: "1px solid #CCCCCC",
      boxShadow: "none",
      paddingTop: 3,
      paddingBottom: 4,
    }),
  };

  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: yupResolver(addressBookSchema),
  });


  const submitForm = async (data: IFormInputs) => {
    if (openAddNewAddressModal) {
      const res = await handelAddAress(
        data.addressName,
        data.address,
        data.countries,
        data.cities,
        data.zipPostalCode,
        data.houseBuildingNo,
        data.check,
        token
      );
      setShippingAddressId(res.data.id);
      
      setEditSuccess("addSucess");
      setTimeout(() => {
        setEditSuccess("");
      }, 500);
      setOpenAddNewAddressModal(false);
    }
    if (openEditAddressModal) {
      const res = await handelUpdateAddress(
        editAddress.id,
        data.addressName,
        data.address,
        data.countries,
        data.cities,
        data.zipPostalCode,
        data.houseBuildingNo,
        data.check,
        token
      );
      setEditSuccess("EditSucsess");
      setTimeout(() => {
        setEditSuccess("");
      }, 500);
      setOpenEditAddressModal(false);
    }
  };
  useEffect(() => {
    if(openEditAddressModal) {
      setValue("addressName",editAddress.name)
      setValue("address",editAddress.address)
      setValue("cities",editAddress.city_name)
      setValue("zipPostalCode",editAddress.post_code)
      setValue("check",editAddress.is_default)
    }
  },[editAddress])


  return (
    <div className="2xl:container">
      <>
        <div
          className={`${
            openEditAddressModal || openAddNewAddressModal
              ? "top-0 z-50 "
              : "-top-[200%]"
          } inset-0 sm:w-[95%] rounded-xl sm:h-[70vh] md:h-[90vh] overflow-y-auto bg-white md:w-[60%] lg:w-[40%] w-[50vw] h-fit left-0 right-0 top-0 bottom-0 mx-auto my-auto shadow-lg z-50 fixed transition-all duration-300 ease-in-out`}
        >
          <div className=" sm:px-5 md:px-16 py-10 ">
            <form onSubmit={handleSubmit(submitForm)}>
              <div className="flex justify-between items-center mb-10">
                <h1 className="text-xl font-bold text-gray-950  ">
                  Edit My Profile
                </h1>
                <div>
                  <label className="container flex items-center">
                    Make as Default
                    <input
                      {...register("check")}
                      name="check"
                     
                      className="checkbox"
                      type="checkbox"
                    />
                    <span className="text-sm  checkmark"></span>
                  </label>
                </div>
              </div>
              <BaseInput
                title="Address Nickname"
                placeholder="Work, home, etc.."
                className={undefined}
                name="addressName"
                register={register}
              />
              <BaseInput
                title="Address"
                placeholder=""
                className={undefined}
                name="address"
                register={register}
              />

              <div className="grid lg:grid-cols-2 gap-3">
                <div>
                  <label className="capitalize w-fit flex  ml-0 text-gray-950 tracking-wide text-sm font-semibold mb-2 ">
                    Country
                  </label>
                  <Controller
                    name="countries"
                    control={control}
                    render={({ field: { onChange, value, name, ref } }) => {
                      const handleSelectChange = async (
                        selectedOption: optionTypeCountry | null
                      ) => {
                        onChange(selectedOption?.value);
                      };
                      return (
                        <Select
                          theme={(theme: ActionMeta) => ({
                            ...theme,
                            borderRadius: 0,
                            colors: {
                              ...theme.colors,
                              primary: "gray",
                            },
                          })}
                          className="w-full  "
                          ref={ref}
                          name={name}
                          placeholder="Countries"
                          options={registerCountry}
                          onChange={handleSelectChange}
                          isSearchable={true}
                          styles={customStyles}
                        />
                      );
                    }}
                  />
                </div>
                <BaseInput
                  title="City"
                  placeholder="City"
                  className={undefined}
                  name="cities"
                  register={register}
                />
              </div>
              <div className="grid lg:grid-cols-2 gap-3">
                <BaseInput
                  title="House/Building No."
                  placeholder="House/Building.."
                  className={undefined}
                  name="houseBuildingNo"
                  register={register}
                />

                <BaseInput
                  title="Zip / Postal Code"
                  placeholder="Zip "
                  className={undefined}
                  name="zipPostalCode"
                  register={register}
                />
              </div>
              <div className="flex justify-between">
                <BaseButton
                  onClick={() => (
                    setOpenEditAddressModal(false),
                    setOpenAddNewAddressModal(false)
                  )}
                  title="Cancel"
                  className="md:px-6 cursor-pointer sm:px-3 py-2 border border-black font-medium"
                  type="button"
                />
                <BaseButton
                  type="submit"
                  title="Save Changes"
                  className="md:px-6 sm:px-3 py-2 border bg-green-950 text-white font-medium"
                />
              </div>
            </form>
          </div>
        </div>
        {openEditAddressModal || openAddNewAddressModal ? (
          <div className="opacity-25 fixed inset-0 z-40 bg-black "></div>
        ) : null}
      </>
    </div>
  );
};

export default EditAddressModal;

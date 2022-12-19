import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  CitiesAtom,
  registerCountryAtom,
  ShippingAddressIdAtom,
  StatesAtom,
  SuccessEdit,
  TokenAtom,
} from "../../../../../helper/state/index";
import { BaseButton } from "../../../../buttons";
import { BaseInput } from "../../../../inputs";
//@ts-ignore
import Select, { ActionMeta, StylesConfig } from "react-select";

import {
  EditAddressIdAtom,
  OpenAddNewAddressModalAtom,
  OpenEditAddressModalAtom,
} from "../../../../../helper/state/account/index";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { addressBookSchema } from "../../../../../helper/validation";

import {
  getCitesOfState,
  getStateOfCountry,
  handelAddAress,
  handelUpdateAddress,
  optionTypeCountry,
  stateType,
} from "../../../../../helper";
import { Spinner, SpinnerWithBack } from "../../../../spinner";
import { toast } from "react-toastify";

interface IFormInputs {
  addressName: string;
  address: string;
  countries: string;
  cities: string;
  zipPostalCode: number;
  houseBuildingNo: number;
  check: boolean;
  states: number;
  cityId: number;
}
const EditAddressModal = () => {
  const [openEditAddressModal, setOpenEditAddressModal] = useRecoilState(
    OpenEditAddressModalAtom
  );
  const [openAddNewAddressModal, setOpenAddNewAddressModal] = useRecoilState(
    OpenAddNewAddressModalAtom
  );
  const setEditSuccess = useSetRecoilState(SuccessEdit);
  const registerCountry = useRecoilValue(registerCountryAtom);
  const token = useRecoilValue(TokenAtom);
  const editAddress = useRecoilValue(EditAddressIdAtom);
  const setShippingAddressId = useSetRecoilState(ShippingAddressIdAtom);
  const [countryId, setCountryId] = useState<number | undefined>();
  const [states, setStates] = useRecoilState(StatesAtom);
  const [stateId, setStateId] = useState<number | undefined>();
  const [cities, setCities] = useRecoilState(CitiesAtom);
  const [loading, setLoading] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);

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
    setLoading(true);
    if (openAddNewAddressModal) {
      const res = await handelAddAress(
        data.addressName,
        data.address,
        data.countries,
        data.states,
        data.cityId,
        data.cities,
        data.zipPostalCode,
        data.houseBuildingNo,
        data.check,
        token
      );
      if (res === null) {
        toast.error("some thing went wrong");
      } else {
        setShippingAddressId(res.data.id);
        setEditSuccess("addSucess");
      }
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
        data.states,
        data.cityId,
        data.cities,
        data.zipPostalCode,
        data.houseBuildingNo,
        data.check,
        token
      );
      if (res === null) {
        toast.error("some thing went wrong");
      } else {
        setEditSuccess("EditSucsess");
      }
      setTimeout(() => {
        setEditSuccess("");
      }, 500);
      setOpenEditAddressModal(false);
    }
    setLoading(false);
  };
  console.log(editAddress);
  useEffect(() => {
    if (openEditAddressModal) {
      
      setValue("addressName", editAddress.name);
      setValue("address", editAddress.address);
      setValue("cities", editAddress.city_name);
      setValue("zipPostalCode", editAddress.post_code);
      setValue("check", editAddress.is_default);
    }
  }, [editAddress]);

  return (
    <div className="2xl:container">
      <>
        <div
          className={`${
            openEditAddressModal || openAddNewAddressModal
              ? "top-0 z-50 "
              : "-top-[200%] invisible"
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
              <p className="text-xs text-red-900 ">
                {errors.addressName?.message}
              </p>

              <BaseInput
                title="Address"
                placeholder=""
                className={undefined}
                name="address"
                register={register}
              />
              <p className="text-xs text-red-900 ">{errors.address?.message}</p>

              <div className="">
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
                        setCountryId(undefined);
                        setStateId(undefined);
                        setStates([]);
                        setCities([]);
                        setLoading(true);
                        if (selectedOption?.value !== undefined) {
                          setCountryId(+selectedOption?.value);
                          setStates([]);
                          const res = await getStateOfCountry(
                            +selectedOption?.value
                          );
                          let modifiedResponse = res.result;
                          modifiedResponse.map(
                            (item: { id: number; name: string }) => {
                              let statesValue = item.id.toString();
                              let StatesLabel = item.name;
                              let newStateStructure = {
                                label: StatesLabel,
                                value: statesValue,
                              };
                              setStates((prev) => [...prev, newStateStructure]);
                            }
                          );
                        }
                        setLoading(false);
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
                          placeholder={editAddress?.country_name ? editAddress?.country_name : "Countries"}
                          options={registerCountry}
                          onChange={handleSelectChange}
                          isSearchable={true}
                          styles={customStyles}
                        />
                      );
                    }}
                  />
                  <p className="text-xs text-red-900 ">
                    {errors.countries?.message}
                  </p>
                </div>

                {typeof countryId === "number" && states.length > 0 ? (
                  <div>
                    <label className="capitalize w-fit flex  ml-0 text-gray-950 tracking-wide text-sm font-semibold mb-2 ">
                      States
                    </label>
                    <Controller
                      name="states"
                      control={control}
                      render={({ field: { onChange, value, name, ref } }) => {
                        const handleSelectChange = async (
                          selectedOption: stateType | null
                        ) => {
                          setLoading(true);
                          if (selectedOption?.value !== undefined) {
                            setStateId(+selectedOption.value);
                            setCities([]);
                            const res = await getCitesOfState(
                              +selectedOption.value
                            );
                            let modifiedResponse = res.result;
                            modifiedResponse.map(
                              (item: { id: number; name: string }) => {
                                let cityValue = item.id.toString();
                                let cityLabel = item.name;
                                let newCitiesStructure = {
                                  label: cityLabel,
                                  value: cityValue,
                                };
                                setCities((prev) => [
                                  ...prev,
                                  newCitiesStructure,
                                ]);
                              }
                            );
                          }
                          setLoading(false);
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
                            placeholder="states"
                            options={states}
                            onChange={handleSelectChange}
                            isSearchable={true}
                            styles={customStyles}
                          />
                        );
                      }}
                    />
                  </div>
                ) : typeof countryId === "number" && states.length === 0 ? (
                  <div>
                    <BaseInput
                      title="YourCity"
                      placeholder="City"
                      className={undefined}
                      name="cities"
                      register={register}
                    />
                  </div>
                ) : null}
                {typeof stateId === "number" && cities.length > 0 ? (
                  <div className="">
                    <label className="capitalize w-fit flex  ml-0 text-gray-950 tracking-wide text-sm font-semibold mb-2 ">
                      cities
                    </label>
                    <Controller
                      name="cityId"
                      control={control}
                      render={({ field: { onChange, value, name, ref } }) => {
                        const handleSelectChange = async (
                          selectedOption: stateType | null
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
                            placeholder="cities"
                            options={cities}
                            onChange={handleSelectChange}
                            isSearchable={true}
                            styles={customStyles}
                          />
                        );
                      }}
                    />
                  </div>
                ) : typeof stateId === "number" && cities.length === 0 ? (
                  <div>
                    <BaseInput
                      title="YourCity"
                      placeholder="City"
                      className={undefined}
                      name="cities"
                      register={register}
                    />
                  </div>
                ) : null}
              </div>
              <div className="grid lg:grid-cols-2 gap-3">
                <div>
                  <BaseInput
                    title="House/Building No."
                    placeholder="House/Building.."
                    className={undefined}
                    name="houseBuildingNo"
                    register={register}
                  />
                  <p className="text-xs text-red-900 ">
                    {errors.houseBuildingNo?.message}
                  </p>
                </div>

                <div>
                  <BaseInput
                    title="Zip / Postal Code"
                    placeholder="Zip "
                    className={undefined}
                    name="zipPostalCode"
                    register={register}
                  />
                  <p className="text-xs text-red-900 ">
                    {errors.zipPostalCode?.message}
                  </p>
                </div>
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
                {!saveLoading ? (
                  <BaseButton
                    type="submit"
                    title="Save Changes"
                    className="md:px-6 sm:px-3 py-2 border bg-green-950 text-white font-medium"
                  />
                ) : (
                  <Spinner className="w-10" />
                )}
              </div>
            </form>
          </div>
        </div>
        {openEditAddressModal || openAddNewAddressModal ? (
          <div onClick={() => (setOpenEditAddressModal(false),setOpenAddNewAddressModal(false))} className="opacity-25 fixed inset-0 z-40 bg-black "></div>
        ) : null}
      </>
      {loading && <SpinnerWithBack className="w-40" />}
    </div>
  );
};

export default EditAddressModal;

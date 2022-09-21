import Link from "next/link";
import { BaseButton } from "../../../buttons";
import { BaseInput } from "../../../inputs";
//@ts-ignore
import Select, { StylesConfig, ActionMeta } from "react-select";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  getCitesOfState,
  getStateOfCountry,
  handelRegister,
  optionTypeCountry,
  stateType,
} from "../../../../helper";
import {
  CitiesAtom,
  registerCountryAtom,
  StatesAtom,
  TokenAtom,
  YouHaveItemsModalAtom,
} from "../../../../helper/state";
import { useRecoilState } from "recoil";
import { useRouter } from "next/router";
import { registerSchema } from "../../../../helper/validation";
import YouHaveItemsModal from "../../login/sections/YouHaveItemsModal";
import { Spinner, SpinnerWithBack } from "../../../spinner";
import { useState } from "react";

interface IFormInputs {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  zipPostalCode: number;
  houseBuildingNo: number;
  countries: string;
  cities: string;
  states: number;
  cityId: number;
}

const FormSection = () => {
  const [registerCountry, setRegisterCountry] =
    useRecoilState(registerCountryAtom);
  const [token, setToken] = useRecoilState(TokenAtom);
  const [guestUsrerId, setGuestUserId] = useState<number | null>(null);
  const [openYouHaveItemsModal, setYouHaveItemsModal] = useRecoilState(
    YouHaveItemsModalAtom
  );
  const [countryId, setCountryId] = useState<number | undefined>();
  const [states, setStates] = useRecoilState(StatesAtom);
  const [stateId, setStateId] = useState<number | undefined>();
  const [cities, setCities] = useRecoilState(CitiesAtom);
  const [loading, setLoading] = useState(false);
  const [regLoading, setRegLoading] = useState(false);

  const customStyles: StylesConfig<optionTypeCountry> = {
    option: (provided: ActionMeta, state: ActionMeta) => ({
      ...provided,
      borderBottom: "1px solid #F8F8F8",
      color: state.isSelected ? "#373737" : "#373737",
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
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: yupResolver(registerSchema),
  });
  const push = useRouter().push;
  const submitForm = async (data: IFormInputs) => {
    setRegLoading(true);
    const res = await handelRegister(
      data.firstName,
      data.lastName,
      data.email,
      data.password,
      data.countries,
      data.states,
      data.cityId,
      data.cities,
      data.zipPostalCode,
      data.houseBuildingNo,
      token
    );
    if (res ===null) {
      alert("the given data was invaled");
      setRegLoading(false);
    } else {
      localStorage.setItem("token", res.result.token);
      localStorage.setItem("id", res.result.user.id);
      localStorage.setItem("email", res.result.user.email);
      localStorage.setItem("first_name", res.result.user.first_name);
      localStorage.setItem("last_name", res.result.user.last_name);
      localStorage.setItem("type", "user");
      setToken(res.result.token);
      setRegLoading(false);
      if (res.result.guest_user_id === null) {
        push("./");
      } else if (res.result.guest_user_id !== null) {
        setGuestUserId(res.result.guest_user_id);
        setYouHaveItemsModal(true);
        setRegLoading(false);
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(submitForm)}>
        <h1 className="text-xl font-semibold ">Contact</h1>
        <div className="grid sm:grid-cols-1 gap-4 md:grid-cols-2 mt-5 pb-10 border-b">
          <div className="">
            <BaseInput
              title="FirstName"
              placeholder="First Name"
              className={undefined}
              name="firstName"
              register={register}
            />

            <p className="text-xs text-red-900">{errors.firstName?.message}</p>
            <BaseInput
              title="LastName"
              placeholder="Last Name"
              className={undefined}
              name="lastName"
              register={register}
            />
            <p className="text-xs text-red-900">{errors.lastName?.message}</p>
          </div>
          <div className="">
            <BaseInput
              title="E-mail"
              placeholder="youremail"
              type="email"
              className={undefined}
              name="email"
              register={register}
            />
            <p className="text-xs text-red-900">{errors.email?.message}</p>

            <BaseInput
              title="Password"
              placeholder="password"
              type="password"
              className={undefined}
              name="password"
              register={register}
            />

            <p className="text-xs text-red-900">{errors.password?.message}</p>
          </div>
        </div>
        <h1 className="text-xl font-semibold  mt-10">Shipping Address</h1>

        <div className="grid lg:grid-cols-2 gap-4 mt-5 pb-10 border-b mb-10">
          <div className="mb-7">
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
                  setLoading(true);
                  if (selectedOption?.value !== undefined) {
                    setCountryId(+selectedOption?.value);
                    setStates([]);
                    const res = await getStateOfCountry(+selectedOption?.value);
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
                    placeholder="Countries"
                    options={registerCountry}
                    onChange={handleSelectChange}
                    isSearchable={true}
                    styles={customStyles}
                  />
                );
              }}
            />
            <p className="text-xs text-red-900">{errors.countries?.message}</p>
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
                      const res = await getCitesOfState(+selectedOption.value);
                      let modifiedResponse = res.result;
                      modifiedResponse.map(
                        (item: { id: number; name: string }) => {
                          let cityValue = item.id.toString();
                          let cityLabel = item.name;
                          let newCitiesStructure = {
                            label: cityLabel,
                            value: cityValue,
                          };
                          setCities((prev) => [...prev, newCitiesStructure]);
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

              <p className="text-xs text-red-900">{errors.cities?.message}</p>
            </div>
          ) : null}
          {typeof stateId === "number" && cities.length > 0 ? (
            <div>
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

          <div className="">
            <BaseInput
              title="House/Building No."
              placeholder="Hosue building no text"
              className={undefined}
              name="houseBuildingNo"
              register={register}
            />
            <p className="text-xs text-red-900">
              {errors.houseBuildingNo?.message}
            </p>
          </div>
          <div>
            <BaseInput
              title="Zip / Postal Code"
              placeholder="Zip / Postal Code"
              className={undefined}
              name="zipPostalCode"
              register={register}
            />
            <p className="text-xs text-red-900">
              {errors.zipPostalCode?.message}
            </p>
          </div>
        </div>

        <div className="flex flex-row justify-between px-2">
          <div className="text-[14px] mb-10">
            <span className="text-[#B7B7B7] ">Already have an account?</span>
            <Link href="/login">
              <a className="border-b border-b-black">log in</a>
            </Link>
          </div>
          <div>
            {!regLoading ? (
              <BaseButton
                type="submit"
                title="Register"
                className={undefined}
              />
            ) : (
              <Spinner className="fill-green-950 w-20" />
            )}
          </div>
        </div>
      </form>
      <YouHaveItemsModal guest_user_id={guestUsrerId} />
      {loading && <SpinnerWithBack className="w-40" />}
    </div>
  );
};
export default FormSection;

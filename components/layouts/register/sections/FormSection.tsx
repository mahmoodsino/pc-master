import Link from "next/link";
import { useEffect, useState } from "react";
import { BaseButton } from "../../../buttons";
import { BaseInput } from "../../../inputs";
//@ts-ignore
import Select, { StylesConfig, ActionMeta } from "react-select";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { handelRegister, optionTypeCountry } from "../../../../helper";
import { registerCountryAtom, TokenAtom, YouHaveItemsModalAtom } from "../../../../helper/state";
import { atom, useRecoilState } from "recoil";
import { useRouter } from "next/router";
import { registerSchema } from "../../../../helper/validation";
import YouHaveItemsModal from "../../login/sections/YouHaveItemsModal";


interface IFormInputs {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  zipPostalCode: number;
  houseBuildingNo: number;
  countries: string;
  cities: string;
}

const FormSection = () => {
  const [registerCountry, setRegisterCountry] =
    useRecoilState(registerCountryAtom);
  const [token, setToken] = useRecoilState(TokenAtom);
  const [guestUsrerId,setGuestUserId]=useState<number|null>(null)
  const[openYouHaveItemsModal,setYouHaveItemsModal]=useRecoilState(YouHaveItemsModalAtom)

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
    const res = await handelRegister(
      data.firstName,
      data.lastName,
      data.email,
      data.password,
      data.countries,
      data.cities,
      data.zipPostalCode,
      data.houseBuildingNo,
      token
    );
    if (res !== null) {
      localStorage.setItem("token", res.result.token);
      localStorage.setItem("id", res.result.user.id);
      localStorage.setItem("email", res.result.user.email);
      localStorage.setItem("first_name", res.result.user.first_name);
      localStorage.setItem("last_name", res.result.user.last_name);
      localStorage.setItem("type", 'user');
      
      setToken(res.result.token);
      if (res.result.guest_user_id===null){
        push("./")
      }else if(res.result.guest_user_id!==null){
        setGuestUserId(res.result.guest_user_id)
        setYouHaveItemsModal(true)
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(submitForm)}>
        <h1 className="text-xl font-semibold px-4">Contact</h1>
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
        <h1 className="text-xl font-semibold px-4 mt-10">Shipping Address</h1>
        <div className="grid lg:grid-cols-2 gap-4 mt-5 pb-10 border-b mb-10">
          <div className="">
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
              <p className="text-xs text-red-900">
                {errors.countries?.message}
              </p>
            </div>
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
          <div className="lg:w-[60%]">
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
        </div>

        <div className="flex flex-row justify-between px-2">
          <div className="text-[14px] mb-10">
            <h1 className="text-[#B7B7B7] ">Already have an account?</h1>
            <Link href="/login">
              <a className="border-b border-b-black">log in</a>
            </Link>
          </div>
          <div>
            <BaseButton type="submit" title="Register" className={undefined} />
          </div>
        </div>
      </form>
      <YouHaveItemsModal guest_user_id={guestUsrerId} />

    </div>
  );
};
export default FormSection;

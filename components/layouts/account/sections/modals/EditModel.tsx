import { useEffect, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { BaseButton } from "../../../../buttons";
import { BaseInput } from "../../../../inputs";
import {
  ErroreMessageAtom,
  OpenEditModelAtom,
  OpenMessageModalAtom,
  SuccessEdit,
} from "../../../../../helper/state";
import { UserInterface } from "../../../../../helper/interfaces";
import { handelUpdateUser } from "../../../../../helper";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { editUpdateUserSchema } from "../../../../../helper/validation";
import { useRouter } from "next/router";
import { Spinner } from "../../../../spinner";

type User = {
  userInfo: UserInterface;
  setUserInfo: (value: UserInterface) => void;
  token: string;
};

interface IFormInputs {
  firstName: string;
  lastName: string;
  email: string;
}

const EditModel = ({ userInfo, setUserInfo, token }: User) => {
  const [showEditModel, setShowEditModel] = useRecoilState(OpenEditModelAtom);
  const setEditSuccess = useSetRecoilState(SuccessEdit);
  const [loading, setLoading] = useState(false);
  const setOpenMassegModal = useSetRecoilState(OpenMessageModalAtom);
  const setWrrongMessage = useSetRecoilState(ErroreMessageAtom);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: yupResolver(editUpdateUserSchema),
  });

  useEffect(() => {
    setValue("firstName", userInfo.first_name);
    setValue("lastName", userInfo.last_name);
    setValue("email", userInfo.email);
  }, [userInfo]);
  const push = useRouter().push;

  const handelEdit = async (data: IFormInputs) => {
    setLoading(true);
    const res = await handelUpdateUser(
      data.firstName,
      data.lastName,
      data.email,
      token
    );
    if (res === null) {
      setShowEditModel(false);
      setWrrongMessage("some thing went wrong");
      setOpenMassegModal(true);
    } else {
      setEditSuccess("EditModel");
      setShowEditModel(false);
    }

    setTimeout(() => {
      setEditSuccess("");
    }, 500);
    push("./account");
    setLoading(false);
  };

  return (
    <div className="2xl:container">
      <>
        <div
          className={`${
            showEditModel ? "top-0 " : "-top-[200%] invisible"
          } inset-0 sm:w-[95%] bg-white md:w-[60%] rounded-xl lg:w-[40%] w-[50vw] h-fit left-0 right-0 top-0 bottom-0 mx-auto my-auto shadow-lg z-50 fixed transition-all duration-300 ease-in-out`}
        >
          <div className=" sm:px-5 md:px-16 py-10">
            <h1 className="text-xl font-bold text-gray-950  mb-10">
              Edit My Profile
            </h1>

            <form onSubmit={handleSubmit(handelEdit)}>
              <BaseInput
                register={register}
                name="firstName"
                title="FirstName"
                placeholder="First Name"
                className={undefined}
              />
              <p className="text-xs text-red-900">
                {errors.firstName?.message}
              </p>

              <BaseInput
                register={register}
                name="lastName"
                title="LastName"
                placeholder="Last Name"
                className={undefined}
              />
              <p className="text-xs text-red-900">{errors.lastName?.message}</p>

              <BaseInput
                register={register}
                name="email"
                disabled={true}
                title="Email"
                placeholder="youremail"
                type="email"
                className={undefined}
              />
              <p className="text-xs text-red-900">{errors.email?.message}</p>

              <div className="flex justify-between">
                <BaseButton
                  onClick={() => setShowEditModel(false)}
                  title="Cancel"
                  className="md:px-6 cursor-pointer sm:px-3 py-2 border border-black font-medium"
                  type="button"
                />
                {!loading ? (
                  <BaseButton
                    type="submit"
                    className="md:px-6 sm:px-3 py-2 border bg-green-950 text-white font-medium "
                  >
                    Save Changes
                  </BaseButton>
                ) : (
                  <Spinner className="w-10" />
                )}
              </div>
            </form>
          </div>
        </div>
        {showEditModel ? (
          <div onClick={() => setShowEditModel(false)} className="opacity-25 fixed inset-0 z-40 bg-black "></div>
        ) : null}
      </>
    </div>
  );
};

export default EditModel;

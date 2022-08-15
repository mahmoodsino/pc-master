import { useState } from "react";
import {  useRecoilState } from "recoil";
import {BaseButton} from "../../../../buttons";
import {BaseInput} from "../../../../inputs";
import { ChangePassAtom, TokenAtom } from "../../../../../helper/state/index";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { changePasswordSchema } from "../../../../../helper/validation";
import { useRouter } from "next/router";
import { handelChangePassword } from "../../../../../helper";


interface IFormInputs {
  password:string,
  newpassword:string,
  confpassword:string
}
const ChangePassword = () => {
  const [showChangePassword, setShowChangePassword] =
    useRecoilState(ChangePassAtom);
  const [token, setToken] = useRecoilState(TokenAtom);
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<IFormInputs>({
      resolver: yupResolver(changePasswordSchema),
    });
  
   
    const push = useRouter().push

    const submitForm =async (data:IFormInputs) => {
      
        const res = await handelChangePassword(token,data.password,data.newpassword,data.confpassword)
        if(res?.response?.data?.message){
          alert(res?.response?.data?.message)
        }else{
          setShowChangePassword(false)
          push("./")
        }
    }


  return (
    <div>
      <>
        <div
          className={`${
            showChangePassword ? "left-0 " : "-left-[200%]"
          } inset-0 sm:w-[95%] rounded-xl bg-white md:w-[60%] lg:w-[40%] w-[50vw] h-fit left-0 right-0 top-0 bottom-0 mx-auto my-auto shadow-lg z-50 fixed transition-all duration-300 ease-in-out`}
        >
          <div className=" sm:px-5 md:px-16 py-10">
            <h1 className="text-xl font-bold text-gray-950  mb-10">
              Change Password
            </h1>
            <form onSubmit={handleSubmit(submitForm)}>
          <BaseInput register={register} name="password" title="Old Password" placeholder="Old Password" type="password"  className={undefined} />
          <BaseInput register={register} name="newpassword" title="New Password" placeholder="New Password" type="password"  className={undefined} />
          <BaseInput register={register} name="confpassword" title="Confirm New Password" placeholder="Confirm New Password"  type="password"  className={undefined} />
              <div className="flex justify-between">
                <BaseButton
                  onClick={() => setShowChangePassword(false)}
                  className="md:px-6 sm:px-3 py-2 border border-black font-medium "
                  type="button"
                  title="Cancel"
                />
                <BaseButton
                  className="md:px-6 sm:px-3 py-2 border bg-green-950 text-white font-medium "
                  type="submit"
                  title="Change Password"
                />
              </div>
            </form>
          </div>
        </div>
        {showChangePassword ? (
          <div className="opacity-25 fixed inset-0 z-40 bg-black "></div>
        ) : null}
      </>
    </div>
  );
};

export default ChangePassword;

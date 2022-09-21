import Link from "next/link";
import { useRecoilState } from "recoil";
import handelLogin from "../../../../helper/sever/users/login/services";
import { forgetPasswordModalAtom, TokenAtom, YouHaveItemsModalAtom } from "../../../../helper/state";
import { BaseButton } from "../../../buttons";
import { BaseInput } from "../../../inputs";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../../../../helper/validation";
import { useRouter } from "next/router";
import ForgetPasswordModal from "./ForgetPasswordModal";
import { useState } from "react";
import YouHaveItemsModal from "./YouHaveItemsModal";
import { Spinner } from "../../../spinner";

interface IFormInputs {
  email: string;
  password: string;
}





const FormSection = () => {
  const [token, setToken] = useRecoilState(TokenAtom);
  const [forgerPasswordModal,setForgetPasswordModal]=useRecoilState(forgetPasswordModalAtom)
  const [guestUsrerId,setGuestUserId]=useState<number|null>(null)
  const[openYouHaveItemsModal,setYouHaveItemsModal]=useRecoilState(YouHaveItemsModalAtom)
  const [loading,setLoading]=useState(false)

  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: yupResolver(loginSchema),
  });

  const push = useRouter().push


  const handelLog = async (data:IFormInputs) => {
    setLoading(true)
    const res = await handelLogin(data.password, data.email,token);
    if(!res.ok){
      alert(res?.message)
      setLoading(false)
    }else{
      if (res?.token) {
        setLoading(false)
        localStorage.setItem("token", res.token);
        localStorage.setItem("id", res.user.id);
        localStorage.setItem("email", res.user.email);
        localStorage.setItem("type", res.user.type);
        localStorage.setItem("first_name", res.user.first_name);
        localStorage.setItem("last_name", res.user.last_name);
        
        setToken(res.token);
        if (res.guest_user_id===null){
          push("./")

        }else if(res.guest_user_id!==null){
          setGuestUserId(res.guest_user_id)
          setYouHaveItemsModal(true)
          
        }
        
      }
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit(handelLog)}>
        <div className="lg:w-[40%] md:w-[65%] sm:w-[90%] left-0 right-0 m-auto mb-5">
          <BaseInput
            name="email"
            title="Email"
            placeholder="youremail"
            type="email"
            className={undefined}
            register={register}
          />
            <p className="text-xs text-red-900">{errors.email?.message}</p>

          <BaseInput
            name="password"
            title="Password"
            placeholder="password"
            type="password"
            className={undefined}
            register={register}
          />
            <p className="text-xs text-red-900">{errors.password?.message}</p>


          <div className="flex flex-row justify-end">
            <BaseButton
            onClick={() => setForgetPasswordModal(true)}
              type="button"
              className="border-b border-b-gray-950  text-gray-950"
            >
              Forgot your password?
            </BaseButton>
          </div>
          <div className="flex flex-row justify-between px-2 mt-5">
            <div className="text-sm mb-10">
              <span className="text-[#B7B7B7] ">Don’t have an account?</span>
              <Link href="/register">
                <a className="border-b border-b-black">Register</a>
              </Link>
            </div>
            <div>
              {!loading ? 
              <BaseButton
              type="submit"
                title="Login"
                className={undefined}
              /> : 
              <Spinner className="fill-green-950 w-16" />
              
            }
            </div>
          </div>
        </div>
      </form>
      <ForgetPasswordModal />
      <YouHaveItemsModal guest_user_id={guestUsrerId} />
    </div>
  );
};

export default FormSection;

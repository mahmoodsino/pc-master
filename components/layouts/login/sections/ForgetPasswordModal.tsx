import {  useRecoilState } from "recoil";
import {BaseButton} from "../../../buttons";
import { BaseInput } from "../../../inputs";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { forgetPasswordSchema } from "../../../../helper/validation";
import { useRouter } from "next/router";
import { ErroreMessageAtom, forgetPasswordModalAtom, handelForgetPassword, OpenMessageModalAtom, resetPassEmailAtom } from "../../../../helper";
import {toast} from "react-toastify"

interface IFormInputs {
  email:string
}




const ForgetPasswordModal = () => {
  const [forgerPasswordModal,setForgetPasswordModal]=useRecoilState(forgetPasswordModalAtom)
  const [resetPassEmail,setResetPassEmail]=useRecoilState(resetPassEmailAtom)
  const [openMessageModal, setOpenMassegModal] =
  useRecoilState(OpenMessageModalAtom);
  const [wrongMessage,setWrrongMessage]=useRecoilState(ErroreMessageAtom)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: yupResolver(forgetPasswordSchema),
  });

  const push =useRouter().push

  const handelForget = async (data:IFormInputs) => {
    const res = await handelForgetPassword(data.email)
    if(res?.message){
      setResetPassEmail(data.email)
      setForgetPasswordModal(false)
      push("/verificationcode")
      toast.success(res.message)
    }
  }



  return (
    <div className="2xl:container">
      <>
        <div
          className={`${
            forgerPasswordModal ? "top-0 " : "-top-[200%]"
          } inset-0 sm:w-[90%] text-gray-950 rounded-md bg-white md:w-[50%] lg:w-[30%] w-[50vw] h-fit left-0 right-0 top-0 bottom-0 mx-auto my-auto shadow-lg z-50 fixed transition-all duration-300 ease-in-out`}
        >
          <div className="m-7">
            <form onSubmit={handleSubmit(handelForget)} className="">
                <h1 className="text-xl font-bold ">Forget Your Password?</h1>
                <span className="my-5 block">
                  Enter your Email
                </span>
                <BaseInput name="email" register={register}  type="email" placeholder="your Email" className="" />
                <div className="flex justify-between mt-10">
                  <BaseButton onClick={() =>setForgetPasswordModal(false) }  className="border border-gray-950 px-7 py-2" title="Cancel"/>
                  <BaseButton type="submit"  className="border border-green-950 text-green-950 px-7 py-2" title="Confirm"/> 
                </div>
            </form>
          </div>
        </div>
        {forgerPasswordModal ? (
          <div onClick={() => setForgetPasswordModal(false)} className="opacity-25 fixed inset-0 z-40 bg-black "></div>
        ) : null}
      </>
    </div>
  );
};

export default ForgetPasswordModal;

import React from "react";
import { atom, useRecoilState } from "recoil";
import { BaseButton } from "../../../buttons";
import { BaseInput } from "../../../inputs";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { verficationCodeSchema } from "../../../../helper/validation";
import { useRouter } from "next/router";
import { handelResetPassword, resetPassEmailAtom, VereficationcodeAtom } from "../../../../helper";
import { toast } from "react-toastify";

interface IFormInputs {
  verfication: number;
}


const FormSection = () => {
  const [resetPassEmail, setResetPassEmail] =
    useRecoilState(resetPassEmailAtom);
    const [vereficationCode,setVereficationCode]=useRecoilState(VereficationcodeAtom)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: yupResolver(verficationCodeSchema),
  });
  const push =useRouter().push

  const handelReset = async (data: IFormInputs) => {
    const res = await handelResetPassword(resetPassEmail, data.verfication);
    if(res?.data){
      setVereficationCode(data.verfication)
      push("./resetpassword")
    }else{
      toast.error(res.message)
    }
  };

  return (
    <div className="lg:w-[40%] md:w-[65%] sm:w-[90%] left-0 right-0 m-auto mb-5">
      <h1 className="font-bold text-lg mb-10">We Send Verfication Code </h1>
      <h1 className="text-center px-5">{resetPassEmail}</h1>
      <form onSubmit={handleSubmit(handelReset)}>
        <BaseInput
          name="verfication"
          register={register}
          className=""
          title="Enter verfication Code"
          placeholder="verfication code "
        />
        <div className="text-right">
          <BaseButton
            type="submit"
            className="px-5 py-3 border border-black hover:shadow-md font-semibold "
            title="Confirm"
          />
        </div>
      </form>
    </div>
  );
};

export default FormSection;

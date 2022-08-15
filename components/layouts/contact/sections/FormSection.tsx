import React from 'react'
import {BaseButton} from '../../../buttons'
import {BaseInput} from '../../../inputs'
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { contactSchema } from '../../../../helper/validation';
import handelSendMessage from '../../../../helper/sever/contact/sendMessage/services';

interface IFormInputs {
  name:string,
  email:string
  message:string
}


const FormSection = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: yupResolver(contactSchema),
  });

  const submitForm = async (data:IFormInputs) =>{
    const res = await handelSendMessage(data.name,data.email,data.message)
    if(res.message){
      alert(res.message)
    }
    
    
    
  }
  

  return (
    <div className="col-span-1 left-0 right-0 m-auto sm:w-[90%] lg:w-[70%]">
          <form onSubmit={handleSubmit(submitForm)} className="w-full max-w-lg">
            <div className="flex flex-wrap  ">
            <BaseInput
                title="Name"
                name='name'
                register={register}
                placeholder=""
                className={undefined}
              />

              <BaseInput
                title="E-mail"
                name='email'
                register={register}
                type="email"
                placeholder=""
                className={undefined}
              />
            </div>
            
            <div className="flex flex-wrap  mb-6">
              <div className="w-full ">
                <label className="capitalize flex w-full ml-0 text-gray-950 tracking-wide text-sm font-semibold mb-2">
                  Message
                  <span className="text-red-600 text-sm">*</span>
                </label>
                <textarea   {...register && {...register("message")}}  className=" no-resize appearance-none block w-full bg-white border-gray-1550 border py-3 px-4 mb-7 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 h-48"/>
              </div>
            </div>
            <div className="md:flex md:items-center text-center w-full border">
              <BaseButton
                title="Submit"
                type='submit'
                className={
                  " w-full uppercase text-white bg-green-1000 py-1 rounded-sm"
                }
              />
              
            </div>
          </form>
        </div>
  )
}

export default FormSection

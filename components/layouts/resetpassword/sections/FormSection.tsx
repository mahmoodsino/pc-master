import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import React from 'react'
import { useForm } from 'react-hook-form';
import { useRecoilState } from 'recoil';
import { ErroreMessageAtom, OpenMessageModalAtom, resetPassEmailAtom, VereficationcodeAtom } from '../../../../helper';
import handelnewPassword from '../../../../helper/sever/users/login/resetpassword/services';
import { resetpasswordschema } from '../../../../helper/validation';
import { BaseButton } from '../../../buttons'
import { BaseInput } from '../../../inputs'


interface IFormInputs{
  newpassword:string,
  confirmnewpassword:string
}

const FormSection = () => {
  const [resetPassEmail, setResetPassEmail] =
    useRecoilState(resetPassEmailAtom);
    const [vereficationCode,setVereficationCode]=useRecoilState(VereficationcodeAtom)
    const [openMessageModal, setOpenMassegModal] =
    useRecoilState(OpenMessageModalAtom);
    const [wrongMessage,setWrrongMessage]=useRecoilState(ErroreMessageAtom)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: yupResolver(resetpasswordschema),
  });
  const push =useRouter().push

  const handelpassword = async (data:IFormInputs) => {
    if(data.confirmnewpassword===data.newpassword){
      const res = await handelnewPassword (resetPassEmail,vereficationCode,data.newpassword)
      if(res===null){
        setWrrongMessage("some thing went wrong")
        setOpenMassegModal(true)
      }
      push("/login")
      
    }else{
      setWrrongMessage("Passwords do not match")
      setOpenMassegModal(true)
    }
  }
  return (
    <div className='lg:w-[40%] md:w-[65%] sm:w-[90%] left-0 right-0 m-auto mb-5'>
      <div>
        <h1 className='font-bold text-xl text-green-950'>Creat new password</h1>
        <h1 className='text-red-950'>Your new password must be different from previous passwords</h1>
        <form onSubmit={handleSubmit(handelpassword)}>
          <BaseInput type='password' name='newpassword' register={register} className='' placeholder='new password' title='New password' />
          <BaseInput type='password' name="confirmnewpassword" register={register} className='' placeholder='Confirm new password' title='Confirm new password'/>
          <div className='text-right'>
          <BaseButton  className=' px-5 py-3 border border-green-950 text-green-950 ' title='Confirm' type='submit'/>

          </div>
        </form>
      </div>
    </div>
  )
}

export default FormSection

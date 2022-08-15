import React, { useState } from 'react'
import { atom, useRecoilState } from 'recoil';
import { AddresToDeleteIdAtom, OpenAddNewAddressModalAtom } from '../../../../helper';
import { BaseButton } from '../../../buttons';
import { EditAddressModal } from '../../account';
import { addressatom } from '../../account/sections/AddressBook';


export const openSelectAddressModal = atom<boolean>({
  key:"openSelectAddressModal",
  default :false
})

const SelectAddAddress = () => {
  const [address, setaddress] = useRecoilState(addressatom);
  const [openAddress,setOpenAddress]=useRecoilState(openSelectAddressModal)
  const [openAddNewAddressModal, setOpenAddNewAddressModal] = useRecoilState(
    OpenAddNewAddressModalAtom
  );

  const [addressId,setAddressId]= useRecoilState(AddresToDeleteIdAtom)
    
  return (
    <div onClick={() => setOpenAddress(!openAddress)} className='border relative w-fit  border-black '>
        <h1 className='font-semibold text-gray-1050 cursor-pointer text-lg px-5  py-2 border-b'>Select Address</h1>
      <div  className={`${openAddress ? " absolute border w-full border-black bg-white" :"hidden"}`}>
            {address.map(addres => {
                return(
                    <div key={addres.id} className='text-left '>
                        <h1 onClick={() =>( setAddressId(addres.id))} className='font-semibold px-5 py-2 border-b cursor-pointer hover:bg-green-950 hover:text-white'>
                            {addres.name}
                        </h1>
                    </div>
                )
            })}
            <BaseButton className='pl-3 font-semibold py-2 z-40 hover:bg-green-950 hover:text-white w-full ' onClick={() => setOpenAddNewAddressModal(true)}>add new address</BaseButton>
      </div>
      <EditAddressModal/>
    </div>
  )
}

export default SelectAddAddress

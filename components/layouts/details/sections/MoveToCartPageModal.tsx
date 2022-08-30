import { useRouter } from 'next/router'
import React from 'react'
import { atom, useRecoilState } from 'recoil'
import { BaseButton } from '../../../buttons'

export const MoveToCartPageModalAtom = atom({
  key:"MoveToCartPageModalAtom",
  default:false
})

const MoveToCartPageModal = () => {
  const [MoveToCartPageModalState,setMoveToCartPageModalState]=useRecoilState(MoveToCartPageModalAtom)
  const {push} =useRouter()
  const handelMovetoCArt = () => {
    setMoveToCartPageModalState(false)
    push("./cart")
  }

  return (
    <div className="2xl:container">
    <>
      <div
        className={`${
          MoveToCartPageModalState ? "top-0 " : "-top-[200%]"
        } inset-0 sm:w-[95%] px-5 py-5 bg-white md:w-[60%] rounded-xl lg:w-[40%] w-[50vw] h-fit left-0 right-0 top-0 bottom-0 mx-auto my-auto shadow-lg z-50 fixed transition-all duration-300 ease-in-out`}
      >
        <span className='block font-semibold'>You have added new item to the cart!!</span>
        <div className='flex justify-between mt-5'>
          <BaseButton onClick={() =>setMoveToCartPageModalState(false)} title='continue shoping' className='px-4 py-1 bg-green-950 text-white rounded-full' />
          <BaseButton onClick={() => handelMovetoCArt()} title='Move to cart' className='px-4 py-1 border border-green-950 rounded-full text-green-950' />
        </div>
        
      </div>
      {MoveToCartPageModalState ? (
        <div className="opacity-25 fixed inset-0 z-40 bg-black  "></div>
      ) : null}
    </>
  </div>
  )
}

export default MoveToCartPageModal

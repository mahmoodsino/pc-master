import React from 'react'
import {CardReview} from '../../../../cards'
interface props {
    gridForLargScreen:string
}
const OrderReview = ({gridForLargScreen}:props) => {
  return (
    <div className='shadow-[0_0_5px_rgba(0,0,0,0.12)] sm:px-2 md:pl-9 pb-5'>
        <h1 className="font-bold md:text-xl pt-5   text-gray-950 ">Order Review</h1>
        <div className={`grid lg:${gridForLargScreen} md:mx-4`}>
            <CardReview />
        </div>
    </div>
  )
}

export default OrderReview

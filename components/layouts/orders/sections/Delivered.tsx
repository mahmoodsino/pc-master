import React from 'react'
import { truckIcon } from '../../../icons/Icons'
import {ProgressLine} from '../../../steper'

const Delivered = () => {
  return (
    <div className=' shadow-[0_0_5px_rgba(0,0,0,0.12)] '>
        <div className='flex flex-col sm:p-4 md:p-7'>
            <div className='space-x-1 flex items-center'>
                {truckIcon}
                <h1 className='text-green-1100 mt-1'>Delivered</h1>

            </div>
            <ProgressLine progressPercentage={100}/>
        </div>
        <div className='md:mx-7 sm:mx-4 border-b pb-7 '>
            <span className='text-gray-1650'>Delivered on</span>
            <span className='text-gray-1700'> Fri, May 16, 2022, 5:00 p.m.</span>
        </div>
        <div className='md:pl-7 sm:pl-4 mt-5 pb-10 md:text-lg'>
            <h1 className='text-gray-1700 font-medium'>Delivery Address</h1>
            <h1 className='text-gray-1650'>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h1>
        </div>
    </div>
  )
}

export default Delivered

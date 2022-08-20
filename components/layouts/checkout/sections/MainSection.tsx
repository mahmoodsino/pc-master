import React, { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { getClientToken } from '../../../../helper'
import Searchbar from '../../../header/Searchbar'
import CartSummary from './CartSummary'
import CheckoutDetails from './CheckoutDetails'

const MainSection = () => {

// useEffect(() => {
//   const getData = async () => {
//     const res = await getClientToken()
    
//     setClientToken(res.result.client_token);
    
//   }
//   getData()
// }, []);


  return (
    <div   className="lg:px-10 2xl:px-24 lg:ml-4 2xl:container mt-10">
      <Searchbar />

      <h1 className="text-xl font-medium px-14 mt-10">Payment</h1>
      <div className="flex sm:flex-col sm:justify-center sm:items-center lg:items-start   lg:flex-row justify-around lg:px-14 py-10 lg:space-x-28">
          <CheckoutDetails />
        
        <CartSummary />
      </div>
      {/* {clientToken && (

      <App/>
      )} */}
    </div>
  )
}

export default MainSection

import React from 'react'
import { CartMainSection } from '../components/layouts'
import withAuth from '../helper/with-auth'

const cart = () => {
  return (
    <div className='sm:px-[10px]'>
      <CartMainSection />
    </div>
  )
}

export default withAuth(cart)

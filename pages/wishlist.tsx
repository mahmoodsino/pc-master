import React from 'react'
import { WishListMainSection } from '../components/layouts'
import withAuth from '../helper/with-auth'

const wishlist = () => {
  return (
    <div className='md:px-10 2xl:px-24 md:ml-4 2xl:container mt-10 sm:px-[10px]'>
      <WishListMainSection />
    </div>
  )
}

export default withAuth(wishlist)

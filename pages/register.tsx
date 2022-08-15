import React from 'react'
import { RegisterMainSection } from '../components/layouts'
import withAuth from '../helper/with-auth'

const register = () => {
  return (
    <div className='md:px-10 2xl:px-24 md:ml-4 2xl:container mt-10 sm:px-[10px]'>
      <RegisterMainSection />
    </div>
  )
}

export default withAuth(register)

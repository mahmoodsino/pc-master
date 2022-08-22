import React from 'react'

interface Props {
    className: string;
  }

const MinusIcon = ({className}:Props) => {
  return (
    <svg
    className={className}
    viewBox="0 0 14 3"
    fill="current"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M0.583313 0.791992H13.4166V2.20866H0.583313V0.791992Z"
      fill="currentColor"
    />
  </svg>
  )
}

export default MinusIcon

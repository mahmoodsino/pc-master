import React from 'react'

interface Props {
    className: string;
  }

const BlusIcon = ({className}:Props) => {
  return (
    <svg
    className={className}
    viewBox="0 0 19 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8.94336 2.96875H10.0566C10.1556 2.96875 10.2051 3.02083 10.2051 3.125V16.875C10.2051 16.9792 10.1556 17.0312 10.0566 17.0312H8.94336C8.8444 17.0312 8.79492 16.9792 8.79492 16.875V3.125C8.79492 3.02083 8.8444 2.96875 8.94336 2.96875Z"
      fill="currentColor"
    />
    <path
      d="M3.26562 9.25781H15.7344C15.8333 9.25781 15.8828 9.3099 15.8828 9.41406V10.5859C15.8828 10.6901 15.8333 10.7422 15.7344 10.7422H3.26562C3.16667 10.7422 3.11719 10.6901 3.11719 10.5859V9.41406C3.11719 9.3099 3.16667 9.25781 3.26562 9.25781Z"
      fill="currentColor"
    />
  </svg>
  )
}

export default BlusIcon

import React from 'react'


interface Props {
    className: string;
  }

const LocationIcon = ({className}:Props) => {
  return (
    <svg
                className={className}
                viewBox="0 0 20 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10 14C12.2091 14 14 12.2091 14 10C14 7.79086 12.2091 6 10 6C7.79086 6 6 7.79086 6 10C6 12.2091 7.79086 14 10 14Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
                <path
                  d="M18 14C15 21 10 29 10 29C10 29 5 21 2 14C-1 7 4 1 10 1C16 1 21 7 18 14Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
  )
}

export default LocationIcon

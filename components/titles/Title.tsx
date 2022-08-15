import React from 'react'
interface props {
    title:string;
    desc:string
}
const Title = ({title,desc}:props) => {
  return (
    <div className="text-center sm:text-2xl md:text-[32px] font-bold tracking-[0.055em] mt-10">
          <span className=" ">{title}</span>
          <div className="w-[72px] border border-black left-0 right-0 m-auto mt-3"></div>
          <h1 className="sm:text-[17px] md:text-[28px] font-normal tracking-[0.055em] my-10">
            {desc}
          </h1>
    </div>
  )
}
export default Title

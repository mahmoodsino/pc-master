import React, { ReactElement } from 'react'
type props = {
    image: ReactElement;
    title: string;
    desc: string
  };
const HomeHelp = ({image,title,desc}:props) => {
  return (
    <div className=' w-fit items-center justify-center h-fit flex leading-[21px] tracking-[0.11em] text-center my-2'>
      <div >
        {image}
      </div>
          <div className=' text-sm  inline-block ml-1 '>
            <h1 className='font-bold'>{title}</h1>
            <span className=' block font-[400]'>{desc}</span>
          </div>
        </div>
  )
}
export default HomeHelp;


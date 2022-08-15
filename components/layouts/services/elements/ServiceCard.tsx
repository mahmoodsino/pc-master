import React,{ ReactElement} from 'react'

interface props {
    image:ReactElement;
    title:string;
    desc:string
}

const ServiceCard = ({image,title,desc}:props) => {
  return (
    <div className="flex flex-row text-left space-x-8">
              <div className=" w-[120px]  mt-10 ">
                {image}
              </div>
              <div className="py-7 ">
                <h1 className="font-bold pb-5">{title}</h1>
                <h1 className=''>{desc}</h1>
              </div>
            </div>
  )
}

export default ServiceCard

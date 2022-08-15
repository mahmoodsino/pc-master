import React from "react";
interface props {
  title: string;
}
const Title2 = ({ title }: props) => {
  return (
    <div className="py-3 flex flex-row justify-between md:px-10">
      <h1 className="text-[30px] font-bold whitespace-nowrap">{title}</h1>
      <div className="w-[80%] h-6 border-b-2 sm:hidden md:block  border-gray-1600 "></div>
    </div>
  );
};
export default Title2;

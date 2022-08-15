import {BaseButton} from "../../../buttons";

const GREATDEALS = () => {
  return (
    <div
      className="my-10 flex md:flex-row sm:flex-col     lg:justify-between h-[197px] bg-cover font-salsa "
      style={{
        backgroundImage:`url(/assets/image/great.png)`,
      }}
    >
      <div className="flex md:h-[100%] sm:h-[50%]  md:flex-col justify-between  md:w-[70%]">
        <span className="text-3xl sm:hidden md:block ml-[48%] mt-[5%] w-fit h-fit px-2 py-1 bg-red-700 rounded-full tracking-[0.2em]  text-white ">
          Clearance
        </span>
        <h1 className="md:ml-[10%] md:mb-[2%] left-0 right-0 sm:m-auto   text-white sm:text-[55px] md:text-[64px] z-10  tracking-[0.055em] ">
          Great Deals
        </h1>
      </div>
      <div className=" sm:h-[50%] text-center">
        <BaseButton
          onClick={() => console.log("")}
          title="Show offers"
          className={
            "uppercase md:mt-[40%]  sm:text-2xl  mr-7 md:text-3xl font-extrabold h-fit font-newFont text-green-1050 px-3 py-2  bg-white/20 rounded-full"
          }
        />
      </div>
    </div>
  );
};
export default GREATDEALS;

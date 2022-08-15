import HomeHelp from "../element/HomeHeroHelp";
import Searchbar from "../../../header/Searchbar";
import {HomeCategories} from "../../shared/categories";
import { MainCarousel } from "../../../carousel"; 
import {BaseButton} from "../../../buttons";
import {
  BestIcon,
  FreeDeleveryTruck,
  PaymentIcon,
  RotateIcon,
  TextIcon,
} from "../../../icons/Icons";

import computer from "/public/assets/image/computer.png"
import mobile from "/public/assets/image/mobile.png"
import Image from "next/image";
import Link from "next/link";


const Hero = () => {
  return (
    <div className="mt-10 relative">
      <div>
          <div className="flex flex-row justify-center lg:left-0 lg:right-0 lg:mx-auto   ">
            <HomeCategories />
            <div className="flex flex-col sm:w-[100%] lg:w-[73%] mr-4 ">
              <Searchbar />

              <div className="">
                <MainCarousel />
              </div>
            </div>
          </div>

      </div>

      <div className="w-[92%] sm:hidden lg:flex h-fit border-t border-b mt-16  mb-5 px-10 ml-16  flex-row justify-between  relative ">
        <div className=" border-l h-[135%] absolute -top-2.5 left-2  "></div>
        <HomeHelp
          image={FreeDeleveryTruck}
          title="Free DElivery"
          desc="From $.."
        />
        <h1 className="text-xs text-green-950 absolute left-[25%]  top-[19PX]">
          99%
        </h1>
        <HomeHelp image={TextIcon} title="99% customers" desc="Feedback" />
        <HomeHelp image={RotateIcon} title="365 Days" desc="foy free return" />
        <HomeHelp image={PaymentIcon} title="payment" desc="secure system" />
        <HomeHelp image={BestIcon} title="only best" desc="Brands" />
        <div className=" border-r absolute -top-2.5 h-[140%]  right-2 "></div>
      </div>
      <div className=" lg:flex sm:hidden flex-row justify-between mt-14">
        <div
          className=" w-[50%] h-fit  flex flex-row justify-between py-5 px-8 bg-cover text-white tracking-[0.055em]"
          style={{
            backgroundImage: `url(/assets/image/bgHero1.PNG)`,
          }}
        >
          <div className="flex flex-col space-y-4 justify-around ml-6 ">
            <h1 className="text-2xl font-semibold whitespace-nowrap ">
              HAVE A COMPUTER PROBLEM?
            </h1>
            <h1 className="  text-xs font-light">
              PC MasterPro is well skilled team which provide
              <br /> reliable and professional services. We also offer
              <br /> Service Maintenance Agreement which will
              <br /> facilitates your work without any troubles
            </h1>
            <Link href="/contact">
              <a className="text-black px-3 py-1 bg-white w-fit border border-green-950 rounded-full">Contact US</a>
            </Link>
          </div>
          <div className="  bg-cover">
            <Image src={computer}/>
          </div>
        </div>

        <div
          className=" w-[50%] h-fit  flex flex-row justify-between px-1 py-5 bg-cover text-white tracking-[0.055em]"
          style={{
            backgroundImage: `url(/assets/image/bgHero2.PNG)`
          }}
        >
          <div className="flex flex-col justify-around ml-16 space-y-4">
            <h1 className="text-2xl font-semibold  ">TRUSTED PHONE REPAIR</h1>
            <ul className="w-[330px] ml-6 text-xs font-light list-disc ">
              <li>Screen Repair</li>
              <li>Battery Replacemnet</li>
              <li>Power Button</li>
              <li>Water Damage</li>
            </ul>
            <BaseButton
              onClick={() => console.log("")}
              title="EXPLORE"
              className={
                "text-black px-5 py-1 bg-white w-fit border border-[#202020] rounded-full"
              }
            />
          </div>
          <div
            className=" h-[100%]"
            style={{
              backgroundImage: `url(/assets/image/light1.png)`
            }}
          >
            {/* <img className=" " src={light} alt="" /> */}
            <Image src={mobile}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;

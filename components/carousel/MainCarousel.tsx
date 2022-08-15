import React, { Component } from "react";
//@ts-ignore
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from "next/link";
import notebook from "/public/assets/image/notebook.png";
import Image from "next/image";
import { useRecoilState } from "recoil";
import { HomePageAtom } from "../../helper/state";
import { v4 as uuidv4 } from 'uuid';




const  Carousel = () =>{
  const [homePageState,setHomePageState]=useRecoilState(HomePageAtom)
  

 
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      autoplay: true,
      slidesToShow: 1,
      rows: 1,
      autoplaySpeed: 2000,
      slidesToScroll: 1,
      arrows: false,
      dotsClass: "button__bar",
    };

    return (
      <div className="lg:container ">
        <Slider {...settings}>
          {homePageState.slider.map(item => {
            return (
            <div key={uuidv4()}>
              <div
                className="w-[100%] h-fit justify-around flex md:flex-row sm:items-center sm:flex-col  bg-cover"
                style={{
                  backgroundImage: `url(/assets/image/Rectangle.png)`,
                }}
              >
                <div className="sm:block md:hidden">
                  <Image src={notebook}   />
                </div>
                <div className="2xl:left-[500px] pb-10  text-left ml-14 mt-12">
                  <h1 className="text-[22px]  font-[600]">
                   {item.description}
                  </h1>
                  <h1 className="text-green-1000 text-xl mt-8 font-[500]">
                    {item.title}
                  </h1>
                  <div className="mt-10">
                    <Link
                      href="/shop"
                    >
                      <a className="uppercase  text-lg font-bold hover:bg-gray-1300/90 bg-gray-1300 text-white px-3 py-2 rounded-full leading-5 tracking-[0.11em]">
                      SHOP NOW
                      </a>
                    </Link>
                  </div>
                </div>

                <div className="md:block sm:hidden">
                  <Image src={notebook} />
                </div>
              </div>
            </div>
            )

          })}

          
        </Slider>
      </div>
    );
  }

export default Carousel;

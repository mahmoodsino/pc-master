import React, { Component } from "react";
//@ts-ignore
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import { v4 as uuidv4 } from "uuid";
import { imagesType } from "../../helper";

interface Props {
  img: imagesType[];
  hover: boolean;
}

function SampleNextArrow(props: any) {
  const { className, style, onClick, hover } = props;
  return (
    <div
      className={`text-black absolute top-20 -right-4 text  h-7 w-7  rounded-full text-center cursor-pointer bg-white z-20 ${
        hover ? "shadow-md" : "hidden opacity-0"
      }`}
      style={{ ...style }}
      onClick={onClick}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        className={`font-bold absolute top-1.5 left-1.5 bi bi-arrow-right ${
          hover ? "" : "hidden"
        }`}
        viewBox="0 0 16 16"
      >
        <path
          fillRule="evenodd"
          d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
        />
      </svg>
    </div>
  );
}

function SamplePrevArrow(props: any) {
  const { className, style, onClick, hover } = props;
  return (
    <div
      className={`text-black  h-7 w-7  rounded-full text-center absolute cursor-pointer bg-white top-20 z-20 -left-4 ${
        hover ? "shadow-md" : "hidden opacity-0"
      }  `}
      style={{ ...style }}
      onClick={onClick}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        className={`font-bold absolute top-1.5 left-1.5  text-black bi bi-arrow-left ${
          hover ? "" : "hidden"
        }`}
        viewBox="0 0 16 16"
      >
        <path
          fillRule="evenodd"
          d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
        />
      </svg>
    </div>
  );
}

const ShopCarousel = ({ img, hover }: Props) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplay: false,
    slidesToShow: 1,
    rows: 1,
    autoplaySpeed: 2000,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow hover={hover} />,
    prevArrow: <SamplePrevArrow hover={hover} />,
    // dotsClass: "carousal__shop",
  };

  return (
    <div className="lg:container ">
      <Slider {...settings}>
        {img.map((item) => {
          return (
            <div className="product-slider" key={uuidv4()}>
                  <img className="m-auto my-auto border mt-5 w-[200px] h-[150px]"  src={item?.path} />
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

export default ShopCarousel;

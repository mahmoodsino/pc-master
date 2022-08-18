import BaseButton from "../buttons/BaseButton";
import { categoriesType } from "../../helper";
import { v4 as uuidv4 } from "uuid";
//@ts-ignore
import Slider from "react-slick";

interface Props {
  categories: categoriesType[];
  setItem: (e: number) => void;
}

function SampleNextArrow(props: any) {
  const { className, style, onClick, hover } = props;
  return (
    <div
      className={`text-black absolute right-5 opacity-0 -top-2   text  h-20 w-20  rounded-full text-center cursor-pointer bg-white z-20 `}
      style={{ ...style }}
      onMouseEnter={onClick}
      onClick={onClick}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        className={`font-bold absolute top-1.5 left-1.5 bi bi-arrow-right `}
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
      className={`text-black absolute -top-2 opacity-0  h-20 w-20  rounded-full text-center  cursor-pointer bg-white  z-20    `}
      style={{ ...style }}
      onClick={onClick}
      onMouseEnter={onClick}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        className={`font-bold absolute top-1.5 left-1.5  text-black bi bi-arrow-left`}
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

const Cheips = ({ categories, setItem }: Props) => {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    autoplay: false,
    slidesToShow: 4,
    rows: 1,
    autoplaySpeed: 2000,
    slidesToScroll: 3,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    // dotsClass: "carousal__shop",
  };
  return (
    <div className="">
      <Slider {...settings}>
        {categories.map((item) => {
          return (
            <div className="p-[5px]" key={uuidv4()}>
              <BaseButton
                onClick={() => setItem(item.id)}
                className="w-60  text-gray-1250 px-2 py-0.5 shadow-[0_0_4px_rgba(0,0,0,0.25)]  leading-[24px] tracking-[0.055em] font-semibold  border border-[#E5E5E5] hover:border-green-950 rounded-full"
                title={`${item.name}`}
              />
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

export default Cheips;

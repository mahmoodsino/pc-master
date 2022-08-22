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
  const { className, style, onClick } = props;
  return (
    <div
      className={`text-black absolute right-0  -top-2   text  h-16 w-16   text-center cursor-pointer bg-white z-20 `}
      style={{
        ...style,
        background: "linear-gradient(89deg, #ff000000, white)",
      }}
      onMouseEnter={onClick}
      onClick={onClick}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="35"
        height="35"
        fill="currentColor"
        className="bi bi-caret-right absolute top-2 left-9 opacity-75"
        viewBox="0 0 16 16"
      >
        <path d="M6 12.796V3.204L11.481 8 6 12.796zm.659.753 5.48-4.796a1 1 0 0 0 0-1.506L6.66 2.451C6.011 1.885 5 2.345 5 3.204v9.592a1 1 0 0 0 1.659.753z" />
      </svg>
    </div>
  );
}

function SamplePrevArrow(props: any) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`text-black absolute -top-2 left-0   h-16 w-10  text-center  cursor-pointer bg-white  z-20    `}
      style={{
        ...style,
        background: "linear-gradient(89deg,white , #ff000000)",
      }}
      onClick={onClick}
      onMouseEnter={onClick}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="35"
        height="35"
        fill="currentColor"
        className="bi bi-caret-left absolute top-2 right-1 opacity-75"
        viewBox="0 0 16 16"
      >
        <path d="M10 12.796V3.204L4.519 8 10 12.796zm-.659.753-5.48-4.796a1 1 0 0 1 0-1.506l5.48-4.796A1 1 0 0 1 11 3.204v9.592a1 1 0 0 1-1.659.753z" />
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
    slidesToShow: 3,
    rows: 1,
    autoplaySpeed: 2000,
    slidesToScroll: 4,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    variableWidth: true,
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

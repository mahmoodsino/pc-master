import Image from "next/image";
//@ts-ignore
import Slider from "react-slick";
import { v4 as uuidv4 } from "uuid";
import { useRecoilState } from "recoil";
import { DetailsAtom, VariationAtom } from "../../../../helper";


const DetailsProductPhoto = () => {
  const [variationState, setVariationState] = useRecoilState(VariationAtom);
  const [detailsState, setDetailState] = useRecoilState(DetailsAtom);


  

  const settings = {
    customPaging: function (i: number) {
      return (
        <a className="">
          {variationState.images ? (
            <Image src={variationState.images[0]} />
          ) : (
            <Image src={detailsState.product.images[0]} />
          )}
        </a>
      );
    },
    dots: true,
    dotsClass: "slick-dots slick-thumb",
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    className: "center",
    centerMode: true,
    autoplay: true,
    autoplaySpeed: 2000,

    arrows: false,
  };
  return (
    <div className="">
      <Slider {...settings}>
        {variationState.images
          ? variationState.images.map((img) => {
              return (
                <div key={uuidv4()} className="">
                  <Image src={img} />
                </div>
              );
            })
          : detailsState.product.images.map((img) => {
              return (
                <div key={uuidv4()} className="">
                  <Image src={img} />
                </div>
              );
            })}
      </Slider>
    </div>
  );
};
export default DetailsProductPhoto;

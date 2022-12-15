import Image from "next/image";
import Slider from "react-slick";
import {  useRecoilValue } from "recoil";
import { DetailsAtom, VariationAtom } from "../../../../helper";
import no_image from "../../../../public/assets/image/no_image.jpg";

const DetailsProductPhoto = () => {
  const variationState = useRecoilValue(VariationAtom);
  const detailsState = useRecoilValue(DetailsAtom);

  const settings = {
    customPaging: function (i: number) {
      return (
        <a className="">
          {variationState.images && variationState.images?.length !== 0 ? (
            <img
              width={75}
              height={75}
              src={variationState.images[0]?.path}
            />
          ) : detailsState.product.images &&
            detailsState.product.images.length !== 0 ? (
            <img
              className="w-[75px] h-[75px]"
              width={75}
              height={75}
              src={detailsState.product.images[i]?.path}
            />
          ) : (
            <Image width={75} height={75} src={no_image} />
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
        {variationState.images && variationState.images?.length > 0 ? (
          variationState.images.map((img, i) => {
            return (
              <div key={i} className="product-slider-img">
                <img
                  className="m-auto lg:w-[400px] md:w-[350px] sm:w-[260px] "
                  src={img.path}
                />
              </div>
            );
          })
        ) : detailsState.product.images.length > 0 ? (
          detailsState.product.images.map((img, i) => {
            return (
              <div key={i} className="product-slider-img">
                <img
                  className="m-auto lg:w-[400px] md:w-[350px] px-2 sm:w-[250px] "
                  src={img.path}
                />
              </div>
            );
          })
        ) : (
          <Image width={400} height={400} src={no_image} />
        )}
      </Slider>
    </div>
  );
};
export default DetailsProductPhoto;

import Slider from "react-slick";
import { useRecoilValue } from "recoil";
import { DetailsAtom, VariationAtom } from "../../../../helper";


const DetailsProductPhoto = () => {
  const variationState = useRecoilValue(VariationAtom);
  const detailsState = useRecoilValue(DetailsAtom);

  const settings = {
    customPaging: function (i: number) {
      return (
        <a className="">
          {variationState.images && variationState.images?.length !== 0 ? (
            <img
              style={{ objectFit: "cover" }}
              width={75}
              height={75}
              src={variationState.images[i]?.path}
            />
          ) : detailsState.product.images &&
            detailsState.product.images.length !== 0 ? (
            <img
              style={{ objectFit: "cover" }}
              className="w-[75px] h-[75px]"
              width={75}
              height={75}
              src={detailsState.product.images[i]?.path}
            />
          ) : (
            <img width={75} height={75} src="/alternative.png" />
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
                  className="m-auto lg:w-[400px] md:w-[350px] sm:w-[260px] lg:h-[400px] md:h-[350px] sm:h-[250px]"
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
                  className="m-auto lg:w-[400px] md:w-[350px] sm:w-[250px] px-2  lg:h-[400px] md:h-[350px] sm:h-[250px]"
                  src={img.path}
                />
              </div>
            );
          })
        ) : (
          <img width={400} height={400} src="/alternative.png" />
        )}
      </Slider>
    </div>
  );
};
export default DetailsProductPhoto;

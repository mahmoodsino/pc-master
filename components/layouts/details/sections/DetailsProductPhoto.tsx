import Image from "next/image";
//@ts-ignore
import Slider from "react-slick";
import { v4 as uuidv4 } from "uuid";
import { useRecoilState } from "recoil";
import { DetailsAtom, VariationAtom } from "../../../../helper";
import no_image from "../../../../public/assets/image/no_image.jpg";

const DetailsProductPhoto = () => {
  const [variationState, setVariationState] = useRecoilState(VariationAtom);
  const [detailsState, setDetailState] = useRecoilState(DetailsAtom);

  const settings = {
    customPaging: function (i: number) {
      return (
        <a className="">
          {/* {variationState.images ? (
            <Image width={75} height={75} src={variationState.images[0]} />
          ) : (
            <Image
              width={75}
              height={75}
              src={detailsState.product.images[0]}
            />
          )} */}
           <Image
              width={75}
              height={75}
              src={no_image}
            /> 
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
        {/* {variationState.images && variationState.images?.length > 0 ? (
          variationState.images.map((img) => {
            return (
              <div key={uuidv4()} className="">
                <Image width={400} height={400} src={img} />
              </div>
            );
          })
        ) : detailsState.product.images.length > 0 ? (
          detailsState.product.images.map((img) => {
            return (
              <div key={uuidv4()} className="">
                <Image width={400} height={400} src={img} />
              </div>
            );
          })
        ) : (
          <Image width={400} height={400} src={no_image} />
        )} */}
        <div className="lg:ml-10 md:ml-40">
        <Image width={400} height={400} src={no_image} /> 
        </div>
        <div className="lg:ml-10 md:ml-40">
        <Image width={400} height={400} src={no_image} /> 
        </div>
        <div className="lg:ml-10 md:ml-40">
        <Image width={400} height={400} src={no_image} /> 
        </div>
      </Slider>
    </div>
  );
};
export default DetailsProductPhoto;

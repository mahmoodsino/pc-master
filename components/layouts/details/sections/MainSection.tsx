import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  DetailsAtom,
  getDetails,
  getProductModifiers,
  ModifiersGroupAtom,
  SelectedBranchAtom,
  TokenAtom,
} from "../../../../helper";
import VariationAtom from "../../../../helper/state/products/VariationAtom";
import { Searchbar } from "../../../header";
import DetailsCard from "./DetailsCard";
import DetailsProductPhoto from "./DetailsProductPhoto";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Spinner } from "../../../spinner";
import Reviews from "./Reviews";
import MoveToCartPageModal from "./MoveToCartPageModal";
import SimilarProducts from "./SimilarProducts";
import Availablity from "./Availablity";
import { toast } from "react-toastify";

const MainSection = () => {
  const variationState = useRecoilValue(VariationAtom);
  const [detailsState, setDetailState] = useRecoilState(DetailsAtom);
  const setModifiers = useSetRecoilState(ModifiersGroupAtom);
  const [loading, setLoading] = useState(true);
  const router = useRouter().query;
  const token = useRecoilValue(TokenAtom);
  const selectedBranch = useRecoilValue(SelectedBranchAtom);

  useEffect(() => {
    setLoading(false);
    const Data = async () => {
      if (router.product) {
        const res = await getDetails(+router.product, selectedBranch?.id);
        if (res === null) {
          toast.error("some thing went wrong");
        } else {
          setDetailState(res.result);
        }
        if (res) {
          setLoading(true);
        }
        const respones = await getProductModifiers(
          +router.product,
          selectedBranch?.id
        );
        if (respones === null) {
          toast.error("some thing went wrong");
        } else {
          setModifiers(respones.result);
        }
      }
    };
    Data();
  }, [router.product]);

  return (
    <div className="pb-32">
      <head>
        <title>{detailsState.product.seo_title}</title>
        <meta
          name="description"
          content={detailsState.product.seo_description}
        />
        return{" "}
        <meta
          key={detailsState.product.seo_keywords}
          name="keywords"
          content={detailsState.product.seo_keywords}
        />
        ;
      </head>
      {loading ? (
        <div>
          <div className="ml-7 w-[97%]">
            <Searchbar />
          </div>
          <div className="lg:flex lg:space-x-6 lg:px-14 my-10">
            <div className="lg:w-1/2 lg:inline-block">
              <DetailsProductPhoto />
              <div className="  mr-5 relative top-20 lg:block sm:hidden">
                <div
                  className={`mt-10 border-b-2 pb-5 ${
                    detailsState.product.description === null && "hidden"
                  }`}
                >
                  <span className="text-xl mb-5 font-bold block">
                    Product details
                  </span>
                  <span className="">{detailsState.product.description}</span>
                </div>
                <div
                  className={`mt-5 ${
                    detailsState.product.custome_properties.length === 0 &&
                    variationState.attributes?.length === 0 &&
                    "hidden"
                  }`}
                >
                  <span className="text-xl block font-bold mb-10">
                    Specifications
                  </span>
                  <div className="grid  xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-2 pb-5">
                    {variationState.attributes?.map((attribute, i) => {
                      return (
                        <div
                          key={i}
                          className="mb-6 shadow-[0_0_5px_rgba(0,0,0,0.12)] sm:w-[90%] md-[100%] rounded-md  lg:w-[90%] py-4 px-4 "
                        >
                          <p className="font-bold">{attribute.name}</p>
                          <span>{attribute.attribute_values.name}</span>
                        </div>
                      );
                    })}
                    {detailsState.product.custome_properties.map((item, i) => {
                      return (
                        <div
                          key={i}
                          className="mb-6 shadow-[0_0_5px_rgba(0,0,0,0.12)] sm:w-[90%] md-[100%] rounded-md  lg:w-[90%] py-4 px-4 "
                        >
                          <p className="font-bold">{item.name}</p>
                          <span>{item.value}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
                {token.length > 1 && (
                  <div className="">
                    <Reviews />
                  </div>
                )}
                <Availablity />
              </div>
            </div>
            <div className="lg:w-1/2 sm:mt-28 md:px-2 lg:px-0 lg:mt-0  lg:inline-block">
              <DetailsCard />
              <div className="lg:block sm:hidden">
                <SimilarProducts />
              </div>
            </div>
          </div>
          <div className="sm:block lg:hidden  tracking-[0.03em] my-10 ">
            <div
              className={`mt-10 border-b-2 pb-5 ${
                detailsState.product.description === null && "hidden"
              }`}
            >
              <span className="text-xl mb-5 font-bold block">
                Product details
              </span>
              <span className="">{detailsState.product.description}</span>
            </div>
            <div
              className={`mt-5 ${
                detailsState.product.custome_properties.length === 0 &&
                variationState.attributes?.length === 0 &&
                "hidden"
              } `}
            >
              <span className="text-xl block mb-10">Specifications</span>
              <div className="grid  xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-2 pb-5">
                {variationState.attributes?.map((attribute, i) => {
                  return (
                    <div
                      key={i}
                      className="mb-6 shadow-[0_0_5px_rgba(0,0,0,0.12)] sm:w-[90%] md-[100%] rounded-md  lg:w-[90%] py-4 px-4 "
                    >
                      <p className="font-bold">{attribute.name}</p>
                      <span>{attribute.attribute_values.name}</span>
                    </div>
                  );
                })}
                {detailsState.product.custome_properties.map((item, i) => {
                  return (
                    <div
                      key={i}
                      className="mb-6 shadow-[0_0_5px_rgba(0,0,0,0.12)] sm:w-[90%] md-[100%] rounded-md  lg:w-[90%] py-4 px-4 "
                    >
                      <p className="font-bold">{item.name}</p>
                      <span>{item.value}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          {token.length > 1 && (
            <div className="lg:hidden sm:block md:px-2 sm:px-5">
              <Reviews />
            </div>
          )}
          <div className="lg:hidden sm:block md:px-2 sm:px-1">
            <Availablity />
            <div className="lg:hidden sm:block">
              <SimilarProducts />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center ">
          <Spinner className="w-40 fill-green-950" />
        </div>
      )}
      <MoveToCartPageModal />
    </div>
  );
};

export default MainSection;

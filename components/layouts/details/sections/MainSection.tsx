import { useRecoilState } from "recoil";
import {
  addToCart,
  DetailsAtom,
  getDetails,
  getProductModifiers,
  getSimilarProducts,
  items,
  ModifiersGroupAtom,
  NewCartAtom,
  ProductsType,
  TokenAtom,
} from "../../../../helper";
import VariationAtom from "../../../../helper/state/products/VariationAtom";
import { Searchbar } from "../../../header";
import { HomeCategories } from "../../shared/categories";
import DetailsCard from "./DetailsCard";
import DetailsProductPhoto from "./DetailsProductPhoto";
import { v4 as uuidv4 } from "uuid";
import useProtectPurchaseCard from "./ProtectPurchaseCard";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Spinner } from "../../../spinner";
import Modifiers from "./Modifiers";
import useModifiers from "./Modifiers";
import ReactRating from "react-rating";
import Reviews from "./Reviews";
import { BaseCard } from "../../../cards";
import MoveToCartPageModal from "./MoveToCartPageModal";

let cart: items[] = [];

const MainSection = () => {
  const [variationState, setVariationState] = useRecoilState(VariationAtom);
  const [detailsState, setDetailState] = useRecoilState(DetailsAtom);
  const { render } = useProtectPurchaseCard();
  const [modifiers, setModifiers] = useRecoilState(ModifiersGroupAtom);
  const [loading, setLoading] = useState(false);
  const router = useRouter().query;
  const [token, setToken] = useRecoilState(TokenAtom);
  const [newCart, setNewCart] = useRecoilState(NewCartAtom);
  const { modifiersRender } = useModifiers();
  const [similarProducts, setSimilarProducts] = useState<ProductsType[]>([]);

  useEffect(() => {
    const getData = async () => {
      const res = await getSimilarProducts(token, detailsState.product.id);
      setSimilarProducts(res.result);
    };
    if (detailsState.product.id > 0) {
      getData();
    }
  }, [detailsState]);

  useEffect(() => {
    setLoading(false);
    const Data = async () => {
      if (router.product) {
        const res = await getDetails(+router.product);
        setDetailState(res.result);
        if (res) {
          setLoading(true);
        }
        const respones = await getProductModifiers(+router.product);
        setModifiers(respones.result);
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
        {detailsState.product.seo_keywords.map((keyword) => {
          return <meta key={keyword} name="keywords" content={keyword} />;
        })}
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
                <div className="mt-10 border-b-2 pb-5">
                  <h1 className="text-xl mb-5 font-bold">Product details</h1>
                  <span className="">{detailsState.product.description}</span>
                </div>
                <div className="mt-5">
                  <h1 className="text-xl font-bold mb-10">Specifications</h1>
                  <div className="grid  xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-2 pb-5">
                    {variationState.attributes?.map((attribute) => {
                      return (
                        <div
                          key={uuidv4()}
                          className="mb-6 shadow-[0_0_5px_rgba(0,0,0,0.12)] sm:w-[90%] md-[100%] rounded-md  lg:w-[90%] py-4 px-4 "
                        >
                          <p className="font-bold">{attribute.name}</p>
                          <span>{attribute.attribute_values.name}</span>
                        </div>
                      );
                    })}
                    {detailsState.product.custome_properties.map((item) => {
                      return (
                        <div
                          key={uuidv4()}
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
              </div>
            </div>
            <div className="lg:w-1/2 sm:mt-28 md:px-16 lg:px-0 lg:mt-0  lg:inline-block">
              <DetailsCard />
              <div className="  pb">
                <h1 className="text-xl mb-5 font-bold">similar products </h1>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {similarProducts?.map((item) => {
                  return (
                    <BaseCard
                      name={item.name}
                      key={uuidv4()}
                      image={item.images}
                      price={item.variation.price}
                      description={item.short_description}
                      id={item.id}
                      variation={item.variation}
                      in_wishlist={item.in_wishlist}
                    />
                  );
                })}
              </div>
            </div>
          </div>
          <div className="sm:block lg:hidden  tracking-[0.03em] my-10 sm:mx-5 md:px-12">
            <div className="mt-10 border-b-2 pb-5">
              <h1 className="text-xl mb-5 font-bold">Product details</h1>
              <span className="">{detailsState.product.description}</span>
            </div>
            <div className="mt-5">
              <h1 className="text-xl mb-10">Specifications</h1>
              <div className="grid  xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-2 pb-5">
                {variationState.attributes?.map((attribute) => {
                  return (
                    <div
                      key={uuidv4()}
                      className="mb-6 shadow-[0_0_5px_rgba(0,0,0,0.12)] sm:w-[90%] md-[100%] rounded-md  lg:w-[90%] py-4 px-4 "
                    >
                      <p className="font-bold">{attribute.name}</p>
                      <span>{attribute.attribute_values.name}</span>
                    </div>
                  );
                })}
                {detailsState.product.custome_properties.map((item) => {
                  return (
                    <div
                      key={uuidv4()}
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
            <div className="lg:hidden sm:block md:px-20 sm:px-5">
              <Reviews />
            </div>
          )}
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

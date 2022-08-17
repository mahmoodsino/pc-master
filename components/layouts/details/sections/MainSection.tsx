import { useRecoilState } from "recoil";
import {
  addToCart,
  DetailsAtom,
  getDetails,
  getProductModifiers,
  items,
  ModifiersGroupAtom,
  NewCartAtom,
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

  useEffect(() => {
    cart = newCart;
  }, [newCart]);

  const handleAddCart = () => {
    console.log(cart);
    return cart.map(async (item) => {
      if (item.product) {
        const res = await addToCart(
          token,
          1,
          item.product?.id,
          item.variation_id,
          1,
          1,
          item.modifierGroups,
          item.quantity,
          "item"
        );
        console.log(res);
      }
    });
  };
  useEffect(() => {
    return () => {
      handleAddCart();
    };
  }, []);

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
    <div>
      {loading ? (
        <div>
          <div className="flex flex-row justify-center lg:left-0 lg:right-0 lg:mx-auto ">
            <HomeCategories />
            <div className="flex flex-col  lg:w-[79.5%] md:mr-4 ">
              <Searchbar />
              <div className="mt-7 grid md:grid-cols-2 sm:grid-cols-1 sm:space-y-32 md:space-y-0">
                <div className="col-span-1 grid grid-rows-2">
                  <DetailsProductPhoto />
                  <div className="-ml-[219px] -mt-14 mr-5 lg:block sm:hidden">
                    <div className="text-lg font-bold border-b-2 pb-8">
                      <span>About this item:</span>
                    </div>
                    <div className="mt-10 border-b-2 pb-10">
                      <h1 className="text-xl mb-10">Product details</h1>
                      <span className="font-bold">
                        {detailsState.product.description}
                      </span>
                    </div>
                    <div className="mt-10">
              <h1 className="text-xl mb-10">Specifications</h1>
              <div className="grid  xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-2">
                {detailsState.product.custome_properties.map((item) => {
                  return (
                    <div
                      key={uuidv4()}
                      className="mb-10 shadow-[0_0_10px_rgba(0,0,0,0.25)] sm:w-[90%] md-[100%] rounded-md  lg:w-[80%] py-4 pl-5 "
                    >
                      <h1 className="font-bold">{item.name}</h1>
                      <h1>{item.value}</h1>
                    </div>
                  );
                })}
              </div>
            </div>
                  </div>
                </div>
                <div className="col-span-1 ">
                  <DetailsCard />
                  {render}
                </div>
              </div>
            </div>
          </div>

          <div className="sm:block lg:hidden  tracking-[0.03em] my-10 sm:mx-5 md:px-12">
            <div className="text-lg font-bold border-b-2 pb-8">
              <span>About this item:</span>
            </div>
            <div className="mt-10 border-b-2 pb-10">
              <h1 className="text-xl mb-10">Product details</h1>
              <span className="font-bold">
                {detailsState.product.description}
              </span>
            </div>
            <div className="mt-10">
              <h1 className="text-xl mb-10">Specifications</h1>
              <div className="grid  xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-2">
                {detailsState.product.custome_properties.map((item) => {
                  return (
                    <div
                      key={uuidv4()}
                      className="mb-10 shadow-[0_0_10px_rgba(0,0,0,0.25)] sm:w-[90%] md-[100%] rounded-md  lg:w-[80%] py-4 pl-5 "
                    >
                      <h1 className="font-bold">{item.name}</h1>
                      <h1>{item.value}</h1>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center ">
          <Spinner className="w-40 fill-green-950" />
        </div>
      )}
    </div>
  );
};

export default MainSection;

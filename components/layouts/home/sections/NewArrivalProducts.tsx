import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { HomePageAtom, TokenAtom, WishListAtom } from "../../../../helper/state";
import { BaseCard } from "../../../cards";
import { Cheips } from "../../../inputs";
import { v4 as uuidv4 } from "uuid";
import { getNewArraivalProducts, ProductsType } from "../../../../helper";

const NewArrivalProducts = () => {
  const [newArrivalProducts, setNewArrivalProducts] = useState<ProductsType[]>(
    []
  );
  const [homePageState, setHomePageState] = useRecoilState(HomePageAtom);
  const [token, setToken] = useRecoilState(TokenAtom);
  const [wishList, setWishList] = useRecoilState(WishListAtom);



  const setItem = async (setItem: number) => {
    const res = await getNewArraivalProducts(token,setItem);
    setNewArrivalProducts(res.result.items);
  };

  useEffect(() => {
    const getData = async () => {
      const res = await getNewArraivalProducts(token);
      setNewArrivalProducts(res.result.items);
    };
    getData();
  }, [wishList]);

  return (
    <div>
      <div className="flex sm:flex-col space-y-3 lg:flex-row items-center sm:justify-start lg:justify-around my-10 pt-10">
        <div className="text-xl  font-bold leading-[30px] tracking-[0.055em] whitespace-nowrap	">
          New Arrivals
        </div>
        <Cheips
          categories={homePageState.featured_categories}
          setItem={setItem}
        />
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-5 md:grid-cols-3 my-5  lg:mx-10 xl:mx-10 mb-10">
        {newArrivalProducts?.map((item) => {
          return (
            <BaseCard
              key={uuidv4()}
              image={item.images}
              price={item.variation.price}
              description={item.short_description}
              id={item.id}
              variation={item.variation }
              in_wishlist={item.in_wishlist}
            />
          );
        })}
      </div>
    </div>
  );
};

export default NewArrivalProducts;

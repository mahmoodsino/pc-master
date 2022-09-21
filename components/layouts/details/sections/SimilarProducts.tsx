import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import {
  DetailsAtom,
  getSimilarProducts,
  ProductsType,
  TokenAtom,
  WishListAtom,
} from "../../../../helper";
import { BaseCard } from "../../../cards";

const SimilarProducts = () => {
  const [similarProducts, setSimilarProducts] = useState<ProductsType[]>([]);
  const [detailsState, setDetailState] = useRecoilState(DetailsAtom);
  const [token, setToken] = useRecoilState(TokenAtom);
  const [wishList, setWishList] = useRecoilState(WishListAtom);

  useEffect(() => {
    const getData = async () => {
      const res = await getSimilarProducts(token, detailsState.product.id);
      setSimilarProducts(res.result);
    };
    if (detailsState.product.id > 0) {
      getData();
    }
  }, [detailsState, wishList]);
  return (
    <div>
      <div className="  pb">
        <span className="text-xl block mb-5 font-bold">Similar Products </span>
      </div>
      <div className="grid grid-cols-2 gap-2 ">
        {similarProducts?.map((item, i) => {
          return (
            <BaseCard
              name={item.name}
              key={i}
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
  );
};

export default SimilarProducts;

import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import {
  DetailsAtom,
  getSimilarProducts,
  ProductsType,
  SelectedBranchAtom,
  TokenAtom,
} from "../../../../helper";
import { BaseCard } from "../../../cards";

const SimilarProducts = () => {
  const [similarProducts, setSimilarProducts] = useState<ProductsType[]>([]);
  const detailsState = useRecoilValue(DetailsAtom);
  const token = useRecoilValue(TokenAtom);
  // const [wishList, setWishList] = useRecoilState(WishListAtom);
  const selectedBranch = useRecoilValue(SelectedBranchAtom);

  useEffect(() => {
    const getData = async () => {
      const res = await getSimilarProducts(
        token,
        detailsState.product.id,
        selectedBranch?.id
      );
      if (res === null) {
      } else {
        setSimilarProducts(res.result);
      }
    };
    if (selectedBranch?.id > 0 && detailsState.product.id > 0) {
      getData();
    }
  }, []);
  return (
    <div>
      <div className="  pb">
        <span className="text-xl block mb-5 font-bold">Similar Products </span>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-1 ">
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

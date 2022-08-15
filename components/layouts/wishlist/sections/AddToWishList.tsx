import React from "react";
import { useRecoilState } from "recoil";
import {
  addToCart,
  addToWishList,
  deleteWishList,
  DetailsAtom,
  OpenAddToWishListAtom,
  TokenAtom,
  VariationAtom,
  WishListAtom,
} from "../../../../helper";
import { addToWishListSchema } from "../../../../helper/validation";
import { BaseButton } from "../../../buttons";
import { BaseInput } from "../../../inputs";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

interface IFormInputs {
  title: string;
}

const AddToWishList = () => {
  const [openAddToWishList, setOpenAddToWishList] = useRecoilState(
    OpenAddToWishListAtom
  );
  const [variationState, setVariationState] = useRecoilState(VariationAtom);
  const [detailsState, setDetailState] = useRecoilState(DetailsAtom);
  const [wishList, setWishList] = useRecoilState(WishListAtom);
  const [token, setToken] = useRecoilState(TokenAtom);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: yupResolver(addToWishListSchema),
  });

  const handleaddToWishList = async (data: IFormInputs) => {
    setWishList((prev) => {
      const isItemInWishList = prev.find(
        (item) =>
          // item.product_id === detailsState.product.id &&
          item.variation_id === variationState.id
      );
      if (isItemInWishList) {
        return prev.filter(
          (item) =>
            // item.product_id !== detailsState.product.id &&
            item.variation_id !== variationState.id
        );
      } else {
        return [
          ...prev,
          {
            ...detailsState,
            title: "  ",
            quantity: 1,
            company_id:1,
            product_id: detailsState.product.id,
            branch_id: 1,
            description: " ",
            variation_id: variationState.id,
            variation:variationState
          },
        ];
      }
    });
    const isItemInWishList = wishList.findIndex(
      (item) => item.variation_id === variationState.id
    );
    if(isItemInWishList<0){
      const res = await addToWishList(token,detailsState.product.id,variationState.id,1,1,1," z","z ")
      
      
    }
    if(isItemInWishList>=0){
      const id = wishList[isItemInWishList].id
      if(id){
        const res =await deleteWishList(token,id)
        
      }

    }

    setOpenAddToWishList(false);
  };

  return (
    <div className="2xl:container">
      <>
        <div
          className={`${
            openAddToWishList ? "top-0 " : "-top-[200%]"
          } inset-0 sm:w-[95%] bg-white md:w-[60%] rounded-xl lg:w-[40%] w-[50vw] h-fit left-0 right-0 top-0 bottom-0 mx-auto my-auto shadow-lg z-50 fixed transition-all duration-300 ease-in-out`}
        >
          <div className=" sm:px-5 md:px-16 py-10">
            <form onSubmit={handleSubmit(handleaddToWishList)}>
              <BaseInput
                name="title"
                register={register}
                className=""
                placeholder="Title"
                title="Title"
              />

              <div className="flex justify-between items-center">
                <BaseButton
                  className="px-4 py-2 border border-black  rounded-sm "
                  title="Cancel"
                  onClick={() => setOpenAddToWishList(false)}
                  type="button"
                />

  
                  <BaseButton
                    className=""
                    title="Add To WishList"
                    type="submit"
                  />
                
              </div>
            </form>
          </div>
        </div>
        {openAddToWishList ? (
          <div className="opacity-25 fixed inset-0 z-40 bg-black  "></div>
        ) : null}
      </>
    </div>
  );
};

export default AddToWishList;

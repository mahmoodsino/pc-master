import React, { useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  addToWishList,
  deleteWishList,
  DetailsAtom,
  ErroreMessageAtom,
  OpenAddToWishListAtom,
  OpenMessageModalAtom,
  SelectedBranchAtom,
  TokenAtom,
  VariationAtom,
  WishListAtom,
} from "../../../../helper";
import { addToWishListSchema } from "../../../../helper/validation";
import { BaseButton } from "../../../buttons";
import { BaseInput } from "../../../inputs";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Spinner } from "../../../spinner";

interface IFormInputs {
  title: string;
}

const AddToWishList = () => {
  const [openAddToWishList, setOpenAddToWishList] = useRecoilState(
    OpenAddToWishListAtom
  );
  const variationState = useRecoilValue(VariationAtom);
  const detailsState = useRecoilValue(DetailsAtom);
  const [wishList, setWishList] = useRecoilState(WishListAtom);
  const token = useRecoilValue(TokenAtom);
  const [loading, setLoading] = useState(false);
  const selectedBranch = useRecoilValue(SelectedBranchAtom);
  const setOpenMassegModal = useSetRecoilState(OpenMessageModalAtom);
  const setWrrongMessage = useSetRecoilState(ErroreMessageAtom);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: yupResolver(addToWishListSchema),
  });

  const handleaddToWishList = async (data: IFormInputs) => {
    setLoading(true);
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
            title: data.title,
            quantity: 1,
            company_id: 1,
            product_id: detailsState.product.id,
            branch_id: selectedBranch?.id,
            description: "item",
            variation_id: variationState.id,
            variation: variationState,
          },
        ];
      }
    });
    const isItemInWishList = wishList.findIndex(
      (item) => item.variation_id === variationState.id
    );
    if (isItemInWishList < 0) {
      const res = await addToWishList(
        token,
        detailsState.product.id,
        variationState.id,
        1,
        selectedBranch?.id,
        1,
        data.title,
        data.title
      );
      if (res === null) {
        setWrrongMessage("some thing went wrong");
        setOpenMassegModal(true);
      } else {
        setOpenAddToWishList(false);
        setLoading(false);
        setWishList(res.result.items);
      }
    }
    if (isItemInWishList >= 0) {
      const id = wishList[isItemInWishList].id;
      if (id) {
        const res = await deleteWishList(token, id);
        if (res === null) {
          setWrrongMessage("some thing went wrong");
          setOpenMassegModal(true);
        } else {
          setOpenAddToWishList(false);
          setWishList(res.result.items);
        }
      }
    }
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
              <p className="text-sm text-red-950">{errors.title?.message}</p>

              <div className="flex justify-between items-center">
                <BaseButton
                  className="md:px-4 sm:px-2 py-2 border border-black  rounded-sm "
                  title="Cancel"
                  onClick={() => setOpenAddToWishList(false)}
                  type="button"
                />
                {!loading ? (
                  <BaseButton
                    className=""
                    title="Add To WishList"
                    type="submit"
                  />
                ) : (
                  <Spinner className="w-10 fill-green-950" />
                )}
              </div>
            </form>
          </div>
        </div>
        {openAddToWishList ? (
          <div onClick={() => setOpenAddToWishList(false)} className="opacity-25 fixed inset-0 z-40 bg-black  "></div>
        ) : null}
      </>
    </div>
  );
};

export default AddToWishList;

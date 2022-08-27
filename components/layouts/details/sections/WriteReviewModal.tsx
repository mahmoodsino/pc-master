import React, { useState } from "react";
import { atom, useRecoilState } from "recoil";
import ReactRating from "react-rating";
import { BaseButton } from "../../../buttons";
import { BaseInput } from "../../../inputs";


export const OpenWriteReviewModalAtom = atom({
  key: "OpenWriteReviewModalAtom",
  default: false,
});

const WriteReviewModal = () => {
  const [openWriteReviewModal, setOpenWriteReviewModal] = useRecoilState(
    OpenWriteReviewModalAtom
  );
  const [rate,setRate]=useState<number>()
  
  return (
    <div>
      <>
        <div
          className={`${
            openWriteReviewModal ? "left-0 " : "-left-[200%]"
          } inset-0 sm:w-[95%] px-3 py-5 rounded-md bg-white md:w-[60%] lg:w-[40%] w-[50vw] h-fit left-0 right-0 top-0 bottom-0 mx-auto my-auto shadow-lg z-50 fixed transition-all duration-300 ease-in-out`}
        >
            <div className="flex justify-center items-center">
                <span className="font-bold">rate the item </span>
                <ReactRating
                onChange={(e) => setRate(e)}
                    emptySymbol={
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-star"
                        viewBox="0 0 16 16"
                    >
                        <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
                    </svg>
                    }
                    fullSymbol={
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-star-fill"
                        viewBox="0 0 16 16"
                    >
                        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                    </svg>
                    }
                    start={0}
                    stop={5}
                />
            </div>
            <form>
            <BaseInput
                name="title"
                className=""
                placeholder="Title"
                title="Title"
              />
            </form>
            <div className="flex justify-around">
                <BaseButton className="px-4 py-1 border border-black " title="Cancel" onClick={() => setOpenWriteReviewModal(false)} />
                <BaseButton className="px-4 py-1 text-white bg-[#0071dc]" title="submit" />
            </div>

          </div>
          {openWriteReviewModal ? (
            <div className="opacity-25 fixed inset-0 z-40 bg-black "></div>
          ) : null}
      </>
    </div>
  );
};

export default WriteReviewModal;

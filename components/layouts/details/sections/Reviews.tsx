import React, { useEffect, useState } from "react";
import ReactRating from "react-rating";
import { useRecoilState } from "recoil";
import { checkRewiewable, DetailsAtom, getReviews, TokenAtom } from "../../../../helper";
import { BaseButton } from "../../../buttons";
import WriteReviewModal, { OpenWriteReviewModalAtom } from "./WriteReviewModal";

interface reviewsType {
  created_at: string;
  id: number;
  rate: number;
  text: string;
  user: {
    description: string;
    email: string;
    first_name: string;
    id: number;
    img: string;
    last_name: string;
  };
}

const Reviews = () => {
  const [detailsState, setDetailState] = useRecoilState(DetailsAtom);
  const [token, setToken] = useRecoilState(TokenAtom);
  const [review, setRewiew] = useState<reviewsType[]>([]);
  const [openWriteReviewModal, setOpenWriteReviewModal] = useRecoilState(
    OpenWriteReviewModalAtom
  );

  useEffect(() => {
    const getData = async () => {
      const res = await getReviews(token, detailsState.product.id);
      setRewiew(res.result.items);
    };
    getData();
  }, [detailsState]);

  const handalcheckReviewable = async (id:number) => {
    const res =await checkRewiewable(token,id)
    console.log(res);
    setOpenWriteReviewModal(true)
  }


  return (
    <div>
      {review.length > 0 && 
        <div>
      <p className="text-xl font-semibold">
        Customer reviews & ratings
      </p>
      <div className="font-bold text-gray-950 mt-5">
        <span className="text-7xl ">{detailsState.product.avg_rate}</span>
        <span>out of</span>
        <span className="text-7xl ">5</span>
      </div>
      <div className="flex items-center mt-2">
        <ReactRating
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
            initialRating={detailsState.product.avg_rate}
            readonly={true}
        />
        <span className="text-xs"> ({review.length} review)</span>
      </div>
      <BaseButton onClick={() => handalcheckReviewable(detailsState.product.id)} className="bg-[#0071dc] text-white rounded-full px-4 py-1 mt-2 "  title="write review"/>

      <div className="grid grid-cols-4 mt-10 gap-2">
          {review.map((item) => {
            return (
              <div key={item.id} className="shadow-[0_0_5px_rgba(0,0,0,0.12)] rounded-md px-3  py-2 mt-2">
                <div className=" flex items-center justify-between whitespace-nowrap w-full mb-5">
                  <ReactRating
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
                    initialRating={item.rate}
                    readonly={true}
                  />
                  <span className="text-xs text-[#74767c]">
                    {item.created_at}
                  </span>
                </div>
                <span className="text-[#46474a] text-sm">{item.text}</span>
                <span className="text-xs text-[#74767c] block mt-1">
                  {item.user.first_name} {item.user.last_name}
                </span>
              </div>
            );
          })}
        </div>
        </div>
        }
        <WriteReviewModal />
    </div>

  );
};

export default Reviews;

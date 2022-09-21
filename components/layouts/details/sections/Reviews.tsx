import React, { useEffect, useState } from "react";
import ReactStars from "react-stars";
import { atom, useRecoilState } from "recoil";
import {
  checkRewiewable,
  DetailsAtom,
  getReviews,
  handelDeleteReview,
  OpenMessageModalAtom,
  TokenAtom,
} from "../../../../helper";
import { BaseButton } from "../../../buttons";
import { MessageModal } from "../../../messageModal";
import { Spinner } from "../../../spinner";
import WriteReviewModal, {
  OpenUpdateReviewModalAtom,
  OpenWriteReviewModalAtom,
} from "./WriteReviewModal";

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

export const userReviewAtom = atom<reviewsType>({
  key: "userReviewAtom",
  default: {} as reviewsType,
});

const Reviews = () => {
  const [detailsState, setDetailState] = useRecoilState(DetailsAtom);
  const [token, setToken] = useRecoilState(TokenAtom);
  const [review, setRewiew] = useState<reviewsType[]>([]);
  const [openWriteReviewModal, setOpenWriteReviewModal] = useRecoilState(
    OpenWriteReviewModalAtom
  );
  const [userReview, setUserReview] = useRecoilState(userReviewAtom);
  const [openUbdateReviewModal, setOpenUpdateReviewModal] = useRecoilState(
    OpenUpdateReviewModalAtom
  );
  const [loading, setLoading] = useState(false);
  const [checkLoading, setCheckLoading] = useState(false);
  const [openMessageModal, setOpenMassegModal] =
    useRecoilState(OpenMessageModalAtom);
    const [wrongMessage,setWrongMessage]=useState("")

  useEffect(() => {
    // setUserReview({} as reviewsType);
    const getData = async () => {
      const res = await getReviews(token, detailsState.product.id);
      if (res.result.user_review) {
        setUserReview(res.result.user_review);
      } else {
        setUserReview({} as reviewsType);
      }
      setRewiew(res.result.items);
    };
    if (token.length > 1) {
      getData();
    }
  }, [detailsState, openUbdateReviewModal, openWriteReviewModal]);

  const handalcheckReviewable = async (id: number) => {
    setCheckLoading(true);
    const res = await checkRewiewable(token, id);
    if (res) {
      setCheckLoading(false);
    }
    if (res.name === "AxiosError") {
      if (res.response.status === 400) {
        setWrongMessage(res.response.data.message);
        setOpenMassegModal(true)
      } else {
        alert("some thing went wrong !!");
      }
    } else {
      setOpenWriteReviewModal(true);
    }
  };
  const deleteReview = async (id: number) => {
    const response = await handelDeleteReview(token, id);
    const res = await getReviews(token, detailsState.product.id);
    if (res.result.user_review) {
      setUserReview(res.result.user_review);
    } else {
      setUserReview({} as reviewsType);
    }
    setRewiew(res.result.items);
  };
  return (
    <div className="mt-5">
      {!loading ? (
        <div>
          <div>
            <p className="text-xl font-bold">Customer reviews & ratings</p>
            <div className="font-bold text-gray-950 mt-5">
              <span className="text-7xl ">{detailsState.product.avg_rate}</span>
              <span>out of</span>
              <span className="text-7xl ">5</span>
            </div>
            <div className="flex items-center mt-2">
              <ReactStars value={detailsState.product.avg_rate} edit={false} />
              <span className="text-xs"> ({review.length} review)</span>
            </div>
            {userReview.id === undefined &&  
            <div>
                {!checkLoading ? (
                  <BaseButton
                    onClick={() => handalcheckReviewable(detailsState.product.id)}
                    className="bg-green-950 text-white rounded-full px-4 py-1 mt-2 "
                    title="write review"
                  />
                ) : (
                  <div className="w-fit">
                    <Spinner className="w-7" />
                  </div>
                )}
            </div>
            }

            {userReview.id !== undefined && 
             <BaseButton
             onClick={()  => setOpenUpdateReviewModal(true)}
             className="bg-green-950 text-white rounded-full px-4 py-1 mt-2 "
             title="Edit review"
           />
            }

            <div className="grid grid-cols-2 mt-10 gap-2">
              {userReview.id !== undefined && (
                <div className="shadow-[0_0_5px_rgba(0,0,0,0.12)] rounded-md px-3  py-2 mt-2">
                  <div className=" flex md:flex-row sm:flex-col sm:items-start md:items-center justify-between whitespace-nowrap w-full mb-5">
                    <ReactStars value={userReview.rate} edit={false} />

                    <div className="flex md:flex-row space-x-3 ">
                      <span className="text-xs text-[#74767c]">
                        {userReview.created_at}
                      </span>
                      <div className="space-x-3 flex">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          onClick={() => setOpenUpdateReviewModal(true)}
                          fill="currentColor"
                          className="bi bi-pencil-square text-green-950 cursor-pointer w-4 "
                          viewBox="0 0 16 16"
                        >
                          <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                          <path
                            fillRule="evenodd"
                            d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                          />
                        </svg>

                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          onClick={() => deleteReview(userReview.id)}
                          className="text-red-950 bi bi-trash-fill cursor-pointer w-4"
                          viewBox="0 0 16 16"
                        >
                          <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <span className="text-[#46474a] text-sm">
                    {userReview.text}
                  </span>
                  <span className="text-xs text-[#74767c] block mt-1">
                    {userReview.user?.first_name} {userReview.user?.last_name}
                  </span>
                </div>
              )}
              {review.map((item) => {
                return (
                  <div
                    key={item.id}
                    className="shadow-[0_0_5px_rgba(0,0,0,0.12)] rounded-md px-3  py-2 mt-2"
                  >
                    <div className=" flex items-center justify-between whitespace-nowrap w-full mb-5">
                      <ReactStars value={item.rate} edit={false} />
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
          {openUbdateReviewModal ? (
            <WriteReviewModal
              rated={userReview.rate}
              id={userReview.id}
              text={userReview.text}
            />
          ) : (
            <WriteReviewModal />
          )}
        </div>
      ) : (
        <Spinner className="fill-green-950 w-20" />
      )}
      <MessageModal message={wrongMessage} />
    </div>
  );
};

export default Reviews;

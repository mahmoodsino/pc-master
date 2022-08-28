import React, { useEffect, useState } from "react";
import { atom, useRecoilState } from "recoil";
import { BaseButton } from "../../../buttons";
import {
  DetailsAtom,
  handelUpdateReview,
  handelWriteReview,
  TokenAtom,
} from "../../../../helper";
import { userReviewAtom } from "./Reviews";
import { Spinner } from "../../../spinner";
import ReactStars from "react-stars";

export const OpenWriteReviewModalAtom = atom({
  key: "OpenWriteReviewModalAtom",
  default: false,
});
export const OpenUpdateReviewModalAtom = atom({
  key: "OpenUpdateReviewModalAtom",
  default: false,
});

interface Props {
  rated?: number;
  text?: string;
  id?: number;
}

const WriteReviewModal = ({ rated, text, id }: Props) => {
  const [openWriteReviewModal, setOpenWriteReviewModal] = useRecoilState(
    OpenWriteReviewModalAtom
  );
  const [openUbdateReviewModal, setOpenUpdateReviewModal] = useRecoilState(
    OpenUpdateReviewModalAtom
  );
  const [rate, setRate] = useState<number>(0);
  const [writeReview, setWriteReview] = useState("");
  const [token, setToken] = useRecoilState(TokenAtom);
  const [detailsState, setDetailState] = useRecoilState(DetailsAtom);
  const [userReview, setUserReview] = useRecoilState(userReviewAtom);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setRate(0);
    setWriteReview("");
    if (openUbdateReviewModal) {
      if (rated && text) {
        setRate(rated);
        setWriteReview(text);
      }
    }
  }, [id]);

  const handelSubmit = async () => {
    if (openWriteReviewModal) {
      const res = await handelWriteReview(
        token,
        detailsState.product.id,
        rate,
        writeReview
      );
      setUserReview(res.result);
      if (userReview.id > 0) {
        setLoading(false);
      }
      setOpenWriteReviewModal(false);
    }
    if (OpenUpdateReviewModalAtom && id) {
      setLoading(true);
      const res = await handelUpdateReview(token, id, rate, writeReview);
      setUserReview(res.result);
      if (userReview.id > 0) {
        setLoading(false);
      }
      setOpenUpdateReviewModal(false);
    }
  };

  return (
    <div>
      <>
        <div
          className={`${
            openWriteReviewModal || openUbdateReviewModal
              ? "left-0 "
              : "-left-[200%]"
          } inset-0 sm:w-[95%] px-3 py-5 rounded-md bg-white md:w-[60%] lg:w-[40%] w-[50vw] h-fit left-0 right-0 top-0 bottom-0 mx-auto my-auto shadow-lg z-50 fixed transition-all duration-300 ease-in-out`}
        >
          <div>
            {!loading ? (
              <div>
                <div className="flex  flex-col items-center space-y-3 mb-5 ml-0 mr-0 mx-auto">
                  <span className="font-bold block">rate the item </span>
                  <ReactStars
                    value={rate}
                    onChange={(e) => setRate(e)}
                    size={30}
                  />
                </div>
                <form>
                  <textarea
                    name="review"
                    className="w-full border"
                    placeholder="review"
                    title="write review "
                    value={writeReview}
                    onChange={(e) => setWriteReview(e.target.value)}
                  />
                </form>
                <div className="flex justify-around">
                  <BaseButton
                    className="px-4 py-1 border border-black "
                    title="Cancel"
                    onClick={() => (
                      setOpenWriteReviewModal(false),
                      setOpenUpdateReviewModal(false)
                    )}
                  />
                  <BaseButton
                    onClick={() => handelSubmit()}
                    disabled={rate ? false : true}
                    className="px-4 py-1 text-white bg-[#0071dc] disabled:bg-gray-600"
                    title="submit"
                  />
                </div>
              </div>
            ) : (
              <Spinner className="fill-green-950 w-10" />
            )}
          </div>
        </div>
        {openWriteReviewModal || openUbdateReviewModal ? (
          <div className="opacity-25 fixed inset-0 z-40 bg-black "></div>
        ) : null}
      </>
    </div>
  );
};

export default WriteReviewModal;

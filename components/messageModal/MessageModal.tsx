import React from "react";
import { useRecoilState } from "recoil";
import { OpenMessageModalAtom } from "../../helper";
import { BaseButton } from "../buttons";

interface Props {
  message: string;
}
const MessageModal = ({ message }: Props) => {
  const [openMessageModal, setOpenMassegModal] =
    useRecoilState(OpenMessageModalAtom);

  return (
    <div className="2xl:container">
      <>
        <div
          className={`${
            openMessageModal ? "top-0 " : "-top-[200%]"
          } inset-0 sm:w-[95%] bg-white md:w-[60%]  lg:w-[40%] w-[50vw] h-fit left-0 right-0 top-0 bottom-0 mx-auto my-auto shadow-lg z-[100] fixed transition-all duration-300 ease-in-out`}
        >
          <div className=" sm:px-5 md:px-7 py-3 flex  items-center space-x-3">
            <div className=" flex justify-center items-center bg-red-950/20  w-[50px] h-[50px] rounded-full ">
              <svg
              className="mr-0.5 mb-0.5"
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
                width="25"
                height="25"
                viewBox="0 0 256 256"
              >
                <defs></defs>
                <g
                  style={{
                    stroke: "none",
                    strokeWidth: "0",
                    strokeDasharray: "none",
                    strokeLinecap: "butt",
                    strokeLinejoin: "miter",
                    strokeMiterlimit: "10",
                    fill: "none",
                    fillRule: "nonzero",
                    opacity: "1",
                  }}
                  transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)"
                >
                  <path
                    d="M 45 88.11 h 40.852 c 3.114 0 5.114 -3.307 3.669 -6.065 L 48.669 4.109 c -1.551 -2.959 -5.786 -2.959 -7.337 0 L 0.479 82.046 c -1.446 2.758 0.555 6.065 3.669 6.065 H 45 z"
                    style={{
                      stroke: "none",
                      strokeWidth: "1",
                      strokeDasharray: "none",
                      strokeLinecap: "butt",
                      strokeLinejoin: "miter",
                      strokeMiterlimit: "10",
                      fill: "rgb(214,0,0)",
                      fillRule: "nonzero",
                      opacity: "1",
                    }}
                    transform=" matrix(1 0 0 1 0 0) "
                    strokeLinecap="round"
                  />
                  <path
                    d="M 45 64.091 L 45 64.091 c -1.554 0 -2.832 -1.223 -2.9 -2.776 l -2.677 -25.83 c -0.243 -3.245 2.323 -6.011 5.577 -6.011 h 0 c 3.254 0 5.821 2.767 5.577 6.011 L 47.9 61.315 C 47.832 62.867 46.554 64.091 45 64.091 z"
                    style={{
                      stroke: "none",
                      strokeWidth: "1",
                      strokeDasharray: "none",
                      strokeLinecap: "butt",
                      strokeLinejoin: "miter",
                      strokeMiterlimit: "10",
                      fill: " rgb(255,255,255)",
                      fillRule: "nonzero",
                      opacity: " 1",
                    }}
                    transform=" matrix(1 0 0 1 0 0) "
                    strokeLinecap="round"
                  />
                  <circle
                    cx="44.995999999999995"
                    cy="74.02600000000001"
                    r="4.626"
                    style={{
                      stroke: "none",
                      strokeDasharray: "none",
                      strokeLinecap: "butt",
                      strokeLinejoin: "miter",
                      strokeMiterlimit: "10",
                      fill: "rgb(255,255,255)",
                      fillRule: "nonzero",
                      opacity: "1",
                    }}
                    transform="  matrix(1 0 0 1 0 0) "
                  />
                </g>
              </svg>
            </div>
            <span className="text-gray-1150 font-bold text-lg uppercase">
            oh snap !!

            </span>
          </div>
          <div className="sm:px-5 md:px-7 pb-5">
            <span className="text-gray-1250 font-bold capitalize">{message}</span>

          </div>
          <div className="px-8 py-3 flex justify-end bg-gray-1000/20">
            <BaseButton
              onClick={() => setOpenMassegModal(false)}
              className="px-3 py-0.5 border uppercase font-bold bg-green-950 text-white rounded-full "
              title="ok"
            />
          </div>
        </div>
        {openMessageModal ? (
          <div className="opacity-25 fixed inset-0 z-[99] bg-black  "></div>
        ) : null}
      </>
    </div>
  );
};
export default MessageModal;

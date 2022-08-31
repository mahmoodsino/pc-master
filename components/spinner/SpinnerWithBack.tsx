import React from "react";

interface Props {
  className?: string;
}

const SpinnerWithBack = ({ className }: Props) => {
  return (
    <div className="2xl:container">
      <>
        <div
          role="status"
          className="inset-0  h-fit left-0 right-0 top-0 bottom-0 mx-auto my-auto  z-50 fixed transition-all duration-300 ease-in-out"
        >
          <svg
            className={className}
            xmlns="http://www.w3.org/2000/svg"
            style={{
              margin: "auto",
              display: "block",
              shapeRendering: "auto",
              animationPlayState: "running",
              animationDelay: " 0s",
            }}
            viewBox="0 0 100 100"
            preserveAspectRatio="xMidYMid"
          >
            <circle
              cx="50"
              cy="50"
              r="32"
              strokeWidth="8"
              stroke="#02A91C"
              strokeDasharray="50.26548245743669 50.26548245743669"
              fill="none"
              strokeLinecap="round"
              style={{ animationPlayState: "running", animationDelay: "0s" }}
            >
              <animateTransform
                attributeName="transform"
                type="rotate"
                repeatCount="indefinite"
                dur="1s"
                keyTimes="0;1"
                values="0 50 50;360 50 50"
                style={{ animationPlayState: "running", animationDelay: "0s" }}
              ></animateTransform>
            </circle>
          </svg>
        </div>
        <div className="opacity-70 fixed inset-0 z-40 bg-white blur-3xl  "></div>
      </>
    </div>
  );
};

export default SpinnerWithBack;

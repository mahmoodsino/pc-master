import { MouseEvent } from "react";
import React from "react";

interface Props {
  className: string;
  onClick?: (e: MouseEvent<SVGSVGElement>) => void;

}

const RedHeartIcon = ({ className,onClick }: Props) => {
  return (
    <svg
      className={className}
      onClick={onClick}
      viewBox="0 0 16 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14.1539 1.59284C13.7403 1.17638 13.2485 0.845766 12.7068 0.620006C12.165 0.394246 11.584 0.277793 10.9971 0.277344C9.88698 0.277525 8.81739 0.694548 8.00011 1.44584C7.18291 0.694422 6.11327 0.277379 5.00311 0.277344C4.41551 0.277956 3.83384 0.394763 3.29156 0.621045C2.74928 0.847327 2.25711 1.17861 1.84336 1.59584C0.0786076 3.36809 0.0793575 6.14009 1.84486 7.90485L8.00011 14.0601L14.1554 7.90485C15.9209 6.14009 15.9216 3.36809 14.1539 1.59284Z"
        fill="#FF291B"
      />
    </svg>
  );
};

export default RedHeartIcon;

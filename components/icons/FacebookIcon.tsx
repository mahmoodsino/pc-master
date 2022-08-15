import React from "react";

interface Props {
  className: string;
}

const FacebookIcon = ({ className }: Props) => {
  return (
    <svg
      className={className}
      viewBox="0 0 15 27"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M4.959 26.7H9.7935V14.655H13.836L14.4465 9.96905H9.7935V6.96605C9.7935 5.61305 10.173 4.68905 12.12 4.68905H14.6115V0.481549C14.1825 0.432049 12.714 0.300049 10.998 0.300049C7.401 0.300049 4.959 2.49455 4.959 6.50405V9.96905H0.900002V14.655H4.959V26.7Z" />
    </svg>
  );
};

export default FacebookIcon;

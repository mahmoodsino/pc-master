import React from "react";
import { useRecoilState } from "recoil";
import {  currentPageAtom, totalPagesAtom } from "../../helper";
import Pagination from "react-js-pagination";

interface Props {
  paginate: (num: number) => void;
}

const Paginations = ({ paginate }: Props) => {
  const [totalPages, setTotalPages] = useRecoilState(totalPagesAtom);
  const [currentPage, setCurrentPage] = useRecoilState(currentPageAtom);
  


  return (
    <div className=" mt-10  ">
      <Pagination
        innerClass="flex sm:space-x-2.5 md:space-x-5 justify-center text-xl flex-shrink-0 "
        itemClass="  cursor-pointer md:rounded-full flex-shrink-0 md:py-4 md:px-5 sm:py-1 sm:px-2 border hover:bg-green-950 hover:text-white sm:text-sm  duration-300 "
        activeClass="bg-green-950 text-white"
        itemClassFirst="border  "
        itemClassPrev="border "
        activePage={currentPage}
        itemsCountPerPage={25}
        totalItemsCount={25 * totalPages}
        pageRangeDisplayed={5}
        onChange={paginate.bind(this)}
      />
    </div>
  );
};

export default Paginations;

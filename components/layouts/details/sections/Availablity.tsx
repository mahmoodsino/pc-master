import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import {
  BranchesAtom,
  getInstockInfo,
  InStockInfoAtom,
  VariationAtom,
} from "../../../../helper";
import { RightSignIcon } from "../../../icons";

const Availablity = () => {
  const [barnches, setBranches] = useRecoilState(BranchesAtom);
  const [instockInfo, setInstockInfo] = useRecoilState(InStockInfoAtom);
  const router = useRouter().query;
  const [variationState, setVariationState] = useRecoilState(VariationAtom);

  useEffect(() => {
    const getData = async () => {
      if (router.product) {
        const res = await getInstockInfo(+router.product);
        console.log(res);

        setInstockInfo(res.result);
      }
    };
    getData();
  }, [router.product]);

  return (
    <div>
      <span className="flex  items-center ">
        <RightSignIcon className="w-7 h-7 mr-3" /> Available in store
      </span>
      <div className="flex flex-col">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="min-w-full border text-center">
                {/* <thead className="border-b">
                  <tr>
                    {barnches.map((branch) => {
                      return (
                        <th
                          scope="col"
                          className="text-sm font-medium text-gray-900 px-6 py-4 border-r w-[50%]"
                        >
                          {branch.name}
                        </th>
                      );
                    })}
                  </tr>
                </thead> */}
                <tbody>
                  {instockInfo.map((stock) => {
                    if (variationState.id === stock.variation_id) {
                      return (
                        <tr className="border-b w-[50%]">
                          <td className="text-sm text-gray-900 font-light   whitespace-nowrap border-r">
                            <div className="grid grid-cols-2">
                              <div className="border-r block h-full py-4 ">
                                {stock.branch_name}
                              </div>
                              {stock.in_stock === 1 ? (
                                <div className="py-4 flex justify-center items-center">
                                  <RightSignIcon className="w-4 h-4 mr-3" /> in
                                  Stock
                                </div>
                              ) : (
                                <div className="py-4 flex justify-center items-center">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    className="bi bi-slash-circle rotate-45 text-red-1000 mr-4"
                                    viewBox="0 0 16 16"
                                  >
                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                    <path d="M11.354 4.646a.5.5 0 0 0-.708 0l-6 6a.5.5 0 0 0 .708.708l6-6a.5.5 0 0 0 0-.708z" />
                                  </svg>
                                  out of Stock
                                </div>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    }
                    if (stock.variation_id === null) {
                      return (
                        <tr className="border-b w-[50%]">
                          <td className="text-sm text-gray-900 font-light   whitespace-nowrap border-r">
                            <div className="grid grid-cols-2">
                              <div className="border-r block h-full py-4 ">
                                {stock.branch_name}
                              </div>
                              {stock.in_stock === 1 ? (
                                <div className="py-4 flex justify-center items-center">
                                  <RightSignIcon className="w-4 h-4 mr-3" /> in
                                  Stock
                                </div>
                              ) : (
                                <div className="py-4 flex justify-center items-center">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    className="bi bi-slash-circle rotate-45 text-red-1000 mr-4"
                                    viewBox="0 0 16 16"
                                  >
                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                    <path d="M11.354 4.646a.5.5 0 0 0-.708 0l-6 6a.5.5 0 0 0 .708.708l6-6a.5.5 0 0 0 0-.708z" />
                                  </svg>
                                  out of Stock
                                </div>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    }
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Availablity;

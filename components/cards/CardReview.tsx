import Image from "next/image";
import Collapsible from "react-collapsible";
import { useRecoilState } from "recoil";
import { OrderDetailsAtom } from "../../helper";
import { BaseButton } from "../buttons";

const CardReview = () => {
  const [orderDetails, setOrderDetails] = useRecoilState(OrderDetailsAtom);

  return (
    <div>
      {orderDetails.items &&
        orderDetails.items.map((item) => {
          return (
            <div key={item.id} className="">
              <div className="flex flex-row   justify-between items-center sm:w-[100%] md:w-[90%] ">
                <div className="">
                  <div className="flex flex-row items-center ">
                    <span className="md:text-sm sm:text-xs text-gray-1050">
                      x{item?.quantity}
                    </span>
                    <div className="border w-20 h-20 ml-2 product-slider-img">
                      {item?.product?.image?.id ? (
                        <img
                          className="w-20 h-20 product-slider-img"
                          src={item.product?.image?.path}
                          alt=""
                        />
                      ) : (
                        <img src="/alternative.png" alt="" />
                      )}
                    </div>
                    <div className="flex  flex-col  md:w-64 md:text-sm space-y-0.5 sm:text-[13px] text-gray-1050 ml-2">
                      <span className="font-semibold block ">
                        {item.variation?.name}
                      </span>
                      <div className="w-[80%]">
                        {item.variation?.attributes?.map((attribute) => {
                          return (
                            <span className="" key={attribute?.id}>
                              {attribute?.attribute_values?.name},{" "}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <span className="md:text-xl font-medium">${item.price}</span>
                </div>
              </div>
              <div className="pb-5">
                {item.modifierGroups?.map((it,index) => {
                  return (
                    <Collapsible
                      key={index}
                      trigger={
                        <BaseButton className="flex justify-between bg-gray-1350 items-center w-[100%] border">
                          <span className="font-semibold">{it.name}</span>
                          <div className="space-x-3">
                            <span className="font-semibold">
                              ${it.total_price}
                            </span>
                            <svg
                              data-accordion-icon
                              className={`w-6 h-6 inline-block  `}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                clipRule="evenodd"
                              ></path>
                            </svg>
                          </div>
                        </BaseButton>
                      }
                    >
                      <div className="ml-5">
                        {it.modifiers.map((modi,index) => {
                          return (
                            <div
                              key={index}
                              className="space-x-3 mt-3 bg-cover"
                            >
                              <img
                                className="w-20 bg-cover"
                                src={modi.image}
                                alt="Picture of the author"
                              />
                            </div>
                          );
                        })}
                      </div>
                    </Collapsible>
                  );
                })}
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default CardReview;

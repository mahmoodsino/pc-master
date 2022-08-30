import Image from "next/image";
import Collapsible from "react-collapsible";
import { useRecoilState } from "recoil";
import { OrderDetailsAtom } from "../../helper";
import no_image from "../../public/assets/image/no_image.jpg";
import { BaseButton } from "../buttons";
import { v4 as uuidv4 } from "uuid";

const CardReview = () => {
  const [orderDetails, setOrderDetails] = useRecoilState(OrderDetailsAtom);
  return (
    <div>
      {orderDetails.items &&
        orderDetails.items.map((item) => {
          return (
            <div key={item.id} className="">
              <div
                
                className="flex flex-row   justify-between items-center sm:w-[100%] md:w-[90%] "
              >
                <div className="">
                  <div className="flex flex-row items-center ">
                    <span className="md:text-sm sm:text-xs text-gray-1050">
                      x{item.quantity}
                    </span>
                    <div className=" ml-2  w-36 ">
                      {item.variation?.images &&
                      item.variation?.images?.length > 0 ? (
                        <Image src={item.variation?.images[0]} />
                      ) : (
                        <Image src={no_image} />
                      )}
                    </div>
                    <div className="flex flex-col md:text-sm space-y-0.5 sm:text-[13px] text-gray-1050 ml-2">
                      <span className="font-semibold">
                        {item.variation?.name}
                      </span>
                      <div className="w-[80%]">
                        {item.variation?.attributes?.map((attribute) => {
                          return (
                            <span className="" key={attribute.id}>
                              {attribute.attribute_values.name},{" "}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <h1 className="md:text-xl font-medium">${item.price}</h1>
                </div>
              </div>
              <div className="pb-5">
              {item.modifierGroups?.map((it) => {
                    return (
                      <Collapsible
                      key={uuidv4()}
                        trigger={
                          <BaseButton className="flex justify-between items-center w-[100%] border">
                            <span className="font-semibold">{it.name}</span>
                            <div className="space-x-3">
                              <span className="font-semibold">${it.total_price}</span>
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
                          {it.modifiers.map(modi => {
                            return(
                              <div
                              key={uuidv4()}
                              className="space-x-3 mt-3 bg-cover"
                            >
                              <img
                                className="w-20 bg-cover"
                                src={modi.image}
                                alt="Picture of the author"
                              />
                            </div>
                            )
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

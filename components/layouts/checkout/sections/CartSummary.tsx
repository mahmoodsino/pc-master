import Collapsible from "react-collapsible";
import { useRecoilState } from "recoil";
import { AllCartsInfo } from "../../../../helper";
import { BaseButton } from "../../../buttons";
import { CartIcon } from "../../../icons";
import { v4 as uuidv4 } from "uuid";


const CartSummary = () => {
  const [allCartsInfo, setAllCartsInfo] = useRecoilState(AllCartsInfo);

  return (
    <div className="shadow-[0_0_10px_rgba(0,0,0,0.25)] sm:w-[100%] md:w-[60%] lg:w-[35%] h-fit rounded-md">
      <div className="md:pl-10 sm:pl-5 space-x-5 border-b py-8">
        <CartIcon className="text-black w-6 inline-block" />

        <h1 className="inline-block text-[20px] font-bold tracking-[0.03em]">
          Cart summary
        </h1>
      </div>
      {allCartsInfo.items.map((item) => {
        return (
          <div key={item.id} className="md:px-10 sm:px-5">
            <div className="flex flex-row justify-between sm:text-sm md:text-base my-5 mb-2">
              <span className=" tracking-[0.03em] font-semibold">
                {item.quantity}x {item.product?.name}
              </span>
              <span>${item.variation?.price}</span>
            </div>
            <span>{item.description}</span>
            {item.modifierGroups?.map((it) => {
                    return (
                      <Collapsible
                      key={uuidv4()}
                        trigger={
                          <BaseButton
                           className="flex justify-between items-center w-[100%] border">
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
            <div className="w-[90%] left-0 right-0 m-auto border-b my-8"></div>
          </div>
        );
      })}

      <div className="flex justify-end space-x-3 pr-10 mb-5">
        <span>Subtotal:</span>
        <span className="font-semibold">{allCartsInfo.total_price}$</span>
      </div>
    </div>
  );
};

export default CartSummary;

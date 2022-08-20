import { useRecoilState } from "recoil";
import { AllCartsInfo } from "../../../../helper";
import { CartIcon } from "../../../icons";

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

import {  useRecoilValue, useSetRecoilState } from "recoil";
import { BaseButton } from "../../../buttons/";
import { AddCardPaymentModel } from "./modals";
import {
  OpenPaymentModelAtom,
  PaymentAtom,
} from "../../../../helper/state/index";

export interface paymentType {
  CreditCard: string;
  CardholderName: string;
  ExpiryDate: string;
}

const PaymentMethod = () => {
  const paymentState = useRecoilValue(PaymentAtom);
  const setOpenPaymentModelState = useSetRecoilState(OpenPaymentModelAtom);

  return (
    <div className="sm:w-[100%] md:w-[65%]">
      <div className="w-[100%] mr-20 sm:px-5 md:px-10 shadow-[0_0_5px_rgba(0,0,0,0.12)] py-5">
        <h1 className="font-bold text-xl mt-5 mb-5">Payment Method</h1>
        <div className="space-y-1 text-sm">
          <div className="  md:space-x-10  flex md:flex-row sm:flex-col  ">
            <h1 className="text-gray-1100 w-[50%]  font-medium inline-block">
              Credit Card:
            </h1>
            <h1 className="inline-block   font-medium text-gray-950">
              {paymentState.CreditCard}
            </h1>
          </div>
          <div className="  md:space-x-10  flex md:flex-row sm:flex-col  ">
            <h1 className="text-gray-1100  w-[50%] font-medium inline-block">
              Cardholder Name:
            </h1>
            <h1 className="inline-block  font-medium text-gray-950">
              {paymentState.CardholderName}
            </h1>
          </div>
          <div className="  md:space-x-10  flex md:flex-row sm:flex-col  ">
            <h1 className="text-gray-1100  w-[50%] font-medium inline-block">
              Expiry Date:
            </h1>
            <h1 className="inline-block  font-medium text-gray-950">
              {paymentState.ExpiryDate}
            </h1>
          </div>
        </div>
      </div>
      <div className="flex justify-end mt-5">
        <BaseButton
          onClick={() => setOpenPaymentModelState(true)}
          className="font-medium px-7 py-2 bg-green-950 text-white rounded-full "
          title="Add"
        />
      </div>
      <AddCardPaymentModel />
    </div>
  );
};

export default PaymentMethod;

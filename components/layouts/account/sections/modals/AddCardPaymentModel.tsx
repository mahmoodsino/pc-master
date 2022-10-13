import { useState } from "react";
import { useRecoilState } from "recoil";
import { BaseButton } from "../../../../buttons";
import { OpenPaymentModelAtom } from "../../../../../helper/state";
import { BaseInput } from "../../../../inputs";

const AddCardPaymentModel = () => {
  const [openPaymentModelState, setOpenPaymentModelState] =
    useRecoilState(OpenPaymentModelAtom);
  const [cardNumber, setCardNumber] = useState<string>("");
  const [cardHolderName, setCardHolderName] = useState<string>("");
  const [cvv, setCvv] = useState("");
  const [expirationDate, setExpirationDate] = useState("");

  return (
    <div>
      <>
        <div
          className={`${
            openPaymentModelState ? "left-0 " : "-left-[200%] invisible"
          } inset-0 sm:w-[95%] rounded-xl bg-white md:w-[60%] lg:w-[40%] w-[50vw] h-fit left-0 right-0 top-0 bottom-0 mx-auto my-auto shadow-lg z-50 fixed transition-all duration-300 ease-in-out`}
        >
          <div className=" sm:px-5 md:px-16 py-10">
            <h1 className="text-xl font-bold text-gray-950  mb-10">
              Add Payment Method
            </h1>
            <form>
              <BaseInput
                className=""
                onChange={(e) => setCardNumber(e.target.value)}
                placeholder="Card Number"
                title="Card Number"
                value={cardNumber}
              />
              <BaseInput
                className=""
                onChange={(e) => setCardHolderName(e.target.value)}
                placeholder="Cardholder name"
                title="Cardholder name"
                value={cardHolderName}
              />

              <div className="flex sm:flex-col space-x-3 md:flex-row justify-between">
                <BaseInput
                  className=""
                  onChange={(e) => setCvv(e.target.value)}
                  placeholder="Cvv"
                  title="cvv"
                  value={cvv}
                />
                 <BaseInput
                  className=""
                  onChange={(e) => setExpirationDate(e.target.value)}
                  placeholder=""
                  title="Expiration Date"
                  type="date"
                  value={cvv}
                />

                
              </div>

              <div className="flex justify-between">
                <BaseButton
                  type="button"
                  onClick={() => setOpenPaymentModelState(false)}
                  className="px-6 py-2 border border-black font-medium "
                  title="Cancel"
                />
                <BaseButton
                  onClick={() => console.log("")}
                  className="px-6 py-2 border rounded-md bg-green-950 text-white font-medium "
                  title="Add"
                />
              </div>
            </form>
          </div>
        </div>
        {openPaymentModelState ? (
          <div className="opacity-25 fixed inset-0 z-40 bg-black "></div>
        ) : null}
      </>
    </div>
  );
};

export default AddCardPaymentModel;

import { useRecoilState } from "recoil";
import { ActiveBtnAccount } from "../../../../helper/state/index";
import {BaseButton} from "../../../buttons";

const MyAccountOptions = () => {
  const [btnAccount, setBtnAccount] = useRecoilState(ActiveBtnAccount);

  return (
    <div className="bg-white     flex  flex-col sm:w-[100%] md:w-[65%]   lg:w-[22%]   h-fit shadow-[0_0_5px_rgba(0,0,0,0.12)] lg:py-6 ">
      <BaseButton 
        onClick={() => setBtnAccount("myProfile")}
        className={`py-3 flex whitespace-nowrap lg:pl-3 px-2  border border-white ${
          btnAccount === "myProfile" || btnAccount === ""
            ? "font-bold  bg-gray-1350"
            : "font-medium hover:bg-gray-1350"
        }`}
        title="My Profile"
       />
       <BaseButton 
        onClick={() => setBtnAccount("addressBook")}
        className={`py-3 flex whitespace-nowrap lg:pl-3  px-2 border border-white ${
          btnAccount === "addressBook"
            ? "font-bold  bg-gray-1350"
            : "font-medium hover:bg-gray-1350"
        }`}
        title="Address book"
      />
      <BaseButton 
        onClick={() => setBtnAccount("paymentMethode")}
        className={`py-3 flex whitespace-nowrap lg:pl-3  px-2 border border-white ${
          btnAccount === "paymentMethode"
            ? "font-bold  bg-gray-1350"
            : "font-medium hover:bg-gray-1350"
        }`}
        title="Payment Method"
      />
  
     
    </div>
  );
};

export default MyAccountOptions;

import React from "react";
import { useRecoilValue } from "recoil";
import { Breadcrumbs } from "../../../breadcrumbs";
import { Searchbar } from "../../../header";
import { RightSignIcon } from "../../../icons";
import { Title2 } from "../../../titles";
import AddressBook from "./AddressBook";
import MyAccountOptions from "./MyAccountOptions";
import MyProfile from "./MyProfile";
import PaymentMethod from "./PaymentMethod";
import { SuccessEdit, ActiveBtnAccount } from "../../../../helper/state";

export type profile = {
  FirstName: string;
  LastName: string;
  Email: string;
};

const MainSection = () => {
  const editSuccess = useRecoilValue(SuccessEdit);
  const btnAccount = useRecoilValue(ActiveBtnAccount);
  return (
    <div>
      <Searchbar />
      <div className="md:ml-10 md:mt-5">
        <Breadcrumbs />
      </div>
      <div className="flex items-center justify-center">
        {editSuccess === "EditModel" || editSuccess === "EditSucsess" ? (
          <div className="text-white px-4 py-2 rounded-full  bg-green-950 mt-10 flex justify-center items-center">
            <RightSignIcon className="inline-block mr-2" />
            Your changes have been saved
          </div>
        ) : editSuccess === "addSucess" ? (
          <div className="text-white px-4 py-2 rounded-full  bg-green-950 mt-10 flex justify-center items-center">
            <RightSignIcon className="inline-block mr-2" />
            New address added successfully
          </div>
        ) : editSuccess === "deleteSusecc" ? (
          <div className="text-white px-4 py-2 rounded-full  bg-green-950 mt-10 flex justify-center items-center">
            <RightSignIcon className="inline-block mr-2" />
            Address deleted successfully
          </div>
        ) : (
          <div></div>
        )}
      </div>
      <Title2 title="MY Account" />
      <div className="lg:px-10 flex sm:flex-col lg:flex-row sm:justify-start sm:items-center sm:space-y-10 lg:justify-around mt-7  lg:mr-20">
        <MyAccountOptions />
        {btnAccount === "myProfile" ? (
          <MyProfile />
        ) : btnAccount === "addressBook" ? (
          <AddressBook />
        ) : btnAccount === "paymentMethode" ? (
          <PaymentMethod />
        ) : (
          <MyProfile />
        )}
      </div>
    </div>
  );
};

export default MainSection;

import React from "react";
import { AccountMainSection } from "../components/layouts";
import withAuth from "../helper/with-auth";

const account = () => {
  return (
    <div className="lg:px-10 2xl:px-24 lg:ml-4 my-16 2xl:container sm:px-[10px]">
      <AccountMainSection />
    </div>
  );
};

export default withAuth(account);

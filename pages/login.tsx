import React from "react";
import { LogInMainSection } from "../components/layouts";
import withAuth from "../helper/with-auth";

const login = () => {
  return (
    <div className="md:px-10 2xl:px-24 md:ml-4 2xl:container mt-10 sm:px-[10px]">
      <head>
        <title>Login</title>
      </head>
      <LogInMainSection />
    </div>
  );
};

export default withAuth(login);

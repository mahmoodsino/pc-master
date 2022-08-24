import type { NextPage } from "next";
import { HomeMainSection } from "../components/layouts";
import useProtectPurchaseCard from "../components/layouts/details/sections/ProtectPurchaseCard";

const Home: NextPage = () => {
  const {render} =useProtectPurchaseCard()
  return (
    <div className="2xl:container sm:px-[10px]">
      <head>
        <title>Home Page</title>
      </head>

      <HomeMainSection />
    </div>
  );
};

export default Home;

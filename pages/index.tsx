import type { NextPage } from "next";
import { HomeMainSection } from "../components/layouts";
import { SpinnerWithBack } from "../components/spinner";

const Home: NextPage = () => {
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

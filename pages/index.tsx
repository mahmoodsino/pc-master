import type { NextPage } from "next";
import { useRecoilState } from "recoil";
import { Notification } from "../components";
import { HomeMainSection } from "../components/layouts";
import { TokenAtom } from "../helper";


const Home: NextPage = () => {
  const [token,setToken]=useRecoilState(TokenAtom)
  return (
    <div className="2xl:container sm:px-[10px]">
      <head>
        <title>Home Page</title>
      </head>
      {/* {token.length>1 &&
      <Notification />
      } */}

      <HomeMainSection />
    </div>
  );
};

export default Home;

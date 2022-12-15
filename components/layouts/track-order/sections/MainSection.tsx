import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRecoilState, useRecoilValue } from "recoil";
import { getOrder, OrderAtom, TokenAtom } from "../../../../helper";
import { Breadcrumbs } from "../../../breadcrumbs";
import { Searchbar } from "../../../header";
import { Spinner } from "../../../spinner";
import { Title2 } from "../../../titles";
import Orders from "./Orders";

const MainSection = () => {
  const [orderState, setOrderState] = useRecoilState(OrderAtom);
  const token = useRecoilValue(TokenAtom);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const res = await getOrder(token);
      if (res === null) {
        toast.error("some thing went wrong");
      } else {
        setOrderState(res.result);
      }
      if (res) {
        setLoading(false);
      }
    };
    getData();
  }, []);

  return (
    <div>
      <Searchbar />
      <div className="md:ml-10 mt-5">
        <Breadcrumbs />
      </div>
      <div className="mt-10">
        <Title2 title="Track Orders" />
      </div>
      <div className="">
        <div className="   left-0 right-0 m-auto py-5 sm:w-[100%] md:w-[80%] lg:w-[60%]  overflow-auto shadow-[0_0_5px_rgba(0,0,0,0.12)] sm:px-2 md:px-5 text-gray-1050">
          {!loading ? (
            <div>
              <span className="font-bold block text-xl pt-5   ">My Orders</span>
              {orderState.length !== 0 ? (
                <Orders />
              ) : (
                <div>
                  <span>there are no order yet start </span>
                  <Link href="/shop">
                    <a className="font-bold hover:text-green-950 duration-300">
                      shopping
                    </a>
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <div className="flex justify-center items-center">
              <Spinner className="w-32 fill-green-950 mt-20" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MainSection;

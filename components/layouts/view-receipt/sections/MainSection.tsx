import { useEffect, useState } from "react";
import { Breadcrumbs } from "../../../breadcrumbs";
import { BaseButton } from "../../../buttons";
import { Searchbar } from "../../../header";
import { OrderReview } from "../../shared";
import { ProgressLine } from "../../../steper";
import { Title2 } from "../../../titles";
import OrderDetails from "./OrderDetails";
import PaymentInfo from "./PaymentInfo";
import ShippingAddress from "./ShippingAddress";
import { useRecoilState } from "recoil";
import {
  getOrderCratedOrder,
  OrderDetailsAtom,
  TokenAtom,
} from "../../../../helper";
import { useRouter } from "next/router";
import { Spinner } from "../../../spinner";

const MainSection = () => {
  const [progressPercentage, setProgressPercentage] = useState(35);
  const [orderDetails, setOrderDetails] = useRecoilState(OrderDetailsAtom);
  const [token, setToken] = useRecoilState(TokenAtom);
  const [loading, setLoading] = useState(false);

  const router = useRouter().query;

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      if (router.order) {
        const res = await getOrderCratedOrder(token, +router.order);
        setOrderDetails(res.data);
        if (res) {
          setLoading(false);
        }
      }
    };
    getData();
  }, [router.order]);

  return (
    <div>
      <Searchbar />
      {!loading ? (
        <div>
          <div className="md:ml-10 mt-5">
            <Breadcrumbs />
          </div>
          <div className="mt-10">
            <Title2 title={orderDetails.number} />
          </div>
          <h1 className="md:ml-10 text-xl font-bold text-gray-950 mt-8">
            Order Status
          </h1>
          <div className="md:w-[65%] flex flex-col justify-between left-0 right-0 m-auto">
            <div className="flex flex-row justify-between md:text-xl text-gray-950 mb-3">
              <h1>Placed</h1>
              <h1>Processing</h1>
              <h1>Delivered</h1>
            </div>
            <ProgressLine progressPercentage={progressPercentage} />
          </div>
          <div className="md:ml-10 flex lg:flex-row sm:flex-col sm:justify-center  lg:justify-between mt-10">
            <div className="lg:w-[55%] sm:w-[100%] flex flex-col">
              <OrderDetails />
              {/* <PaymentInfo /> */}
              <ShippingAddress />
            </div>
            <div className="lg:w-[41%] flex flex-col">
              <OrderReview gridForLargScreen="grid-cols-1" />
              <div className="mx-14">
                <div className="flex flex-col  mt-14 pb-10 md:text-lg text-gray-1050 space-y-10 border-b">
                  <div className="flex flex-row justify-between">
                    <span>Subtotal</span>
                    <span>${orderDetails.sub_total}</span>
                  </div>
                  <div className="flex flex-row justify-between">
                    <span>Shipping fee</span>
                    <span>${orderDetails.delivery_fee}</span>
                  </div>
                  <div className="flex flex-row justify-between">
                    <span>Tax</span>
                    <span>{orderDetails.tax}%</span>
                  </div>
                </div>
                <div className="flex sm:text-xl md:text-3xl text-gray-1150 flex-row justify-between mx-5 mt-5">
                  <span>TOTAL</span>
                  <span>${orderDetails.total}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center">
          <Spinner className="w-40 fill-green-950" />
        </div>
      )}
    </div>
  );
};

export default MainSection;

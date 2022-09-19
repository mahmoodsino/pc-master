import { useEffect, useState } from "react";
import { Breadcrumbs } from "../../../breadcrumbs";
import { Searchbar } from "../../../header";
import { OrderReview } from "../../shared";
import { ProgressLine } from "../../../steper";
import OrderDetails from "./OrderDetails";
import ShippingAddress from "./ShippingAddress";
import { useRecoilState } from "recoil";
import {
  getOrderCratedOrder,
  getPaymentProvidor,
  OrderDetailsAtom,
  TokenAtom,
} from "../../../../helper";
import { useRouter } from "next/router";
import { Spinner } from "../../../spinner";
import { BaseButton } from "../../../buttons";

interface PaymentProvider {
  public_key: string;
  id: number;
  name: string;
}

const MainSection = () => {
  const [progressPercentage, setProgressPercentage] = useState(35);
  const [orderDetails, setOrderDetails] = useRecoilState(OrderDetailsAtom);
  const [token, setToken] = useRecoilState(TokenAtom);
  const [loading, setLoading] = useState(false);
  const [paymentProvidorState, setPaymentProvidorState] = useState<
    PaymentProvider[]
  >([]);
  const [paymentProvidorId, setPaymenProvidorId] = useState<number>();
  console.log(orderDetails);
  

  const router = useRouter().query;

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      if (router.order) {
        const res = await getOrderCratedOrder(token, +router.order);
        console.log(res);

        setOrderDetails(res.result);
        if (res) {
          setLoading(false);
        }
      }
    };
    getData();
  }, [router.order]);

  useEffect(() => {
    const getData = async () => {
      const res = await getPaymentProvidor();
      console.log(res);
      setPaymentProvidorState(res.result.payment_providers);
    };
    getData();
  }, []);
  useEffect(() => {
    paymentProvidorState.map((providor) => {
      if (providor.name === "paypal") {
        setPaymenProvidorId(providor.id);
      }
    });
  }, [paymentProvidorState]);

  const { push } = useRouter();

  const handelpayForOrder = async () => {
    if (paymentProvidorId) {
      push({
        pathname: "/checkout",
        query: { savedOrder: encodeURI(orderDetails.id.toString()) },
      });
    }
  };

  const handelComletetheOrder = async () => {
    if (orderDetails.payment_transaction?.id) {
      push({
        pathname: "/checkout",
        query: {
          savedOrder: encodeURI(orderDetails.id.toString()),
          paymentTransaction: encodeURI(
            orderDetails.payment_transaction.id?.toString()
          ),
        },
      });
    }
  };
 

  return (
    <div>

    <div>
      <Searchbar />
      {!loading ? (
        <div>
          <div className="md:ml-10 mt-5">
            <Breadcrumbs />
          </div>
          <div className="mt-10">
            <div className="py-3 flex flex-row justify-between items-center md:px-10">
              <span className="md:text-[19px] sm:text-[15px] font-bold whitespace-nowrap">
                #{orderDetails.number}
              </span>
              {orderDetails.payment_transaction === null && (
                <span>status:{orderDetails.status}</span>
              )}
              {orderDetails.payment_transaction !== null && (
                <span>status:{orderDetails.payment_transaction?.status}</span>
              )}
            </div>
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
              {orderDetails.address === null ? null : <ShippingAddress />}
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
                {orderDetails.status!=="PAID" && (orderDetails.payment_transaction === null ? (
                  <div className="flex justify-between mx-5 mt-3">
                    <span className="font-semibold uppercase text-gray-1150 items-center">
                      pay for your order
                    </span>
                    <BaseButton
                      onClick={() => handelpayForOrder()}
                      className="px-4 py-1 bg-green-950 text-white rounded-full hover:bg-green-1000 "
                      title="pay"
                    />
                  </div>
                ) : orderDetails.payment_transaction?.can_completed ===
                  false ? (
                  <span className="px-5 font-bold text-lg">payment {orderDetails.payment_transaction?.status}</span>
                ) : orderDetails.payment_transaction?.can_completed ? (
                  <div className="flex justify-between mx-5 mt-3">
                    <span className="font-semibold uppercase text-gray-1150 items-center">
                    complete pay for your order
                    </span>
                    <BaseButton
                    onClick={() => handelComletetheOrder()}
                      className="px-4 py-1 bg-green-950 text-white rounded-full hover:bg-green-1000 "
                      title="complete"
                    />
                  </div>
                ) : null)}
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

    
    </div>
  );
};

export default MainSection;

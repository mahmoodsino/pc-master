import { useRecoilState } from "recoil";
import { OrderDetailsAtom } from "../../helper";

const CardReview = () => {
  const [orderDetails,setOrderDetails]=useRecoilState(OrderDetailsAtom)

  return (
    <div>
      {orderDetails.items && orderDetails.items.map(item => {
        return(

            <div key={item.id} className="flex flex-row border-b  pb-5 justify-between items-center sm:w-[100%] md:w-[90%] mb-5">
              <div className="">
                <div className="flex flex-row items-center ">
                  <span className="md:text-sm sm:text-xs text-gray-1050">x{item.quantity}</span>
                  <div className=" ml-2">{item.variation?.images && item.variation?.images[0]}</div>
                  <div className="flex flex-col md:text-sm space-y-2.5 sm:text-[13px] text-gray-1050 ml-2">
                    <span className="font-semibold">{item.product?.name}</span>
                    {item.variation?.attributes?.map(attribute => {
                      return(
                        <span key={attribute.id}>{attribute.name}:{attribute.attribute_values.name}</span>
                      )
                    })}
                  </div>
                </div>
              </div>
              <div>
                <h1 className="md:text-xl font-medium">${item.price}</h1>
              </div>
            </div>
        )
      })}
      
    </div>
  );
};

export default CardReview;

import Image from "next/image";
import { useRecoilState } from "recoil";
import { OrderDetailsAtom } from "../../helper";
import no_image from "../../public/assets/image/no_image.jpg";

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
                  <div className=" ml-2 mt-2 w-40">{item.variation?.images && item.variation?.images?.length>0 ? 
                <Image src={item.variation?.images[0]}/> : <Image src={no_image}/>  
                }</div>
                  <div className="flex flex-col md:text-sm space-y-0.5 sm:text-[13px] text-gray-1050 ml-2">
                    <span className="font-semibold">{item.variation?.name}</span>
                    <div className="w-[80%]">
                    {item.variation?.attributes?.map(attribute => {
                      return(
                        <span className="" key={attribute.id}>{attribute.attribute_values.name}, </span>
                      )
                    })}

                    </div>
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

import {BaseButton} from '../../../buttons';
import { v4 as uuidv4 } from 'uuid';
import { useRecoilState } from 'recoil';
import { getOrderCratedOrder, OrderAtom, TokenAtom} from '../../../../helper';
import { useRouter } from 'next/router';




const Orders = () => {
    const [orderState, setOrderState] = useRecoilState(OrderAtom)
    const [token, setToken] = useRecoilState(TokenAtom);

  const {push}=useRouter()

    const getOrdreDetails = async (id:number) => {

      push({
        pathname: "/viewreceipt",
        query: { order: encodeURI(id.toString()) },
      });
    }


  return (
    <div>
      {orderState.map((item) => {
            return (
              <div key={uuidv4()} className="border-b pb-5 mb-8 ">
                <div className="flex flex-row justify-between mb-5">
                  <div className=" space-x-10 sm:text-xs md:text-sm">
                    <div className="inline-block  ">
                      <h1 className=" font-bold mb-1">Order ID</h1>
                      <h1 className=" ">#{item.id}</h1>
                    </div>
                    <div className="inline-block">
                      <h1 className="font-bold mb-1">Status:</h1>
                      <h1>{item.status}</h1>
                    </div>
                  </div>
                  <div>
                    <h1 className="md:text-xl font-medium">${item.total}</h1>
                  </div>
                </div>
                <div className="flex flex-row justify-between sm:text-xs md:text-sm">
                  <div className="inline-block ">
                    {item.items.map(order => {
                      return(
                        <div key={order.id} className='text-left '>
                          <span className="">x{order.quantity} </span>
                          <span className="font-semibold"> {order.name}</span>

                        </div>
                      )
                    })}
                  </div>
                  <div>
                    <BaseButton onClick={() =>getOrdreDetails(item.id)} title="View receipt" className="underline"/>
                  </div>
                </div>
              </div>
            );
          })}
    </div>
  )
}

export default Orders

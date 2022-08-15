import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { getOrder, OrderAtom, TokenAtom } from '../../../../helper'
import { Breadcrumbs } from '../../../breadcrumbs' 
import {Searchbar} from '../../../header'
import { Spinner } from '../../../spinner'
import {Title2} from '../../../titles'
import Orders from './Orders'

const MainSection = () => {
  const [orderState, setOrderState] = useRecoilState(OrderAtom)
  const [token, setToken] = useRecoilState(TokenAtom);
  const [loading,setLoading]=useState(false)



  useEffect(() => {
    const getData= async ()=>{
      setLoading(true)
      const res = await getOrder(token)
      
      setOrderState(res.result)

      if(res){
        setLoading(false)
      }
    }
    getData()
  },[])


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
        <div className="scrollbar-thin scrollbar-thumb-green-950 scrollbar-track-gray-1250  overflow-y-scroll left-0 right-0 m-auto sm:w-[100%] md:w-[80%] lg:w-[60%] h-[400px] overflow-auto shadow-[0_0_10px_rgba(0,0,0,0.25)] sm:px-2 md:px-5 text-gray-1050">
          {!loading ? 
        <div>
            <h1 className="font-bold text-xl pt-5 pb-5  ">My Orders</h1>
            <Orders/>
        </div>  :
        <div className='flex justify-center items-center'>
          <Spinner className='w-32 fill-green-950 mt-20'/>
        </div>
        }
        </div>
      </div>
    </div>
  )
}

export default MainSection

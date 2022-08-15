import { useState } from 'react';
import {BaseCard} from '../../../cards';
import {Cheips} from '../../../inputs';
import { HomePageAtom } from '../../../../helper/state';
import { useRecoilState } from 'recoil';
import { v4 as uuidv4 } from 'uuid';



const BestSellersProducts = () => {
  const[bestCategorie,setBestCategorie]=useState("")
  const setItem = (setItem:string) =>{
    setBestCategorie(setItem)
  }
  const [homePageState,setHomePageState]=useRecoilState(HomePageAtom)

  



  return (
    <div>
        <div className="flex sm:flex-col space-y-3 lg:flex-row items-center sm:justify-start lg:justify-around my-10 pt-10">
          <div className="text-xl  font-bold leading-[30px] tracking-[0.055em] whitespace-nowrap	">
          Best Sellers
          </div>
                   {/* <Cheips categories={homePageState.featured_categories} setItem={setItem}/> */}

        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 md:grid-cols-3 my-5  lg:mx-10 xl:mx-10 mb-10">
          {/* {products.map((item) => {
            return (
              <BaseCard key={uuidv4()} image={item.img}  price={item.price}  description={item.decs} id={0} />
              
            );
          })} */}
        </div>
      </div>
  )
}

export default BestSellersProducts

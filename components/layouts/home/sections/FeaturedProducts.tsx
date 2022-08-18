import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import {  HomePageAtom, TokenAtom, WishListAtom } from '../../../../helper/state';
import {BaseCard} from '../../../cards';
import {Cheips, MobaiChips} from '../../../inputs';
import { v4 as uuidv4 } from 'uuid';
import { getfeaturedProducts, ProductsType } from '../../../../helper';




const FeaturedProducts = () => {
  
  const [homePageState,setHomePageState]=useRecoilState(HomePageAtom)
  const [featuredProducts,setFeaturedProducts]=useState<ProductsType[]>([])
  const [token, setToken] = useRecoilState(TokenAtom);
  const [wishList, setWishList] = useRecoilState(WishListAtom);


  

  const setItem = async (setItem:number) =>{
    const res = await getfeaturedProducts(token,setItem)
    setFeaturedProducts(res.result.items)
    
  }


  useEffect(() => {
    const getData = async () => {
      const res = await getfeaturedProducts(token)
      setFeaturedProducts(res.result.items)
    }
    getData()
  },[wishList])
  return (
    <div>
        <div className="flex sm:flex-col space-y-3 lg:flex-row items-center sm:justify-start lg:justify-between my-10 pt-10">
          <div className="text-xl  font-bold leading-[30px] tracking-[0.055em] whitespace-nowrap	">
          Featured Products
          </div>
          <div className="lg:w-[70%] lg:block sm:hidden whitespace-nowrap">
          <Cheips
            categories={homePageState.featured_categories}
            setItem={setItem}
          />
        </div>
        <div className="lg:hidden sm:block sm:w-[95%] whitespace-nowrap overflow-x-auto">
          <MobaiChips
            categories={homePageState.featured_categories}
            setItem={setItem}
          />
        </div>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 md:grid-cols-3 my-5 xl:mx-4  mb-10">
          {featuredProducts.map((item) => {
            return (
              <BaseCard key={uuidv4()}
              image={item.images}
              price={item.variation.price}
              description={item.short_description}
              id={item.id}
              variation={item.variation}
              in_wishlist={item.in_wishlist}
              />
              
            );
          })}
        </div>
      </div>
  )
}

export default FeaturedProducts

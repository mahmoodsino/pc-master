import { useRecoilState } from "recoil";
import {  ProductsAtom} from "../../../../helper/state";
import { BaseCard } from "../../../cards";
import { v4 as uuidv4 } from 'uuid';



const ShopProducts = () => {

  const [productsState,setProductsState]=useRecoilState(ProductsAtom)
  


  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 my-5 gap-2  lg:mx-10 xl:mx-10 mb-10">
      {productsState.map((item) => {
        return (
          <div key={uuidv4()}>
            <BaseCard name={item.name} image={item.images}  price={item.variation.price}  description={item.short_description} id={item.id} variation={item.variation} in_wishlist={item.in_wishlist}/>
          </div>
        );
      })}


      

    </div>
  );
};

export default ShopProducts;

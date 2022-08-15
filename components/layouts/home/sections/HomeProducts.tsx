import BestSellersProducts from "./BestSellersProducts";
import FeaturedProducts from "./FeaturedProducts";
import GREATDEALS from "./GREATDEALS";
import NewArrivalProducts from "./NewArrivalProducts";


export const categories = ["laptops", "Desktops", "phonse", "Monitors", "Accseeories"];
const Products = () => {
  return (
    <div>
      <NewArrivalProducts />
      <BestSellersProducts />
      <div className="h-[200px]">
        <GREATDEALS />
      </div>

      <FeaturedProducts />
    </div>
  );
};

export default Products;

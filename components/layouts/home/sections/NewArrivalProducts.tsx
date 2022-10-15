import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import {
  ErroreMessageAtom,
  HomePageAtom,
  OpenMessageModalAtom,
  SelectedBranchAtom,
  TokenAtom,
  WishListAtom,
} from "../../../../helper/state";
import { BaseCard } from "../../../cards";
import { Cheips, MobaiChips } from "../../../inputs";
import { v4 as uuidv4 } from "uuid";
import { getNewArraivalProducts, ProductsType } from "../../../../helper";
import { Spinner } from "../../../spinner";
import { toast } from "react-toastify";

const NewArrivalProducts = () => {
  const [newArrivalProducts, setNewArrivalProducts] = useState<ProductsType[]>(
    []
  );
  const [homePageState, setHomePageState] = useRecoilState(HomePageAtom);
  const [token, setToken] = useRecoilState(TokenAtom);
  const [wishList, setWishList] = useRecoilState(WishListAtom);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState<number>();
  const [selectedBranch, setSelectedBranch] =
    useRecoilState(SelectedBranchAtom);
  const [openMessageModal, setOpenMassegModal] =
    useRecoilState(OpenMessageModalAtom);
  const [wrongMessage, setWrrongMessage] = useRecoilState(ErroreMessageAtom);

  const setItem = async (setItem: number) => {
    setLoading(true);
    setSelected(setItem);
    const res = await getNewArraivalProducts(
      token,
      selectedBranch?.id,
      setItem
    );
    if (res === null) {
      setWrrongMessage("some thing went wrong");
      setOpenMassegModal(true);
    } else {
      setNewArrivalProducts(res.result.items);
    }
    setLoading(false);
  };

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const res = await getNewArraivalProducts(token, selectedBranch?.id);
      if (res === null) {
        toast.error("some thing went wrong");
      } else {
        setNewArrivalProducts(res.result.items);
      }

      setLoading(false);
    };
    if (selectedBranch?.id > 0) {
      getData();
    }
  }, [selectedBranch]);
  useEffect(() => {
    const getData = async () => {
      if (selectedBranch?.id) {
        const res = await getNewArraivalProducts(token, selectedBranch?.id);
        if (res === null) {
          toast.error("some thing went wrong");
        } else {
          setNewArrivalProducts(res.result.items);
        }
      }
    };
    if (selectedBranch?.id > 0 && token.length > 0) {
      getData();
    }
  }, [wishList]);

  return (
    <div>
      <div className="flex sm:flex-col space-y-3 lg:flex-row items-center sm:justify-start lg:justify-between ml-5 my-10 pt-10">
        <div className="text-xl  font-bold leading-[30px] tracking-[0.055em] whitespace-nowrap	mt-2">
          <span>New Arrivals</span>
        </div>
        <div className="lg:w-[82%] lg:block sm:hidden whitespace-nowrap">
          <Cheips
            categories={homePageState.featured_categories}
            setItem={setItem}
            selectedItem={selected}
          />
        </div>
        <div className="lg:hidden sm:block sm:w-[102%] whitespace-nowrap overflow-x-auto">
          <MobaiChips
            categories={homePageState.featured_categories}
            setItem={setItem}
            selectedItem={selected}
          />
        </div>
      </div>
      {!loading ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-2 md:grid-cols-3 my-5   xl:mx-4 mb-10">
          {newArrivalProducts?.map((item) => {
            return (
              <BaseCard
                name={item.name}
                key={uuidv4()}
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
      ) : (
        <div className="flex justify-center">
          <Spinner className="w-32 fill-green-950" />
        </div>
      )}
      {newArrivalProducts.length === 0 && !loading && (
        <div className="flex justify-center font-semibold">
          <p className="ml-3">ther are no products for that category now !</p>
        </div>
      )}
    </div>
  );
};

export default NewArrivalProducts;

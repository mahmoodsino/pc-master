import "../styles/globals.css";
import type { AppProps } from "next/app";
import { RecoilRoot, useRecoilState } from "recoil";
import { FixedNavbar, Navbar } from "../components/header";
import { Footer } from "../components/fotter";
import { MobileSidbar } from "../components/sidebar";
import {
  MutableRefObject,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  ActiveDropDownAtom,
  AllCartsInfo,
  AllWishListsInfoAtom,
  FetchedCartItemsAtom,
  getAddress,
  getCartItems,
  getCountries,
  getWishList,
  handelRegisterAsGuest,
  OpenAddNewAddressModalAtom,
  OpenEditAddressModalAtom,
  optionTypeCountry,
  registerCountryAtom,
  TokenAtom,
  WishListAtom,
} from "../helper";
import { addressatom } from "../components/layouts/account/sections/AddressBook";

interface Props {
  children: ReactNode;
}

let modifCountries: optionTypeCountry[] = [];

const App = ({ children }: Props) => {
  const [activeDropDown, setActiveDropDown] =
    useRecoilState(ActiveDropDownAtom);
  const [carts, setCarts] = useRecoilState(FetchedCartItemsAtom);
  const [wishList, setWishList] = useRecoilState(WishListAtom);
  const [allCartsInfo, setAllCartsInfo] = useRecoilState(AllCartsInfo);
  const [allWishListsInfo, setAllWishListInfo] =
    useRecoilState(AllWishListsInfoAtom);
  const [token, setToken] = useRecoilState(TokenAtom);
  const [registerCountry, setRegisterCountry] =
    useRecoilState(registerCountryAtom);

  const [address, setaddress] = useRecoilState(addressatom);
  const [openEditAddressModal, setOpenEditAddressModal] = useRecoilState(
    OpenEditAddressModalAtom
  );
  const [openAddNewAddressModal, setOpenAddNewAddressModal] = useRecoilState(
    OpenAddNewAddressModalAtom
  );
  const timerRef = useRef() as MutableRefObject<NodeJS.Timeout>;

  if (typeof window !== "undefined") {
    setToken(localStorage.getItem("token") || "");
  }
  useEffect(() => {
    const Data = async () => {
      const res = await handelRegisterAsGuest();
      if (res.result.token) {
        localStorage.setItem("token", res.result.token.access_token);
        localStorage.setItem("id", res.result.user.id);
        localStorage.setItem("email", res.result.user.email);
        localStorage.setItem("type", res.result.user.type);
        setToken(res.result.token.access_token);
      }
    };
    if (token.length === 0) {
      Data();
    }
  }, []);

  useEffect(() => {
    const getData = async () => {
      const res = await getCartItems(token);
      setAllCartsInfo(res.result);
      const response = await getWishList(token);
      setAllWishListInfo(response.result);
    };
    if (token.length > 1) {
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        getData();
      }, 1000);
    }
  }, [token, wishList]);

  useEffect(() => {
    const getData = async () => {
      const res = await getCartItems(token);
      setCarts(res.result.items);
      const response = await getWishList(token);
      setWishList(response.result.items);
    };
    if (token.length > 1) {
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        getData();
      }, 1000);
    }
  }, [token]);

  useEffect(() => {
    const getdata = async () => {
      const res = await getCountries();
      let modifiedResponse = res.result;
      modifiedResponse.map((item: { id: number; name: string }) => {
        let countreyValue = item.id.toString();

        let countreyLabel = item.name;
        let newCountriesStructur = {
          label: countreyLabel,
          value: countreyValue,
        };
        if (modifCountries.length < 250) {
          modifCountries.push(newCountriesStructur);
        }
      });
      setRegisterCountry(modifCountries);
    };
    getdata();
  }, []);

  useEffect(() => {
    const getData = async () => {
      const res = await getAddress(token);
      setaddress(res.result);
    };
    if (token.length > 1) {
      getData();
    }
  }, [openAddNewAddressModal, openEditAddressModal, token]);
  return (
    <div
      onClick={() => (activeDropDown ? setActiveDropDown(false) : null)}
      className="font-newFont min-h-[60vh]"
    >
      <div>{children}</div>
    </div>
  );
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      <RecoilRoot>
        <App>
          <div className="md:block sm:hidden">
            <FixedNavbar />
          </div>
          <Navbar />
          <MobileSidbar />
          <div className="min-h-[60vh]">
            <Component {...pageProps} />
          </div>
          <Footer />
        </App>
      </RecoilRoot>
    </div>
  );
}

export default MyApp;

import "../styles/globals.css";
import type { AppProps } from "next/app";
import { RecoilRoot, useRecoilState } from "recoil";
import { FixedNavbar, Navbar } from "../components/header";
import { Footer } from "../components/fotter";
import { MobileSidbar } from "../components/sidebar";
import { MutableRefObject, ReactNode, useEffect, useRef } from "react";
import {
  ActiveDropDownAtom,
  AllCartsInfo,
  AllWishListsInfoAtom,
  BranchesAtom,
  ErroreMessageAtom,
  FetchedCartItemsAtom,
  getAddress,
  getBranches,
  getCartItems,
  getCountries,
  getWishList,
  OpenAddNewAddressModalAtom,
  OpenEditAddressModalAtom,
  optionTypeCountry,
  registerCountryAtom,
  SelectedBranchAtom,
  TokenAtom,
  WishListAtom,
} from "../helper";
import { addressatom } from "../components/layouts/account/sections/AddressBook";
import ContinueAsGuest from "../components/layouts/details/sections/ContinueAsGuest";
import {toast, ToastContainer} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import { MessageModal } from "../components";

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
  const [barnches,setBranches]=useRecoilState(BranchesAtom)
  const [selectedBranch,setSelectedBranch]=useRecoilState(SelectedBranchAtom)
  const [wrongMessage,setWrrongMessage]=useRecoilState(ErroreMessageAtom)
  console.log(wrongMessage);
  

  if (typeof window !== "undefined") {
    setToken(localStorage.getItem("token") || "");
  }


  useEffect(() => {
      const getData = async () => {
        const res = await getBranches()
        if(res===null){
          toast.error("some thing went wrong")
        }else {
          setBranches(res.result.branches);
        }
      }
      getData()
  },[])

  useEffect(() => {
    const ba =localStorage.getItem("branch");
    if(ba){
      const branch =JSON.parse(ba)
      setSelectedBranch(branch)
    }else{
      setSelectedBranch(barnches[0])
    }
  },[barnches])





  useEffect(() => {
    const getData = async () => {
      const res = await getCartItems(token,selectedBranch?.id);
      if (res === null) {
      } else {
        setAllCartsInfo(res.result);
      }
      const response = await getWishList(token);
      if (response === null) {
      } else {
        setAllWishListInfo(response.result);
      }
    };
    if (token.length > 1&&selectedBranch.id) {
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        getData();
      }, 1000);
    }
  }, [token, wishList]);

  useEffect(() => {
    const getData = async () => {
      const res = await getCartItems(token,selectedBranch?.id);
      if (res === null) {
      } else {
        setCarts(res.result.items);
      }
      const response = await getWishList(token);
      if (response === null) {
      } else {
        setWishList(response.result.items);
      }
    };
    if (token.length > 1&&selectedBranch?.id) {
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        getData();
      }, 1000);
    }
  }, [token,selectedBranch]);

  useEffect(() => {
    const getdata = async () => {
      const res = await getCountries();
      if(res === null){
      }else{
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
      }
    };
    getdata();
  }, []);

  useEffect(() => {
    const getData = async () => {
      const res = await getAddress(token);
      if (res === null) {
      } else {
        setaddress(res.result);
      }
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
      {children}
      <ContinueAsGuest />
      <MessageModal message={wrongMessage} />

    </div>
  );
};

function MyApp({ Component, pageProps }: AppProps) {

  return (
    <div className="">
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

        <ToastContainer />

      </RecoilRoot>
    </div>
  );
}

export default MyApp;

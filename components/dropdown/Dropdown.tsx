import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useRecoilState } from "recoil";
import handelLogout from "../../helper/sever/users/logout/services";
import { ActiveDropDownAtom, TokenAtom } from "../../helper/state";
import { BaseButton } from "../buttons";

const Dropdown = () => {
  const [activeDropDown, setActiveDropDown] =
    useRecoilState(ActiveDropDownAtom);
  const [token, setToken] = useRecoilState(TokenAtom);
  const push = useRouter().push;

  const LogoutHandel = async () => {
    const res = await handelLogout(token);
    localStorage.removeItem("token");
    localStorage.removeItem("type");
    localStorage.removeItem("email");
    localStorage.removeItem("id");
    localStorage.removeItem("last_name");
    localStorage.removeItem("first_name");
    window.location.reload();
  };

  const useType = localStorage.getItem("type" || "");

  return (
    <div className="flex flex-col w-[170px]">
      {useType === "user" ? (
        <div className="">
          <Link onClick={() => setActiveDropDown(false)} href="/account">
            <a className="px-7 w-full py-3 border-b font-medium inline-block hover:bg-gray-1000 ">
              My Account
            </a>
          </Link>
          <Link onClick={() => setActiveDropDown(false)} href="/trackorder">
            <a className="px-7 w-full py-3 border-b font-medium inline-block hover:bg-gray-1000">
              Track Order
            </a>
          </Link>
          <BaseButton
            onClick={() => (LogoutHandel(), push("./"))}
            className="px-7 w-full py-3 text-left border-b font-medium inline-block hover:bg-gray-1000"
            title="Log out"
          ></BaseButton>
        </div>
      ) : useType==="guest" ? 
      <Link onClick={() => setActiveDropDown(false)} href="/trackorder">
      <a className="px-7 py-3 border-b font-medium inline-block hover:bg-gray-1000">
        Track Order
      </a>
    </Link> : null
    
    }
    </div>
  );
};

export default Dropdown;

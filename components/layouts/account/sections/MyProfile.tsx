import { useRecoilState } from "recoil";
import {EditModel} from "./modals/index";
import {ChangePassword} from "./modals";
import {BaseButton} from "../../../buttons";
import { keyIcon } from "../../../icons/Icons";
import { OpenEditModelAtom,ChangePassAtom, TokenAtom } from "../../../../helper/state";
import getUser from "../../../../helper/sever/users/user/services";
import { useEffect, useState } from "react";
import { UserInterface } from "../../../../helper/interfaces";

const MyProfile = () => {
  
  const [showEditModel, setShowEditModel] = useRecoilState(OpenEditModelAtom);
  const [showChangePassword, setShowChangePassword] =
    useRecoilState(ChangePassAtom);
  const[token,setToken]=useRecoilState(TokenAtom)
  const [userInfo,setUserInfo]=useState<UserInterface>({
    email:"",
    first_name:"",
    id:-1,
     img:"",
     last_name:""
  })

  let userType:string|null

  if( (typeof window !== 'undefined')) {
    userType = localStorage.getItem("type"|| "");

  }
    useEffect(() => {
      const getdata = async () => {

        const res = await getUser(token)
        setUserInfo(res.data)
      }
      if(userType==="user"){

        getdata()
      }
    },[showEditModel])




  return (
    <div className="sm:w-[100%] md:w-[65%]">
      <div className="w-[100%] mr-20 sm:px-5 md:px-10 shadow-[0_0_5px_rgba(0,0,0,0.12)] py-5">
        <h1 className="font-bold md:text-xl mt-5 mb-5">My Profile</h1>
        <div className="space-y-1 text-sm">
          <div className="  md:space-x-10  flex md:flex-row sm:flex-col  ">
            <h1 className="text-gray-1100 w-[30%] font-medium inline-block">
              First Name:
            </h1>
            <h1 className="inline-block font-medium text-gray-950">
              {userInfo.first_name}
            </h1>
          </div>
          <div className="  md:space-x-10  flex md:flex-row sm:flex-col  ">
            <h1 className="text-gray-1100 w-[30%] font-medium inline-block">
              Last Name:
            </h1>
            <h1 className="inline-block font-medium text-gray-950">
              {userInfo.last_name}
            </h1>
          </div>
          <div className="  md:space-x-10  flex md:flex-row sm:flex-col  ">
            <h1 className="text-gray-1100 w-[30%] font-medium inline-block">
              Email:
            </h1>
            <h1 className="inline-block font-medium text-gray-950">
              {userInfo.email}
            </h1>
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-between  items-center  mt-2">
        <div
          onClick={() => setShowChangePassword(true)}
          className="space-x-2  cursor-pointer"
        >
          {keyIcon}
          <h1 className="inline-block text-sm font-medium text-gray-950">
            Change Password
          </h1>
        </div>
        <BaseButton onClick={() =>setShowEditModel(true) } title="Edit" className="font-medium text-white px-7 py-2 rounded-md bg-green-950" />
      </div>
      <EditModel userInfo={userInfo} setUserInfo={setUserInfo} token={token}/>
      <ChangePassword />
    </div>
  );
};

export default MyProfile;

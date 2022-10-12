import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { getAbouUsInfo, getWorkingHours, SelectedBranchAtom } from "../../../../helper";

const MainSection = () => {
  const [aboutus, setAboutus] = useState("");
  const [workHours, setWorkHours] = useState({
    friday_close: "",
    friday_open: "",
    is_friday_closed: false,
    is_monday_closed: false,
    is_saturday_closed: false,
    is_sunday_closed: false,
    is_thursday_closed: false,
    is_tuesday_closed: false,
    is_wednesday_closed: false,
    monday_close: "",
    monday_open: "",
    saturday_close: "",
    saturday_open: "",
    sunday_close: "",
    sunday_open: "",
    thursday_close: "",
    thursday_open: "",
    tuesday_close: "",
    tuesday_open: "",
    wednesday_close: "",
    wednesday_open: "",
  });
  const [selectedBranch,setSelectedBranch]=useRecoilState(SelectedBranchAtom)

  useEffect(() => {
    const getData = async () => {
      const res = await getAbouUsInfo();
      if(res===null){

      }else{
        setAboutus(res.data);
      }
      const response = await getWorkingHours(selectedBranch.id);
      if(res===null){

      }else{
        setWorkHours(response);
      }
    };
    getData();
  }, []);
  

  return (
    <div>
      <div className="text-center text-[32px] font-bold tracking-[0.055em] mt-10">
        <span className=" ">About </span>
        <span className="text-green-950">PC Master</span>
        <div className="w-[72px] border border-black left-0 right-0 m-auto mt-3"></div>
      </div>
      <div className="my-16 sm:px-5 md:px-20 text-xl leading-[30px] tracking-[0.055em]">
        <span>{aboutus}</span>
      </div>

      <div
        className="left-0 right-0 m-auto bg-cover w-[80%] mb-20"
        style={{
          backgroundImage: `url(/assets/image/keybord.png)`,
        }}
      >
        <div className="ml-7">
          <h1 className="font-bold text-lg tracking-[0.055em]">
            Working Hours
          </h1>
          <div className="ml-5 mt-7 space-y-2">
            <span className="block">Monday:{workHours.is_monday_closed ? "closed" : `${workHours.monday_open} - ${workHours.monday_close}`}</span>
            <span className="block">Tuesday:{workHours.is_tuesday_closed ? "closed" : `${workHours.tuesday_open} - ${workHours.tuesday_close}`}</span>
            <span className="block">Wednesday:{workHours.is_wednesday_closed ? "closed" : `${workHours.wednesday_open} - ${workHours.wednesday_close}`}</span>
            <span className="block">Thursday:{workHours.is_thursday_closed ? "closed" : `${workHours.thursday_open} - ${workHours.thursday_close}`}</span>
            <span className="block">Friday: {workHours.is_friday_closed ? "closed" : `${workHours.friday_open} - ${workHours.friday_close}`}</span>
            <span className="block">Saturday:{workHours.is_saturday_closed ? "closed" : `${workHours.saturday_open} - ${workHours.saturday_close}`}</span>
            <span className="block">Sunday:{workHours.is_sunday_closed ? "closed" : `${workHours.sunday_open} - ${workHours.sunday_close}`}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainSection;

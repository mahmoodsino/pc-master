import Link from "next/link";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useRecoilState } from "recoil";
import { getServiesInfo, ServiesAtom } from "../../../../helper";
import {
  appleIcon,
  bigScreentabletIcon,
  repairIcon,
  smallScreenTabletIcon,
  solutionIcon,
} from "../../../icons/Icons";
import { Title } from "../../../titles";
import { ServiceCard } from "../elements";

const Mainsection = () => {
  const [servicesState, setServicesState] = useRecoilState(ServiesAtom);

  useEffect(() => {
    const getData = async () => {
      const res = await getServiesInfo();
      if(res===null){
        toast.error("some thing went wrong")
      }else{
        setServicesState(res.result);
      }

    };
    getData();
  }, []);

  return (
    <div>
      <div>
        <Title
          title="OUR SERVICES"
          desc="Quality, Service, Cleanliness, and Value"
        />

        <div className="">
          {servicesState.map((item) => {
            return (
              <div key={item.id} className="grid md:grid-cols-2 sm:grid-cols-1 pl-5 bg-gray-1350 lg:px-32">
                <div className="col-span-1 flex flex-col mt-10">
                  <ServiceCard
                    image={solutionIcon}
                    title={item.title}
                    desc={item.summary}
                  />
                  <div className="">
                    {/* <Link href="/services/itsolution">
                      <a className=" rounded-full border-2 ml-36 border-black px-4 py-1 font-bold">
                        {item.button}
                      </a>
                    </Link> */}
                  </div>
                </div>
                <div className="col-span-1">
                  <h1 className="py-14 pl-8 space-y-3">

                  {item.description}
                  </h1>
                  {/* <ul className="list-disc py-14 pl-8 space-y-3">
                    <li className="">Office computer system repair</li>
                    <li>Networking & cabling upgrades Data</li>
                    <li>backup, migration & recovery Computer</li>
                    <li>Computer & IT equipment supply Server</li>
                    <li>installation & maintenance</li>
                    <li>Virus Removal Trouble shooting</li>
                  </ul> */}
                </div>
              </div>
            );
          })}

          {/* <div className="flex flex-col mt-10">
            <ServiceCard
              image={repairIcon}
              title="Computer Repair"
              desc="We provide top-notch quality computer repair services"
            />
            <div className="">
              <Link href="/services/computerrepair">
                <a className=" rounded-full ml-36 border-2 border-black px-4 py-1 font-bold">
                  learn More
                </a>
              </Link>
            </div>
          </div> */}
          {/* <div className="col-span-1  py-14">
            <ul className="list-disc pl-8 space-y-3">
              <li className="">Water damage repair</li>
              <li>Motherboard/logic board replacement</li>
              <li>Data backup, migration & recovery</li>
              <li>Ram & hard drive upgrades</li>
              <li>Laptop screen repari/replacement</li>
              <li>hysical detailing</li>
              <li>Physical damage repair</li>
            </ul>
          </div> */}
          {/* <div className="flex flex-col mt-10">
            <ServiceCard
              image={appleIcon}
              title="Apple Repair Service"
              desc="Need to repair your bricked Macbook or iMac? No problem!"
            />
            <div className="">
              <Link href="/services/appleRepairs">
                <a className=" rounded-full border-2 ml-36 border-black px-4 py-1 font-bold">
                  learn More
                </a>
              </Link>
            </div>
          </div> */}
          {/* <div className="col-span-1 py-14">
            <ul className="list-disc pl-8 space-y-3">
              <li className="">Macbook/iMac repair</li>
              <li>Macbook/iMac Upgrades</li>
              <li>Macbook/iMac screen replacement</li>
              <li>Programs installation</li>
              <li>Mac password recovery</li>
              <li>Support & trouble shooting</li>
            </ul>
          </div> */}
          {/* <div className="flex flex-col my-10">
            <ServiceCard
              image={
                <div className="flex flex-row w-fit">
                  {bigScreentabletIcon}
                  {smallScreenTabletIcon}
                </div>
              }
              title="Tablet/Mobile Repair"
              desc="We provideYour Mobile or Tablet isn’t working or brokne? You want it to be repaired quickly? We can do it for you!"
            />
            <div className="">
              <Link href="/services/tabletmobilerepair">
                <a className=" rounded-full border-2 ml-36 border-black px-4 py-1 font-bold">
                  learn More
                </a>
              </Link>
            </div>
          </div> */}
          {/* <div className="col-span-1  py-14">
            <ul className="list-disc pl-8 space-y-3">
              <li className="">Water damage repair</li>
              <li>Sim & Password unlocking</li>
              <li>Broken screen repair</li>
              <li>Software updates</li>
              <li>iCloud unlocking </li>
              <li>Apple & Android account creation</li>
              <li>Support & trouble shooting</li>
            </ul>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Mainsection;

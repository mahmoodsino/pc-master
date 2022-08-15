import Link from "next/link";
import FacebookIcon from "../icons/FacebookIcon";
import InstagramIcon from "../icons/InstagramIcon";
import LetterIcon from "../icons/LetterIcon";
import LinkedInIcon from "../icons/LinkedInIcon";
import LocationIcon from "../icons/LocationIcon";
import PhoneIcon from "../icons/PhoneIcon";
import img1 from "../../public/assets/image/img1.png"
import light from "../../public/assets/image/light.png"
import Map from "../../public/assets/image/Map.png"
import Image from "next/image";
import { v4 as uuidv4 } from 'uuid';
import { useRecoilState } from "recoil";
import { ContactAtom, getContactInfo } from "../../helper";
import { useEffect } from "react";


export const routse = [
  { path: "/", name: "Home" },
  { path: "/shop", name: "shop" },
  { path: "/services", name: "services" },
  { path: "/about", name: "about" },
  { path: "/contact", name: "contact" },
];


const Footer = () => {

  const [contact,setContact]=useRecoilState(ContactAtom)

  useEffect(() => {
    const getData = async () => {
      const res =await   getContactInfo ()
      setContact(res);
      
    }
    getData()
  },[])
  return (
    <div className="bg-gray-1250">
      <div className="grid sm:grid-cols-1 md:grid-cols-3 2xl:container">
        <div className="col-span-1 sm:text-center md:text-left relative pb-8">
          <div className="h-[150px]  w-[200px]  opacity-70">
          <Image  src={light} />

          </div>
          <div className="absolute top-12">
          <Image src={img1} />

          </div>
          <h1 className="text-lg text-white ml-10">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sunt,
            velit.
          </h1>

          <div className="md:ml-5 sm:mr-16 text-white font-light">
            <div className="ml-9 mt-8 flex space-x-3">
              <LocationIcon className="text-white w-5" />
              <span className=" ">{contact.location}</span>
            </div>

            <div className="ml-9 mt-3 flex space-x-3">
              <PhoneIcon className="text-white  w-6" />
              <span className="">{contact.phone1}</span>
            </div>

            <div className="ml-9 mt-3 flex space-x-3">
              <LetterIcon className="text-white w-6" />
              <span className="">{contact.email}</span>
            </div>
          </div>
        </div>

        <div className="col-span-1 text-center">
          <h1 className="text-lg text-white font-normal mt-14">Slet Map</h1>
          <div className="mt-10 text-white">
            {routse.map((item) => {
              return (
                <div key={uuidv4()}>

                <Link
                  href={item.path}
                >
                  <a className="uppercase text-sm font-light hover:text-green-950">{item.name}</a>
                </Link>
                  <br />
                </div>
              );
            })}
          </div>
          <div className="mt-12 flex  w-fit left-0 right-0 mx-auto space-x-10">
            <span className="italic text-white">Follow us :</span>

            <div className="flex space-x-5">
              <InstagramIcon className="text-white w-6" />
              <FacebookIcon className="text-white w-4" />
              <LinkedInIcon className="text-white w-6" />
            </div>
          </div>
        </div>
        <div className="col-span-1 text-center  sm:flex sm:flex-col sm:justify-center items-center  ">
          <h1 className="mt-14 text-white">Find Us</h1>
          <div className="mt-10">
          <Image src={Map} />
          </div>
        </div>
      </div>
      <div className="text-center bg-gray-1450">
        <h1 className="text-xs text-white py-3">
          All CopyRights are Reserved @ 2022
        </h1>
      </div>
    </div>
  );
};

export default Footer;

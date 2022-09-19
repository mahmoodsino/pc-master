import Link from "next/link";
import { useRecoilState } from "recoil";
import { ContactAtom} from "../../../../helper";
import {
  FacebookIcon,
  InstagramIcon,
  LetterIcon,
  LinkedInIcon,
  LocationIcon,
  PhoneIcon,
} from "../../../icons";

const ContactInfoSection = () => {
  const [contact,setContact]=useRecoilState(ContactAtom)
  console.log(contact);
  


  return (
    <div>
      <div className="  absolute right-0 h-[100%] border sm:w-[25%] lg:w-[35%] bg-green-950"></div>
      <div className="absolute top-[10%] right-16 z-10 px-14 pr-40 bg-gray-1350 py-14">
        <h1 className="font-bold text-lg uppercase tracking-[0.055em]">
          contact Info :
        </h1>
        <div className="ml-1 mt-5 flex space-x-3">
          <LocationIcon className="text-black w-5 inline-block" />
          <span className=" font-light  ">{contact?.location}</span>
        </div>

        <div className="ml-1 mt-5 flex space-x-3">
          <PhoneIcon className="w-6" />

          <span className=" font-light  ">{contact?.phone1}</span>
        </div>

        <div className="ml-2 mt-5 flex space-x-3">
          <LetterIcon className="w-6" />
          <span className=" font-light  ">{contact?.email}</span>
        </div>
        <h1 className="font-semibold tracking-[0.055em] text-xl mt-10">
          Follow Us:
        </h1>
        <div className="flex space-x-3">
          <Link  href={contact.insta_link}>
          <a>
            <InstagramIcon className="text-black w-7" />
          </a>
          </Link>
          <Link href={contact.fb_link}>
            <a>
            <FacebookIcon className="text-black w-4" />
            </a>
          </Link>
          <Link href={contact.lin_link}>
            <a>
            <LinkedInIcon className="text-black w-7" />
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ContactInfoSection;

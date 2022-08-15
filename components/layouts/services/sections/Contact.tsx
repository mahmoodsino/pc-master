import {BaseButton} from "../../../buttons";
import { servicPhoneIcon } from "../../../icons/Icons";


const Contact = () => {
  return (
    <div className="flex sm:flex-col md:flex-row items-center md:text-base sm:text-xs  justify-around bg-green-1000 py-4 text-white">
      <div className="flex items-center md:space-x-7">
         {servicPhoneIcon}

          <h1 className=" ">
            Call us at (403)454.2096 or send us an email at jdfhjd@kfgkfjlf
          </h1>

      </div>
      <BaseButton onClick={() => console.log("")} title="contact us" className="px-5  rounded-full font-bold border-2"/>
    </div>
  );
};

export default Contact;

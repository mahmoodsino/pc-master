import {Title} from '../../../titles';
import Contact from './Contact';
import tablet from "/public/assets/image/tablet.png"
import Samsung from "/public/assets/image/Samsung.png"
import BlackBerry from "/public/assets/image/BlackBerry.png"
import Nokia from "/public/assets/image/Nokia.png"
import sony from "/public/assets/image/sony.png"
import nexus from "/public/assets/image/nexus.png"
import HTC from "/public/assets/image/HTC.png"
import Image from 'next/image';




const TabletMobileRepairMAinSection = () => {
  return (
    <div>
      <div>
        <Title
          title="Tablet & Mobile Repair"
          desc="We care for people and their tech devices. This is the reason our cutomers come before anything else"
        />
        <div className="grid md:grid-cols-2">
          <div className="col-span-1  ">
            <div className="lg:px-20 sm:px-3">
              <h1 className="text-[26px] tracking-[0.055em] font-medium">
                What Our Services Include?
              </h1>
              <div className="w-[72px] border sm:hidden lg:block border-black ml-[150px] mt-3 mb-16"></div>
              <span className="text-lg">
                We repair all brands of cell phones including iPhone, Samsung,
                Nokia, Motorolla, and more.{" "}
              </span>
              <div className="mt-10">
                <h1 className="text-2xl text-green-1000 font-medium mb-5">
                  Water damage repair
                </h1>
                <span className="lg:text-lg">
                  Water damage can cause problems with the internal circuitry of
                  your phone or other devices that can leave it unusable and
                  damaged. If you have accidentally dropped your phone in water,
                  REMOVE MOBILE’S BATTERY IMMEDIATLY and CALL US.
                </span>
              </div>
              <div className="mt-10">
                <h1 className="text-2xl text-green-1000 font-medium mb-5">
                  Broken Glass Repair
                </h1>
                <span className="lg:text-lg">
                  Devices with cracked screens can make it difficult to complete
                  even the simplest of tasks. Fortunately, PC MasterPro
                  specializes in the repair of cracked screens. Our technicians
                  have the knowledge and expertise to fix screens on devices of
                  all makes and models.
                </span>
              </div>
            </div>
          </div>
          <div className="sm:px-3 md:px-10 lg:px-20">
            <Image src={tablet} />
            <div className="mt-10">
              <h1 className="text-2xl text-green-1000 font-medium mb-5">
                Tablet Repairs
              </h1>
              <span className="lg:text-lg">
                Whether you have a broken glass, broken LCD, charging problems
                or your tablet won’t turn on, CALL US! We are professional and
                qualified to carry out such repairs to get it fixed up at the
                earliest.<br/> By using the highest quality replacement parts, we
                make sure that your device will work like new.<br/> We work on all
                leading tablets of different brands.
              </span>
            </div>
            <div className="mt-10">
              <h1 className="text-2xl text-green-1000 font-medium mb-5">
                SIM Unlocking
              </h1>
              <span className="lg:text-lg">
                We can unlock all makes and models of phones quickly and
                efficiently. This is also beneficial if you are visiting another
                country and want to use local sim card to avoid expensive
                roaming charges.
              </span>
            </div>
          </div>
        </div>
        <div className="flex  flex-row justify-evenly items-center w-[100vw] overflow-x-auto my-10 ">
          <div className="flex items-center">
            <Image className="" src={Samsung}/>
            <Image className="" src={BlackBerry}/>
          </div>
          <div className="flex items-center ">
          <Image className="" src={Nokia}/>
          <Image className="" src={sony}/>

          </div>
          <div className="flex items-center ">
          <Image src={nexus}/>
          <Image className="" src={HTC}/>
          </div>
        </div>
        <Contact/>
      </div>
    </div>
  )
}

export default TabletMobileRepairMAinSection

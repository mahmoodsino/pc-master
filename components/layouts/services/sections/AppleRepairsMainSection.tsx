import Image from 'next/image';
import {SpeedMeterIcon} from '../../../icons';
import {Title} from '../../../titles';
import apple1 from "/public/assets/image/apple1.png"
import apple2 from "/public/assets/image/apple2.png"



const AppleRepairsMainSection = () => {
  return (
    <div>
      <div>
        <Title
          title="Apple Repairs"
          desc="We understand Apple products, inside & outside"
        />
        <div className=" lg:px-10 py-20">
          <div className="flex md:flex-row sm:flex-col sm:px-2 justify-around">
            <div className="w-[55%]">
              <Image  src={apple1}/>
            </div>
            <div className=" lg:w-[28%] md:w-[40%] py-2">
              <h1 className="font-bold mb-7">Iphone/Ipad Repair</h1>
              <span>
                Screen shatter, batteries weaken.<br/> We know you probably live on
                your phone, which is why we offer fast screen and battery
                replacement on all iphone models. Typically repairs would be
                done at the same day
                <br />
              </span>
              <span>
                By using the highest quality replacement parts, we make sure
                that your device will work like new. We replace only those parts
                that are required to be replaced and will not burden you with
                the cost of repair that your iPad do not need.
              </span>
            </div>
          </div>

          <div className="flex sm:flex-col md:flex-row justify-around px-2 pt-10">
            <div className="lg:w-[28%] md:w-[40%] mt-5">
              <h1 className="font-bold mb-7">Mac Repair</h1>
              <span>
                Your Mac is likely one of your more valuable and more prized
                possessions. with it, you can creat amazing things.
                <br /> to do so, it have to work properly. this is where Pc
                MasterPro Mac repair service comes in.<br/> Dont hesitate we got you
                covered, we have perfect success rate in getting your Macbook
                back to life without losing any of your data.
                <br /> Get back to work right away with our Loaner program, so
                when you drop your Macbook for repair at PCMaster Pro, we can
                provide you with a Loaner laptop to continue your work.
              </span>
            </div>
            <div className="w-[55%]">
              <Image src={apple2} />
            </div>
          </div>
          <div className="flex sm:flex-col sm:justify-center sm:items-center  md:flex-row ,d:justify-around mt-14 sm:mx-2 md:mx-7">
            <div className=" items-center flex flex-col">
              <SpeedMeterIcon className="text-green-950"/>
              <h1 className="font-bold">Upgrade Your Mac</h1>
            </div>
            <div
              className="bg-cover md:w-[71%] "
              style={{
                backgroundImage: `url(/assets/image/apple3.png)`,
              }}
            >
              <h1 className="lg:text-lg w-[90%] left-0 right-0 m-auto mt-3 ">
                Perhaps you need more from your computer than you once did.
                Fortunately, most Macs are build to be upgraded, some are not
                (depending on model). We can install larger and faster hard
                drives (SSHD, SSD), more Ram, and newer MacOs.
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AppleRepairsMainSection

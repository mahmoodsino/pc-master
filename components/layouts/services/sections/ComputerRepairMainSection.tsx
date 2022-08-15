import Image from 'next/image';
import {Title} from '../../../titles';
import Contact from './Contact';
import computer1 from "/public/assets/image/computer1.png"
import computer2 from "/public/assets/image/computer2.png"




const ComputerRepairMainSection = () => {
  return (
    <div>
      <div>
        <Title
          title="Computer Repair"
          desc="We provide top-notch quality computer repair services"
        />
        <div className="grid md:grid-cols-2 lg:px-24 sm:px-3 mt-24">
          <div className="col-span-1 mb-14">
            <Image src={computer1} />
          </div>
          <div className="lg:w-[75%] md:ml-5 lg:ml-12 mt-[6%]">
            <span>
              A computer specialists responsibilities typically revolve around
              installing and repairing computer hardware and software. PC
              MasterPro meets with clients to identify their needs, examine and
              troubleshoot equipment, perform upgrades, and discuss the extent
              of repairs or replacements to clients.
              <br />
              <br />
              Computer technicians are responsible for maintaining
              organizations’ computers and providing in-service training to
              members of their staff.
              <br />
              <br />
              Our aim to minimize the problem from reoccurring and offers you
              low cost repair work that is essential for your computer needs
            </span>
          </div>
          <div className="lg:w-[80%] mb-14">
              <h1 className="font-semibold ">Our duties are:</h1>
              <ul className="list-disc ml-8 mt-4 text-sm font-light space-y-4">
                  <li>Paying close attention to the user’s description of their computer problem and asking questions to identify the problem and determine how to solve it</li>
                  <li> Training users on how the use of new hardware or software</li>
                  <li>Testing and evaluating the organization’s computer network</li>
                  <li>Troubleshooting network problems and individual user hardware or software problems</li>
                  <li>Setting up or repairing computer hardware and other associated devices such as printers and scanners</li>
              </ul>
          </div>
          <div className="mb-14 ">
            <Image src={computer2} />
          </div>
        </div>
      </div>
      <Contact/>
    </div>
  )
}

export default ComputerRepairMainSection

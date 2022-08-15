import Image from 'next/image';
import {Title} from '../../../titles';
import Contact from './Contact';
import it1 from "/public/assets/image/it1.png"
import it2 from "/public/assets/image/it2.png"




const ItSoulutonMainSecion = () => {
  return (
    <div>
      <div>
        <Title
          title="For every challenge, there’s an IT solution"
          desc="Whether its fixing, maintaining or supplying we can help your company"
        />
        <div className="grid md:grid-cols-2 md:px-10  lg:px-32">
          <div className="col-span-1 mb-14">
            <Image src={it1} />
          </div>
          <div className="lg:w-[65%] lg:mx-20 md:mx-5 mt-10">
            <span>
              For many years, IT support has been viewed as a necessary evil and
              recalls occasions when a techie has been called out to make
              something work. Perhaps equipment or a process that you don’t
              understand anyway! Support is byword for cost to most people.
              <br />
              <br />
              So what do we do differently? Well, we help each person no matter
              what computer or device they are working on. whether it’s a
              laptop, smart phone, tablet, or home computer.
            </span>
          </div>
          <div className="lg:w-[65%] lg:mx-20 md:mx-5 mt-10">
            <span>
              For many years, IT support has been viewed as a necessary evil and
              recalls occasions when a techie has been called out to make
              something work. Perhaps equipment or a process that you don’t
              understand anyway! Support is byword for cost to most people.
              <br />
              <br />
              So what do we do differently? Well, we help each person no matter
              what computer or device they are working on. whether it’s a
              laptop, smart phone, tablet, or home computer.
            </span>
          </div>
          <div className="col-span-1 mb-14">
            <Image src={it2} />
          </div>
        </div>
      </div>
      <Contact />
    </div>
  )
}

export default ItSoulutonMainSecion

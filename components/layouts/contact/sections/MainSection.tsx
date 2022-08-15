import {Title} from '../../../titles'
import ContactInfoSection from './ContactInfoSection'
import FormSection from './FormSection'

const MainSection = () => {
  return (
    <div>
      <Title
        title="Contact Us"
        desc="Feel free to reach us without any hesitation, we will be happy to serve you"
      />
      <div className="grid lg:grid-cols-2 sm:grid-cols-1 lg:px-20 sm:gap-5 mt-24 mb-24">
        

        <FormSection />
        <div className="col-span-1  relative h-[500px] ">
          <ContactInfoSection />
        </div>
      </div>
    </div>
  )
}

export default MainSection

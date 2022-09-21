import { Breadcrumbs } from '../../../breadcrumbs'
import {Searchbar} from '../../../header'
import {Title2} from '../../../titles'
import FormSection from './FormSection'

const MainSection = () => {
  return (
    <div>
      <Searchbar />
      <div className="md:p-10">
        <Breadcrumbs />
      </div>
      <div>
        <Title2 title="Register" />

        
        <div className="lg:px-[17%] md:px-[7%] sm:px-[4%]">
          <FormSection />

          
        </div>
      </div>
    </div>
  )
}

export default MainSection

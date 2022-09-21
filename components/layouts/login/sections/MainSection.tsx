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
      <Title2 title="Log In" />
      <div>
        <FormSection/>
      </div>
    </div>
  )
}

export default MainSection

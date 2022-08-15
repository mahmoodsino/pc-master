import { categoriesType, SliderType } from "../interfaces"

type  HomePage = {
    all_categories:categoriesType[],
    featured_categories:categoriesType[],
    slider:SliderType[]
}

export default HomePage
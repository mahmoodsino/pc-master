
interface categoriesType {
    id:number,
    name:string,
    parent_id:number,
    categories:categoriesType[]
  }
  
  export default categoriesType
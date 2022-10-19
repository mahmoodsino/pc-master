import BaseButton from "../buttons/BaseButton";
import { categoriesType } from "../../helper";

interface Props {
  categories: categoriesType[];
  setItem: (e: number) => void;
  selectedItem?:number

}
const Cheips = ({ categories,setItem,selectedItem }: Props) => {
  return (
    <ul className="space-x-3 flex items-center justify-start py-[5px]  sm:w-[100vw]  md:w-fit">
      {categories.map((item,i) => {
        return (
          <li key={i}>
            <BaseButton
              onClick={() => setItem(item.id)}
              className={` text-gray-1250 px-2 py-0.5 shadow-[0_0_4px_rgba(0,0,0,0.25)]  leading-[24px] tracking-[0.055em] font-semibold  border border-[#E5E5E5] hover:border-green-950 rounded-full ${item.id===selectedItem ? "border border-green-950 " : ""}`}
              title={`${item.name}`}
            />

          </li>
        );
      })}
    </ul>
  );
};
export default Cheips;

import BaseButton from "../buttons/BaseButton";
import { categoriesType } from "../../helper";
import { v4 as uuidv4 } from 'uuid';

interface Props {
  categories: categoriesType[];
  setItem: (e: number) => void;
}
const Cheips = ({ categories,setItem }: Props) => {
  return (
    <ul className="space-x-3 flex items-center justify-center p-[5px]  sm:w-[100vw]  md:w-fit">
      {categories.map((item) => {
        return (
          <li key={uuidv4()}>
            <BaseButton
              onClick={() => setItem(item.id)}
              className=" text-gray-1250 px-2 py-0.5 shadow-[0_0_4px_rgba(0,0,0,0.25)]  leading-[24px] tracking-[0.055em] font-semibold  border border-[#E5E5E5] hover:border-green-950 rounded-full"
              title={`${item.name}`}
            />

          </li>
        );
      })}
    </ul>
  );
};
export default Cheips;

import { useRouter } from "next/router";
import BaseButton from "../buttons/BaseButton";



const Breadcrumbs = () => {
  const push = useRouter().push
  const pathnames = useRouter().pathname.split("/").filter((x: string) => x);
  return (
    <div>
      <BaseButton  className="text-gray-1400 font-semibold tracking-[0.03em]"
        onClick={() => push("/")}
        title="HOME /"/>
     
      {pathnames.map((name: string, index: number) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
        const isLast = index === pathnames.length - 1;
        return isLast ? (
          <span
            className="font-semibold tracking-[0.03em] uppercase"
            key={name}
          >
            {" "}
            {name}
          </span>
        ) : (
          <BaseButton className="font-semibold text-gray-1400 uppercase tracking-[0.03em] !bg-white"
          key={name}
          onClick={() => push(routeTo)}
          title={`${name} /`}/>
        );
      })}
    </div>
  );
};

export default Breadcrumbs;

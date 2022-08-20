import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import { atom, useRecoilState } from "recoil";
import img1 from "../../public/assets/image/img1.png"
import { v4 as uuidv4 } from 'uuid';


export const routseWAuth = [
  { path: "/", name: "Home" },
  { path: "/shop", name: "shop" },
  { path: "/services", name: "services" },
  { path: "/about", name: "about"},
  { path: "/contact", name: "contact" },
  { path: "/login", name: "login" },
  { path: "/register", name: "register" },
];


export const goingUpAtom = atom<boolean>({
  key: "goingupatom",
  default: false,
});

const FixedNavbar = () => {
  const { pathname } = useRouter();

  const [goingUp, setGoingUp] = useRecoilState(goingUpAtom);

  const prevScrollY = useRef(0);
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > 350) {
        setGoingUp(true);
      }
      if (currentScrollY <= 350) {
        setGoingUp(false);
      }
      prevScrollY.current = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [goingUp]);

  return (
    <div
      className={
        !goingUp
          ? "hidden"
          : "down bg-white shadow-md fixed top-0 left-0 right-0 m-auto  z-[1000]"
      }
    >
      <div className="flex items-center 2xl:container">
        <div className=" w-[21%]">
          <Image src={img1}/>
        </div>
        <div className=" flex grow  justify-end gap-8    uppercase  font-bold leading-[21px] tracking-[0.03em]  text-sm ">
          {routseWAuth.map((item) => {
            return (
              <Link
              key={uuidv4()}
                href={item.path}
                
              >
                <a className={`h-fit px-2 py-1 rounded-xl ${
                  pathname.slice(1) !== item.path.slice(1)
                    ? "hover:bg-green-950 hover:text-white"
                    : "bg-green-950 text-white"
                } `}>{item.name}</a>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FixedNavbar;

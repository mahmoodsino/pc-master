import { ElementType, FC, useEffect, useState } from "react";
import { useRouter } from "next/router";

const withAuth =
  (WrappedPage: ElementType): FC =>
  ({ ...props }) => {
    const router = useRouter();
    const pathname = useRouter().pathname;
    const [user, setUser] = useState("");

    useEffect(() => {
      const checkToken = async () => {
        const userType = localStorage.getItem("type");

        setUser(userType || "");

        if (userType === null) {
          if (
            pathname === "/account" ||
            pathname === "/cart" ||
            pathname === "/wishlist"
          ) {
            router.push("/");
          }
        }
         else if (userType === null || userType === "guest") {
          if (pathname === "/account") {
            router.push("/");
          }
        }
         else {
          if (
            pathname === "/login" ||
            pathname === "/register" ||
            pathname === "/resetpassword"
          ) {
            router.push("/");
          }
        }
      };

      checkToken();
    }, []);

    return <WrappedPage {...props} />;
  };

export default withAuth;



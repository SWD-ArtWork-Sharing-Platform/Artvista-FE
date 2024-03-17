"use client";
import { useRouter } from "next/navigation";
import { PATH_ADMIN, PATH_AUTH, PATH_SHOP } from "@/routes/paths";
import useAuth from "@/hooks/useAuth";
import sweetAlert from "@/utils/sweetAlert";
import { getUserInfo } from "@/utils/utils";
import { Role } from "@/enums/accountRole";
import "./index.scss";

const getLocalStorage = (name: string) => {
  if (typeof window !== "undefined") {
    try {
      const value = localStorage.getItem(name);
      return value;
    } catch (error) {
      console.error("Error accessing localStorage:", error);
      return null;
    }
  } else {
    console.error("localStorage is not available on the server.");
    return null;
  }
};

const HeaderShopComponent = (props: {}) => {
  const router = useRouter();
  const { isAuthenticated, logout } = useAuth();
  const accessToken = getLocalStorage("accessToken");
  const user = getUserInfo();
  const userLogin = user ? JSON.parse(user) : null;

  return (
    <header className="home-title-animation mt-2 font-barlow mq450:gap-[0px_233px] mq750:gap-[0px_233px] mq1250:gap-[0px_233px] sticky top-[0] z-[99] flex w-10/12 max-w-full flex-row items-center justify-start gap-[0px_233px] pt-[10px] text-left text-21xl text-neutral-white">
      <h1
        className="header_title font-inherit relative m-0 cursor-pointer whitespace-nowrap text-inherit font-bold"
        onClick={() => {
          router.push("/");
        }}
      >
        Artvista
      </h1>
      <div className="flex max-w-full flex-1 flex-row items-center justify-end gap-[20px] text-3xl text-whte">
        <div className="flex flex-row">
          <div
            className="relative cursor-pointer font-semibold mr-7 header_links_hover"
            onClick={() => {
              router.push(PATH_SHOP.general.discover);
            }}
          >
            Discover
          </div>
          {accessToken &&
          userLogin &&
          userLogin.role &&
          userLogin.role.filter((role: any) => role == Role.ADMIN)[0] ? (
            <>
              <div
                className="relative cursor-pointer font-semibold mr-7 header_links_hover"
                onClick={() => {
                  router.push(PATH_ADMIN.dashboard);
                }}
              >
                Dashboard
              </div>
            </>
          ) : (
            <></>
          )}
          {!isAuthenticated && !accessToken ? (
            <>
              <div
                className="flex cursor-pointer flex-row items-center justify-center whitespace-nowrap rounded-full bg-primary-colour px-6 py-4 text-center text-base text-neutral-white"
                onClick={() => {
                  router.push(PATH_AUTH.signup);
                }}
              >
                <div className="relative font-semibold leading-[1px]">
                  Sign Up
                </div>
              </div>
              <div
                className="ms-6 flex cursor-pointer flex-row items-center justify-center whitespace-nowrap rounded-full bg-primary-colour px-6 py-4 text-center text-base text-neutral-white"
                onClick={() => {
                  router.push(PATH_AUTH.signin);
                }}
              >
                <div className="relative font-semibold leading-[1px]">
                  Sign In
                </div>
              </div>
            </>
          ) : (
            <>
              <div
                className="header_btn_hover flex cursor-pointer flex-row items-center justify-center whitespace-nowrap rounded-full bg-primary-colour px-6 py-4 text-center text-base text-neutral-white"
                onClick={() => {
                  logout();
                  sweetAlert.alertSuccess("Log Out Successfully", "", 1000, 22);
                }}
              >
                <div className="relative font-semibold leading-[1px]">
                  Log Out
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default HeaderShopComponent;

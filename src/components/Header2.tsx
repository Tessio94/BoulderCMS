"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { TransitionLink } from "./TransitionLink";
import LocalePicker from "./LocalePicker";
import { GrGallery } from "react-icons/gr";
import { MdEmojiEvents } from "react-icons/md";
import { IoMdHome } from "react-icons/io";
import { RiLoginBoxFill } from "react-icons/ri";
import { getUser } from "@/lib/serverFunctions/getUserAction";
import { QueryClient, useQuery, useQueryClient } from "@tanstack/react-query";

const Header2 = () => {
  const [scrolled, setScrolled] = useState(false);
  const [hambActive, setHambActive] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const pathname = usePathname();
  const locale = useLocale();
  const router = useRouter();
  const queryClient = useQueryClient();
  const t = useTranslations("Header");
  // console.log(pathname);
  let landingPage;

  if (
    (locale === "en" && pathname.split("/").length >= 3) ||
    (locale === "de" && pathname.split("/").length >= 4)
  ) {
    landingPage = false;
  } else {
    landingPage = true;
  }

  const hamb = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleHambClick = () => {
      setHambActive((prevState) => {
        const newState = !prevState;

        if (newState) {
          if (hamb.current) {
            hamb.current.classList.add("open");
          }
          setShowSidebar(true);
        } else {
          if (hamb.current) {
            hamb.current.classList.remove("open");
          }
          setShowSidebar(false);
        }

        return newState;
      });
    };

    const currentHamb = hamb.current;

    if (currentHamb) {
      currentHamb.addEventListener("click", handleHambClick);
    }

    return () => {
      if (currentHamb) {
        currentHamb.removeEventListener("click", handleHambClick);
      }
    };
  }, []);

  useEffect(() => {
    setShowSidebar(false);
    setHambActive(false);
    if (hamb.current) hamb.current.classList.remove("open");
  }, [pathname]);

  let firstName: string | undefined;
  let lastName: string | undefined;
  let userName: string | undefined;

  const { data, isLoading } = useQuery({
    queryKey: ["user", pathname],
    queryFn: getUser,
    refetchOnWindowFocus: false,
    refetchOnMount: true,
  });

  if (data) {
    ({ userName, firstName, lastName } = data);
  }

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/members/logout?allSessions=false", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) {
        throw new Error("Failed to logout");
      }

      // Clear client state (react-query cache, etc.)
      // queryClient.clear(); // if you are using react-query
      queryClient.invalidateQueries({ queryKey: ["user"] });
      router.push("/");
      // Redirect or refresh
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <header
      className={cn(
        "z-10 flex w-full max-w-[1920px] items-center justify-between bg-cyan-100/80 px-[20px] py-3 sm:px-[50px] lg:px-[60px] 2xl:px-[160px]",
        landingPage ? "absolute" : "relative",
      )}
    >
      <TransitionLink type="i18n" href="/">
        <Image
          className="logo"
          src="/header/logo3.svg"
          alt="Boulder logo"
          width={135}
          height={101}
        />
      </TransitionLink>

      <nav className="hidden lg:block">
        <ul className="3xl:gap-20 flex lg:gap-10 xl:gap-16">
          <li>
            <TransitionLink
              type="i18n"
              href="/"
              className={cn(
                "my-text-stroke relative cursor-pointer text-2xl font-extrabold capitalize after:absolute after:top-[100%] after:left-0 after:h-2 after:w-2 after:translate-x-0 after:rounded-full after:bg-amber-400 after:transition-all after:duration-500 after:content-[''] xl:text-3xl",
                locale === "en"
                  ? "hover:after:translate-x-[62px] hover:after:xl:translate-x-[80px]"
                  : "hover:after:translate-x-[66px] hover:after:xl:translate-x-[86px]",
                pathname === "/" || pathname === "/de"
                  ? "text-cyan-700/80"
                  : "text-cyan-900",
                pathname === "/" &&
                  "after:translate-x-[28px] after:xl:translate-x-[40px]",
                pathname === "/de" &&
                  "after:translate-x-[32px] after:xl:translate-x-[48px]",
              )}
            >
              {t("home")}
            </TransitionLink>
          </li>
          <li>
            <TransitionLink
              type="i18n"
              href="/events"
              className={cn(
                "my-text-stroke relative cursor-pointer text-2xl font-extrabold capitalize after:absolute after:top-[100%] after:left-0 after:h-2 after:w-2 after:translate-x-0 after:rounded-full after:bg-amber-400 after:transition-all after:duration-500 after:content-[''] hover:after:translate-x-[86px] xl:text-3xl hover:after:xl:translate-x-[108px]",
                pathname.split("/").includes("events")
                  ? "text-cyan-700/80 after:translate-x-[41px] after:xl:translate-x-[54px]"
                  : "text-cyan-900",
              )}
            >
              {t("events")}
            </TransitionLink>
          </li>
          <li>
            <TransitionLink
              type="i18n"
              href="/gyms"
              className={cn(
                "my-text-stroke relative cursor-pointer text-2xl font-extrabold capitalize after:absolute after:top-[100%] after:left-0 after:h-2 after:w-2 after:translate-x-0 after:rounded-full after:bg-amber-400 after:transition-all after:duration-500 after:content-[''] hover:after:translate-x-[64px] xl:text-3xl hover:after:xl:translate-x-[83px]",
                pathname.split("/").includes("gyms")
                  ? "text-cyan-700/80 after:translate-x-[32px] after:xl:translate-x-[44px]"
                  : "text-cyan-900",
              )}
            >
              {t("gyms")}
            </TransitionLink>
          </li>
          <li>
            <TransitionLink
              type="i18n"
              href="/gallery"
              className={cn(
                "my-text-stroke relative cursor-pointer text-2xl font-extrabold capitalize after:absolute after:top-[100%] after:left-0 after:h-2 after:w-2 after:translate-x-0 after:rounded-full after:bg-amber-400 after:transition-all after:duration-500 after:content-[''] xl:text-3xl",
                locale === "en"
                  ? "hover:after:translate-x-[88px] hover:after:xl:translate-x-[112px]"
                  : "hover:after:translate-x-[86px] hover:after:xl:translate-x-[110px]",
                pathname.split("/").includes("gallery") ||
                  pathname.split("/").includes("galerie")
                  ? "text-cyan-700/80 after:translate-x-[41px] after:xl:translate-x-[57px]"
                  : "text-cyan-900",
              )}
            >
              {t("gallery")}
            </TransitionLink>
          </li>
        </ul>
      </nav>

      <div className="ml-auto flex items-center lg:ml-0 lg:gap-4 xl:gap-10">
        {firstName && lastName ? (
          <div className="xsm:mr-3 relative mr-6 sm:mr-10 lg:mr-0">
            <div
              onClick={() => setShowProfile((prev) => !prev)}
              className="group flex aspect-square h-[38px] cursor-pointer items-center justify-center rounded-full border-2 border-amber-400 bg-cyan-900 text-amber-400 transition-all duration-300 hover:border-cyan-900 hover:bg-amber-400 hover:text-cyan-900 sm:h-[52px] sm:text-2xl lg:h-[32px] lg:text-sm xl:h-[36px] xl:text-lg"
            >
              {`${firstName.slice(0, 1).toUpperCase()}${lastName.slice(0, 1).toUpperCase()}`}
            </div>
            {showProfile && (
              <div className="absolute top-[100%] flex flex-col rounded-xl bg-cyan-900 text-amber-400">
                <div className="cursor-pointer rounded-t-xl border-2 border-b-[1px] border-amber-400 px-3 py-1 transition-all duration-300 hover:border-cyan-900 hover:border-b-amber-400 hover:bg-amber-400 hover:text-cyan-900">
                  Results
                </div>
                <div
                  onClick={handleLogout}
                  className="cursor-pointer rounded-b-xl border-2 border-t-[1px] border-amber-400 px-3 py-1 duration-300 hover:border-cyan-900 hover:border-t-amber-400 hover:bg-amber-400 hover:text-cyan-900"
                >
                  Logout
                </div>
              </div>
            )}
          </div>
        ) : (
          <TransitionLink
            type="i18n"
            className="my-text-stroke hidden items-center gap-3 rounded-2xl bg-cyan-900/10 px-2 py-[1px] text-2xl font-extrabold text-cyan-900/90 transition-all duration-500 hover:bg-cyan-900/30 focus:bg-cyan-900/30 active:bg-cyan-900/30 lg:flex xl:text-3xl"
            href="/login"
          >
            <Image
              src="/header/login.svg"
              alt="ikona za login"
              width={40}
              height={40}
              className="red"
            />
            {t("login")}
          </TransitionLink>
        )}

        <LocalePicker type="desktop" />
      </div>

      {/* Mobile hamb menu */}
      <LocalePicker type="mobile" />
      <div className="lg:hidden">
        <div
          id="nav-icon1"
          className="relative z-50 cursor-pointer text-3xl text-stone-100 lg:hidden"
          ref={hamb}
        >
          <span className="bg-cyan-900"></span>
          <span className="bg-cyan-900"></span>
          <span className="bg-cyan-900"></span>
        </div>
      </div>
      {/* Mobile navigation */}
      {/* translate-x-[-100%] */}
      <nav
        className={cn(
          "xsm:w-[260px] fixed top-[125px] bottom-0 left-0 z-50 flex w-[300px] flex-col justify-between bg-gradient-to-b from-cyan-200 to-amber-400 py-12 shadow-lg transition-all duration-300 sm:w-[330px] lg:hidden",
          scrolled ? "top-0" : "top-[125px]",
          showSidebar ? "translate-x-0" : "translate-x-[-100%]",
        )}
      >
        <ul className="flex flex-col text-2xl font-bold text-cyan-900">
          <li className="px-6 py-3 transition-all duration-300 hover:bg-cyan-900/10 focus:bg-cyan-900/10 active:bg-cyan-900/10">
            <TransitionLink
              type="i18n"
              href="/"
              className={cn(
                "flex items-center justify-between pr-12",
                pathname === "/" || pathname === "/de"
                  ? "text-cyan-700/80"
                  : "text-cyan-900",
              )}
            >
              {t("home")} <IoMdHome className="w-[32px] text-3xl" />
            </TransitionLink>
          </li>
          <li className="px-6 py-3 transition-all duration-300 hover:bg-cyan-900/10 focus:bg-cyan-900/10 active:bg-cyan-900/10">
            <TransitionLink
              type="i18n"
              href="/events"
              className={cn(
                "flex items-center justify-between pr-12",
                pathname.split("/").includes("events")
                  ? "text-cyan-700/80"
                  : "text-cyan-900",
              )}
            >
              {t("events")} <MdEmojiEvents className="w-[32px] text-3xl" />
            </TransitionLink>
          </li>
          <li className="px-6 py-3 transition-all duration-300 hover:bg-cyan-900/10 focus:bg-cyan-900/10 active:bg-cyan-900/10">
            <TransitionLink
              type="i18n"
              href="/gyms"
              className={cn(
                "flex items-center justify-between pr-12",
                pathname.split("/").includes("gyms")
                  ? "text-cyan-700/80"
                  : "text-cyan-900",
              )}
            >
              {t("gyms")}{" "}
              <Image
                src="/homepage/bouldering7.svg"
                alt="bouldering-icon"
                width={32}
                height={30}
              />
            </TransitionLink>
          </li>
          <li className="px-6 py-3 transition-all duration-300 hover:bg-cyan-900/10 focus:bg-cyan-900/10 active:bg-cyan-900/10">
            <TransitionLink
              type="i18n"
              href="/gallery"
              className={cn(
                "flex items-center justify-between pr-12",
                pathname === "/gallery" || pathname === "/de/galerie"
                  ? "text-cyan-700/80"
                  : "text-cyan-900",
              )}
            >
              {t("gallery")} <GrGallery className="w-[32px] text-2xl" />
            </TransitionLink>
          </li>
          <li className="border-t-2 border-cyan-900/30 px-6 py-3 transition-all duration-300 hover:bg-cyan-900/10 focus:bg-cyan-900/10 active:bg-cyan-900/10">
            <TransitionLink
              type="i18n"
              className={cn(
                "flex items-center justify-between pr-12",
                pathname === "/login" || pathname === "/de/login"
                  ? "text-cyan-700/80"
                  : "text-cyan-900",
              )}
              href="/login"
            >
              {t("login")}
              <RiLoginBoxFill className="w-[32px] text-3xl" />
            </TransitionLink>
          </li>
        </ul>
        <div className="flex flex-col items-start gap-8 border-t-2 border-cyan-900/30 px-6 pt-3">
          <div className="flex items-center gap-5">
            <a
              className="flex items-center gap-3 text-3xl font-extrabold text-cyan-900/90"
              href="https://www.facebook.com/dino.routesetter/"
              target="_blank"
            >
              <Image
                src="/landing/facebook.svg"
                alt="ikona za login"
                width={40}
                height={40}
                className="transition-all duration-500 hover:scale-110 focus:scale-110 active:scale-110"
              />
            </a>
            <a
              className="flex items-center gap-3 text-3xl font-extrabold text-cyan-900/90"
              href="https://www.instagram.com/dino.routesetting/"
              target="_blank"
            >
              <Image
                src="/landing/instagram.svg"
                alt="ikona za login"
                width={40}
                height={40}
                className="transition-all duration-500 hover:scale-110 focus:scale-110 active:scale-110"
              />
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header2;

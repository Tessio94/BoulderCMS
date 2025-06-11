"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import LocalePicker from "./LocalePicker";
import { GrGallery } from "react-icons/gr";
import { MdEmojiEvents } from "react-icons/md";
import { IoMdHome } from "react-icons/io";
import { RiLoginBoxFill } from "react-icons/ri";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [hambActive, setHambActive] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  const pathname = usePathname();
  const t = useTranslations("Header");

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

  return (
    <header className="absolute z-10 flex w-full max-w-[1920px] items-center justify-between bg-cyan-100/80 px-[20px] py-3 sm:px-[50px] lg:px-[60px] 2xl:px-[160px]">
      <Link href="/">
        <Image
          className="logo"
          src="/header/logo3.svg"
          alt="Boulder logo"
          width={135}
          height={101}
        />
      </Link>

      <nav className="hidden lg:block">
        <ul className="flex lg:gap-10 xl:gap-20">
          <li>
            <Link
              href="/"
              className={cn(
                "my-text-stroke relative cursor-pointer text-3xl font-extrabold capitalize after:absolute after:top-[100%] after:left-0 after:h-2 after:w-2 after:translate-x-0 after:rounded-full after:bg-amber-400 after:transition-all after:duration-500 after:content-[''] hover:after:translate-x-[89px]",
                pathname === "/" || pathname === "/de"
                  ? "text-cyan-700/80 after:translate-x-[48px]"
                  : "text-cyan-900",
              )}
            >
              {t("home")}
            </Link>
          </li>
          <li>
            <Link
              href="/events"
              className={cn(
                "my-text-stroke relative cursor-pointer text-3xl font-extrabold capitalize after:absolute after:top-[100%] after:left-0 after:h-2 after:w-2 after:translate-x-0 after:rounded-full after:bg-amber-400 after:transition-all after:duration-500 after:content-[''] hover:after:translate-x-[108px]",
                pathname === "/events" || pathname === "/de/events"
                  ? "text-cyan-700/80 after:translate-x-[54px]"
                  : "text-cyan-900",
              )}
            >
              {t("events")}
            </Link>
          </li>
          <li>
            <Link
              href="/gallery"
              className={cn(
                "my-text-stroke relative cursor-pointer text-3xl font-extrabold capitalize after:absolute after:top-[100%] after:left-0 after:h-2 after:w-2 after:translate-x-0 after:rounded-full after:bg-amber-400 after:transition-all after:duration-500 after:content-[''] hover:after:translate-x-[114px]",
                pathname === "/gallery"
                  ? "text-cyan-700/80 after:translate-x-[57px]"
                  : "text-cyan-900",
                pathname === "/de/gallery"
                  ? "text-cyan-700/80 after:translate-x-[60px] hover:after:translate-x-[112px]"
                  : "",
              )}
            >
              {t("gallery")}
            </Link>
          </li>
        </ul>
      </nav>

      <div className="my-text-stroke ml-auto flex items-center lg:ml-0 lg:gap-4 xl:gap-10">
        <Link
          className="hidden items-center gap-3 rounded-2xl bg-cyan-900/10 px-2 py-[1px] text-3xl font-extrabold text-cyan-900/90 transition-all duration-500 hover:bg-cyan-900/30 focus:bg-cyan-900/30 active:bg-cyan-900/30 lg:flex"
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
        </Link>
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
            <Link
              href="/"
              className={cn(
                "flex items-center justify-between pr-12",
                pathname === "/" ? "text-cyan-700/80" : "text-cyan-900",
              )}
            >
              {t("home")} <IoMdHome className="w-[32px] text-3xl" />
            </Link>
          </li>
          <li className="px-6 py-3 transition-all duration-300 hover:bg-cyan-900/10 focus:bg-cyan-900/10 active:bg-cyan-900/10">
            <Link
              href="/events"
              className={cn(
                "flex items-center justify-between pr-12",
                pathname === "/events" ? "text-cyan-700/80" : "text-cyan-900",
              )}
            >
              {t("events")} <MdEmojiEvents className="w-[32px] text-3xl" />
            </Link>
          </li>
          <li className="px-6 py-3 transition-all duration-300 hover:bg-cyan-900/10 focus:bg-cyan-900/10 active:bg-cyan-900/10">
            <Link
              href="/gallery"
              className={cn(
                "flex items-center justify-between pr-12",
                pathname === "/gallery" ? "text-cyan-700/80" : "text-cyan-900",
              )}
            >
              {t("gallery")} <GrGallery className="w-[32px] text-2xl" />
            </Link>
          </li>
          <li className="border-t-2 border-cyan-900/30 px-6 py-3 transition-all duration-300 hover:bg-cyan-900/10 focus:bg-cyan-900/10 active:bg-cyan-900/10">
            <Link
              className={cn(
                "flex items-center justify-between pr-12",
                pathname === "/login" ? "text-cyan-700/80" : "text-cyan-900",
              )}
              href="/login"
            >
              {t("login")}
              <RiLoginBoxFill className="w-[32px] text-3xl" />
            </Link>
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

export default Header;

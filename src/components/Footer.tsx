"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";

const Footer = () => {
  const t = useTranslations("Footer");
  return (
    <footer className="z-10 flex w-full max-w-[1920px] flex-col items-center justify-between gap-y-12 bg-cyan-100/40 px-[20px] py-16 sm:px-[50px] lg:px-[60px] xl:flex-row 2xl:px-[160px]">
      <a href="#">
        <Image
          className="logo"
          src="/header/logo3.svg"
          alt="Boulder logo"
          width={200}
          height={150}
        />
      </a>

      <div>
        <p className="flex items-center gap-5 text-2xl text-cyan-900">
          <Image
            className="rotate-"
            src="/homepage/bouldering3.svg"
            alt=""
            width={33}
            height={60}
          />
          <span className="text-center text-xl sm:text-2xl md:text-3xl">
            {t("text1")}
          </span>
          <Image
            src="/homepage/bouldering6.svg"
            alt=""
            width={43}
            height={60}
          />
        </p>
      </div>

      <div className="flex items-center gap-5">
        <a
          className="flex items-center gap-3 text-3xl font-extrabold text-cyan-900/90"
          href="https://www.facebook.com/dino.routesetter/"
          target="_blank"
        >
          <Image
            src="/landing/facebook.svg"
            alt="ikona za login"
            width={60}
            height={60}
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
            width={60}
            height={60}
            className="transition-all duration-500 hover:scale-110 focus:scale-110 active:scale-110"
          />
        </a>
      </div>
    </footer>
  );
};

export default Footer;

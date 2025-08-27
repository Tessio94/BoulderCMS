import { useTranslations } from "next-intl";
import Image from "next/image";
import React from "react";

const SubFooter = () => {
  const t = useTranslations("Footer");

  return (
    <footer className="z-10 flex items-center justify-center border-t-2 border-cyan-500 bg-cyan-100 py-5 xl:mx-40">
      <div className="xsm:px-3 flex w-full items-center justify-between gap-5 px-6 text-2xl text-cyan-900 sm:px-10 md:w-fit md:px-0">
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
        <Image src="/homepage/bouldering6.svg" alt="" width={43} height={60} />
      </div>
    </footer>
  );
};

export default SubFooter;

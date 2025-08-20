"use client";

import React from "react";
import * as motion from "motion/react-client";
import { containerVariants, listItemVariants } from "@/lib/animation";
import { TransitionLink } from "./TransitionLink";
import { useTranslations } from "next-intl";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "@/lib/serverFunctions/getUserAction";
import { usePathname } from "next/navigation";

const LandingIntro = () => {
  const t = useTranslations("Landing");
  const pathname = usePathname();

  let userName: string | undefined;

  const { data, isLoading } = useQuery({
    queryKey: ["user", pathname],
    queryFn: getUser,
    refetchOnWindowFocus: false,
    refetchOnMount: true,
  });

  if (data && !isLoading) {
    ({ userName } = data);
  }

  return (
    <>
      <motion.ul
        className="ml-7 flex list-disc flex-col gap-2"
        initial="hidden"
        animate="show"
        variants={containerVariants(0.2)}
      >
        <motion.li
          className="font-nunito text-xl text-cyan-900 xl:text-2xl"
          variants={listItemVariants}
        >
          {userName ? (
            <>
              {t("welcome")}{" "}
              <span className="text-2xl font-bold underline">{userName}</span>
            </>
          ) : (
            <span>{t("text1")}</span>
          )}
        </motion.li>
        <motion.li
          className="font-nunito text-xl text-cyan-900 xl:text-2xl"
          variants={listItemVariants}
        >
          {t("text2")}
        </motion.li>
        <motion.li
          className="font-nunito text-xl text-cyan-900 xl:text-2xl"
          variants={listItemVariants}
        >
          {t("text3")}
        </motion.li>
      </motion.ul>
      <motion.div
        className="flex gap-4"
        initial={{ y: 100, opacity: 0 }}
        animate={{
          y: 0,
          opacity: 1,
          transition: { duration: 0.4, delay: 0.4 },
        }}
      >
        <TransitionLink
          type="i18n"
          href="/register"
          className="b-cyan-900 group cursor-pointer rounded-lg border-2 border-cyan-900 bg-amber-400 px-4 py-2 text-xl text-cyan-900 transition-all duration-500 hover:border-amber-400 hover:bg-cyan-900 hover:text-amber-400 focus:border-amber-400 focus:bg-cyan-900 focus:text-amber-400 active:border-amber-400 active:bg-cyan-900 active:text-amber-400 xl:text-2xl"
        >
          <span className="relative after:absolute after:top-[105%] after:left-0 after:h-0.5 after:w-0 after:bg-amber-400 after:transition-all after:duration-500 after:content-[''] group-hover:after:w-full group-focus:after:w-full group-active:after:w-full">
            {userName ? t("results") : t("button1")}
          </span>
        </TransitionLink>
        <TransitionLink
          type="i18n"
          href="/events/#events"
          className="group cursor-pointer rounded-lg border-2 border-amber-400 bg-cyan-900 px-4 py-2 text-xl text-amber-400 transition-all duration-500 hover:border-cyan-900 hover:bg-amber-400 hover:text-cyan-900 focus:border-cyan-900 focus:bg-amber-400 focus:text-cyan-900 active:border-cyan-900 active:bg-amber-400 active:text-cyan-900 xl:text-2xl"
        >
          <span className="relative after:absolute after:top-[105%] after:left-0 after:h-0.5 after:w-0 after:bg-cyan-900 after:transition-all after:duration-500 after:content-[''] group-hover:after:w-full group-focus:after:w-full group-active:after:w-full">
            {t("button2")}
          </span>
        </TransitionLink>
      </motion.div>
    </>
  );
};

export default LandingIntro;

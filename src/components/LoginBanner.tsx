"use client";

import { useTranslations } from "next-intl";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "@/i18n/navigation";

const LoginBanner = () => {
  const t = useTranslations("LoginBanner");

  const ref1 = useRef(null);
  const ref2 = useRef(null);

  const isInView1 = useInView(ref1, { once: true, amount: 0.3 });
  const isInView2 = useInView(ref2, { once: true, amount: 0.3 });

  return (
    <div className="relative h-[800px] w-full overflow-hidden bg-[url('/homepage/boulder_1920.jpg')]">
      <div className="xsm:p-6 absolute top-[50%] left-[50%] flex w-[800px] max-w-[90%] translate-x-[-50%] translate-y-[-50%] flex-col items-center gap-10 p-10 lg:w-[unset]">
        <div className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-b from-cyan-200/50 via-cyan-200/60 to-amber-400/50 shadow-2xl shadow-amber-400/40 backdrop-blur-md"></div>
        <motion.h5
          className="mb-4 text-center text-3xl text-cyan-900 md:mb-10 md:text-start md:text-4xl"
          ref={ref1}
          initial={{ y: 100, opacity: 0 }}
          animate={
            isInView1
              ? { y: 0, opacity: 1, transition: { duration: 0.4 } }
              : "hidden"
          }
        >
          {t("title")}
        </motion.h5>
        <p className="text-xl text-cyan-900 md:text-2xl">{t("text1")}</p>
        <motion.div
          className="flex items-center gap-10"
          ref={ref2}
          initial={{ y: 100, opacity: 0 }}
          animate={
            isInView2
              ? { y: 0, opacity: 1, transition: { duration: 0.4 } }
              : "hidden"
          }
        >
          <Link
            href="/register"
            className="b-cyan-900 group cursor-pointer rounded-lg border-2 border-cyan-900 bg-amber-400 px-4 py-2 text-cyan-900 transition-all duration-500 hover:border-amber-400 hover:bg-cyan-900 hover:text-amber-400 focus:border-amber-400 focus:bg-cyan-900 focus:text-amber-400 active:border-amber-400 active:bg-cyan-900 active:text-amber-400"
          >
            <span className="xsm:text-lg relative text-xl after:absolute after:top-[100%] after:left-0 after:h-0.5 after:w-0 after:bg-amber-400 after:transition-all after:duration-500 after:content-[''] group-hover:after:w-full group-focus:after:w-full group-active:after:w-full sm:text-2xl">
              {t("button1")}
            </span>
          </Link>
          <Link
            href="/events"
            className="group cursor-pointer rounded-lg border-2 border-amber-400 bg-cyan-900 px-4 py-2 text-amber-400 transition-all duration-500 hover:border-cyan-900 hover:bg-amber-400 hover:text-cyan-900 focus:border-cyan-900 focus:bg-amber-400 focus:text-cyan-900 active:border-cyan-900 active:bg-amber-400 active:text-cyan-900"
          >
            <span className="xsm:text-lg relative text-xl after:absolute after:top-[100%] after:left-0 after:h-0.5 after:w-0 after:bg-cyan-900 after:transition-all after:duration-500 after:content-[''] group-hover:after:w-full group-focus:after:w-full group-active:after:w-full sm:text-2xl">
              {t("button2")}
            </span>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginBanner;

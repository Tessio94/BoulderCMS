"use client";

import { useTranslations } from "next-intl";
import { motion, useInView } from "framer-motion";
import { containerVariants, listItemVariants } from "@/lib/animation";
import { useRef } from "react";
import Image from "next/image";

const Competition = () => {
  const t = useTranslations("Competition");

  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);

  const isInView1 = useInView(ref1, { once: true, amount: 0.3 });
  const isInView2 = useInView(ref2, { once: true, amount: 0.3 });
  const isInView3 = useInView(ref3, { once: true, amount: 0.3 });

  return (
    <section className="relative mb-[90px] px-[20px] pt-[50px] sm:px-[50px] lg:px-[60px] lg:pt-[80px] 2xl:px-[160px]">
      <Image
        className="absolute z-[-10] hidden w-[150] md:top-[-300px] lg:left-[60px] lg:block lg:w-[250] xl:top-[0px] 2xl:left-[160px]"
        src="/homepage/bouldering.svg"
        alt=""
        width={250}
        height={155}
      />
      <Image
        className="absolute z-[-10] hidden w-[110px] md:top-[-300px] lg:right-[60px] lg:block lg:w-[180] xl:top-[0px] 2xl:right-[160px]"
        src="/homepage/bouldering1.svg"
        alt=""
        width={180}
        height={176}
      />
      <h4 className="my-text-stroke mb-[30px] text-center text-4xl text-cyan-900 sm:text-5xl lg:mb-[130px] xl:mb-[110px] xl:text-6xl">
        {t("title")}
      </h4>
      <div className="xsm:gap-[30px] flex w-full items-center justify-between gap-[55px] sm:gap-[80px] lg:min-h-[450px] lg:flex-col lg:justify-start">
        <div className="xsm:ml-[20px] relative ml-[30px] flex w-[5px] flex-col items-center gap-68 bg-amber-400 lg:ml-0 lg:h-[5px] lg:w-[80%]">
          <div className="xsm:h-[40px] xsm:w-[40px] xsm:text-2xl flex h-[60px] w-[60px] items-center justify-center rounded-full bg-amber-400 text-3xl font-bold text-cyan-900 lg:absolute lg:top-[50%] lg:left-0 lg:translate-y-[-50%]">
            1
          </div>
          <div className="xsm:h-[40px] xsm:w-[40px] xsm:text-2xl flex h-[60px] w-[60px] items-center justify-center rounded-full bg-amber-400 text-3xl font-bold text-cyan-900 lg:absolute lg:top-[50%] lg:left-[50%] lg:translate-x-[-50%] lg:translate-y-[-50%]">
            2
          </div>
          <div className="xsm:h-[40px] xsm:w-[40px] xsm:text-2xl flex h-[60px] w-[60px] items-center justify-center rounded-full bg-amber-400 text-3xl font-bold text-cyan-900 lg:absolute lg:top-[50%] lg:right-0 lg:translate-y-[-50%]">
            3
          </div>
        </div>
        <div className="relative flex flex-col gap-8 lg:w-[75%] 2xl:w-[80%]">
          <div className="1_5xl:w-[400px] flex h-[300px] flex-col items-center justify-start gap-8 rounded-2xl bg-cyan-900/10 p-6 text-cyan-900 shadow-lg shadow-cyan-900/50 lg:absolute lg:left-0 lg:w-[280px] lg:translate-x-[-50%] xl:w-[300px]">
            <p className="text-3xl">{t("step1.title")}</p>
            <motion.div
              className="flex w-full flex-col gap-5"
              ref={ref1}
              initial="hidden"
              animate={isInView1 ? "show" : "hidden"}
              variants={containerVariants(0)}
            >
              <motion.p
                className="xsm:text-lg text-xl"
                variants={listItemVariants}
              >
                &#x2022; {t("step1.bullet1")}
              </motion.p>
              <motion.p
                className="xsm:text-lg text-xl"
                variants={listItemVariants}
              >
                &#x2022; {t("step1.bullet2")}
              </motion.p>
            </motion.div>
          </div>
          <div className="1_5xl:w-[400px] flex h-[300px] flex-col items-center justify-start gap-8 rounded-2xl bg-cyan-900/10 p-6 text-cyan-900 shadow-lg shadow-cyan-900/50 lg:absolute lg:left-[50%] lg:w-[280px] lg:translate-x-[-50%] xl:w-[300px]">
            <p className="text-3xl">{t("step2.title")}</p>
            <motion.div
              className="flex w-full flex-col gap-5"
              ref={ref2}
              initial="hidden"
              animate={isInView2 ? "show" : "hidden"}
              variants={containerVariants(0.5)}
            >
              <motion.p
                className="xsm:text-lg text-xl"
                variants={listItemVariants}
              >
                &#x2022; {t("step2.bullet1")}
              </motion.p>
              <motion.p
                className="xsm:text-lg text-xl"
                variants={listItemVariants}
              >
                &#x2022; {t("step2.bullet2")}
              </motion.p>
            </motion.div>
          </div>
          <div className="1_5xl:w-[400px] xsm:h-fit flex h-[300px] min-h-fit flex-col items-center justify-start gap-8 rounded-2xl bg-cyan-900/10 p-6 text-cyan-900 shadow-lg shadow-cyan-900/50 lg:absolute lg:right-0 lg:w-[280px] lg:translate-x-[50%] xl:w-[300px]">
            <p className="text-3xl">{t("step3.title")}</p>
            <motion.div
              className="flex w-full flex-col gap-5"
              ref={ref3}
              initial="hidden"
              animate={isInView3 ? "show" : "hidden"}
              variants={containerVariants(1.0)}
            >
              <motion.p
                className="xsm:text-lg text-xl"
                variants={listItemVariants}
              >
                &#x2022; {t("step3.bullet1")}
              </motion.p>
              <motion.p
                className="xsm:text-lg text-xl"
                variants={listItemVariants}
              >
                &#x2022; {t("step3.bullet2")}
              </motion.p>
              <motion.p
                className="xsm:text-lg text-xl"
                variants={listItemVariants}
              >
                &#x2022; {t("step3.bullet3")}
              </motion.p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Competition;

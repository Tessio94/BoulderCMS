"use client";

import { useTranslations } from "next-intl";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { containerVariants, cardsGalleryVariants } from "@/lib/animation";

const Cards = () => {
  const t = useTranslations("Cards");

  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);

  const inView1 = useInView(ref1, { once: true, amount: 0.6 });
  const inView2 = useInView(ref2, { once: true, amount: 0.6 });
  const inView3 = useInView(ref3, { once: true, amount: 0.6 });

  return (
    <motion.div className="relative mb-[50px] flex flex-wrap items-stretch justify-between gap-y-12 px-[20px] sm:px-[50px] md:mb-[80px] lg:px-[60px] xl:justify-between xl:gap-12 2xl:px-[160px]">
      <motion.div
        className="bg-cards relative flex flex-col items-center gap-8 rounded-2xl px-6 pt-4 pb-10 shadow-xl shadow-cyan-900/60 md:max-w-[45%] xl:max-w-[30%]"
        ref={ref1}
        initial="hidden"
        animate={inView1 ? "show" : "hidden"}
        variants={cardsGalleryVariants}
      >
        <h4 className="my-text-stroke relative text-center text-3xl font-extrabold text-cyan-900 after:absolute after:top-[103%] after:left-[50%] after:h-[5px] after:w-[70px] after:translate-x-[-50%] after:bg-amber-400 after:content-['']">
          {t("card1.title")}
        </h4>
        <div className="xsm:text-lg flex flex-col gap-3 text-xl text-cyan-900">
          <p>
            {t("card1.text1_1")}{" "}
            <strong className="my-text-stroke"> {t("card1.strong1")}</strong>{" "}
            {t("card1.text1_2")}
          </p>
          <p>{t("card1.text2")}</p>
          <p>{t("card1.text3")}</p>
        </div>
      </motion.div>
      <motion.div
        className="bg-cards flex flex-col items-center gap-8 rounded-2xl px-6 pt-4 pb-10 shadow-xl shadow-cyan-900/60 md:max-w-[45%] xl:max-w-[30%]"
        ref={ref2}
        initial="hidden"
        animate={inView2 ? "show" : "hidden"}
        variants={cardsGalleryVariants}
      >
        <h4 className="my-text-stroke relative text-center text-3xl font-extrabold text-cyan-900 after:absolute after:top-[103%] after:left-[50%] after:h-[5px] after:w-[70px] after:translate-x-[-50%] after:bg-amber-400 after:content-['']">
          {t("card2.title")}
        </h4>
        <div className="xsm:text-lg flex flex-col gap-3 text-xl text-cyan-900">
          <p>{t("card2.text1")}</p>
          <p>
            {t("card2.text2_1")}{" "}
            <strong className="my-text-stroke">{t("card2.strong2")}</strong>{" "}
            {t("card2.text2_2")}
          </p>
          <p>{t("card2.text3")}</p>
        </div>
      </motion.div>
      <motion.div
        className="bg-cards mx-auto flex flex-col items-center gap-8 rounded-2xl px-6 pt-4 pb-10 shadow-xl shadow-cyan-900/60 md:max-w-[45%] xl:mx-[unset] xl:max-w-[30%]"
        ref={ref3}
        initial="hidden"
        animate={inView3 ? "show" : "hidden"}
        variants={cardsGalleryVariants}
      >
        <h4 className="my-text-stroke relative text-center text-3xl font-extrabold text-cyan-900 after:absolute after:top-[103%] after:left-[50%] after:h-[5px] after:w-[70px] after:translate-x-[-50%] after:bg-amber-400 after:content-['']">
          {t("card3.title")}
        </h4>
        <div className="xsm:text-lg flex flex-col gap-3 text-xl text-cyan-900">
          <p>{t("card3.text1")}</p>
          <p>
            {t("card3.text2_1")}{" "}
            <strong className="my-text-stroke">{t("card3.strong2")}</strong>{" "}
            {t("card3.text2_2")}
          </p>
          <p>{t("card3.text3")}</p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Cards;

import Image from "next/image";
// import { useTranslations } from "next-intl";
import * as motion from "motion/react-client";
import { TransitionLink } from "./TransitionLink";
import LandingIntro from "./LandingIntro";
import { getUser } from "@/lib/serverFunctions/getUserAction";
import { getTranslations } from "next-intl/server";

const Landing = async () => {
  const user = await getUser();
  console.log(user);
  const t = await getTranslations("Landing");

  return (
    <div className="relative z-0 h-screen max-h-screen min-h-[800px] w-full overflow-hidden lg:min-h-[unset]">
      <Image
        src="/landing/people_boulder2_1920.jpg"
        alt="climbers in front of boulder"
        fill
        className="object-cover object-[30%] sm:object-center"
        sizes="100vw"
      />
      {/* 3xl:top-[450px] */}
      {/* <motion.div className="3xl:top-[400px] xsm:top-[unset] xsm:bottom-10 absolute top-[45%] left-[50%] z-10 w-[800px] max-w-[90%] translate-x-[-50%] md:top-[50%] lg:top-[220px] lg:w-[unset] xl:top-[270px] xl:left-[100px] xl:translate-x-0 2xl:top-[350px]"> */}
      <motion.div
        id="news"
        className="absolute top-[125px] right-0 rounded-bl-[25px] border-t-[1px] border-t-cyan-900/50 bg-cyan-100/80 px-3 py-1 transition-all duration-500 sm:rounded-bl-[40px] sm:px-5 sm:py-3 lg:rounded-bl-[60px] lg:px-10 lg:py-6"
        initial={{ x: 100, opacity: 0 }}
        animate={{
          x: 0,
          opacity: 1,
          transition: { duration: 1.5, delay: 0.4 },
        }}
      >
        <TransitionLink
          type="18n"
          href="/events/#events"
          className="group cursor-pointer text-2xl text-cyan-900 transition-all duration-500 hover:text-cyan-900 focus:text-cyan-900 active:text-cyan-900 xl:text-3xl"
        >
          <span className="relative after:absolute after:top-[90%] after:left-0 after:h-0.5 after:w-0 after:bg-cyan-900 after:transition-all after:duration-500 after:content-[''] group-hover:after:w-full group-focus:after:w-full group-active:after:w-full after:xl:top-[105%]">
            What's new{" "}
            <span className="inline-block origin-center rotate-0 transform transition-all duration-500 group-hover:rotate-180">
              ?
            </span>
          </span>
        </TransitionLink>
      </motion.div>
      <motion.div className="3xl:bottom-[12%] absolute top-[calc(125px+10vh)] left-[50%] z-10 w-[800px] max-w-[90%] translate-x-[-50%] sm:top-auto sm:bottom-[50%] sm:translate-y-[50%] lg:w-[unset] xl:bottom-[8%] xl:left-[100px] xl:translate-x-0 xl:translate-y-0">
        <div className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-b from-cyan-200/50 via-cyan-200/60 to-amber-400/50 shadow-2xl shadow-amber-400/40 backdrop-blur-md"></div>
        <div className="flex flex-col gap-4 p-4 xl:gap-8 xl:p-8">
          <motion.h2
            className="bold relative mb-6 text-center text-4xl text-amber-400 text-shadow-cyan-900 text-shadow-lg after:absolute after:top-[105%] after:left-[50%] after:h-[5px] after:w-[20%] after:translate-x-[-50%] after:bg-amber-400 after:content-[''] md:w-full md:text-start md:after:left-0 md:after:translate-x-0 lg:mb-0 xl:text-6xl"
            initial={{ y: -100, opacity: 0 }}
            animate={{
              y: 0,
              opacity: 1,
              transition: { duration: 0.4, delay: 0.4 },
            }}
          >
            {t("title")}
          </motion.h2>
          <LandingIntro user={user} />
          <motion.div
            className="flex gap-4"
            initial={{ y: 100, opacity: 0 }}
            animate={{
              y: 0,
              opacity: 1,
              transition: { duration: 0.4, delay: 0.4 },
            }}
          >
            <a
              href="https://www.facebook.com/dino.routesetter/"
              target="_blank"
            >
              <Image
                className="w-[40px] transition-all duration-500 hover:scale-110 focus:scale-110 active:scale-110 xl:w-[50px]"
                src="/landing/facebook.svg"
                alt="Facebook icon"
                width={50}
                height={50}
              />
            </a>
            <a
              href="https://www.instagram.com/dino.routesetting/"
              target="_blank"
            >
              <Image
                className="w-[40px] transition-all duration-500 hover:scale-110 focus:scale-110 active:scale-110 xl:w-[50px]"
                src="/landing/instagram.svg"
                alt="Instagram icon"
                width={50}
                height={50}
              />
            </a>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Landing;

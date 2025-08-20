import { FaArrowDownLong } from "react-icons/fa6";
import * as motion from "motion/react-client";
import { containerVariants, listItemVariants } from "@/lib/animation";
import { useTranslations } from "next-intl";
import { eventDateFormat } from "@/lib/utils";
import Image from "next/image";

const EventsLanding = ({ event }) => {
  const t = useTranslations("EventsLanding");

  return (
    <div className="relative flex h-screen max-h-screen min-h-[800px] w-full items-center justify-center shadow-2xl shadow-amber-400/40 lg:min-h-[unset]">
      <Image
        src="/homepage/boulder_1920.jpg"
        alt="gym boulder"
        fill
        className="object-cover object-center"
        sizes="100vw"
      />
      <div className="z-0 w-[800px] max-w-[90%] sm:mt-15 sm:w-[505px] sm:max-w-[72%] lg:w-[unset]">
        <div className="relative z-10 mb-10 flex flex-col gap-6">
          <motion.h2
            className="bold my-text-stroke2 relative mb-3 text-center text-4xl text-amber-400 text-shadow-cyan-900 text-shadow-lg after:absolute after:top-[calc(100%+10px)] after:left-[50%] after:h-[5px] after:w-[20%] after:translate-x-[-50%] after:rounded-2xl after:border-[1px] after:border-cyan-900 after:bg-amber-400 after:content-[''] sm:text-5xl lg:text-6xl 2xl:text-8xl"
            initial={{ y: -100, opacity: 0 }}
            animate={{
              y: 0,
              opacity: 1,
              transition: { duration: 0.4, delay: 0.4 },
            }}
          >
            {t("heading")}
          </motion.h2>
          <div className="relative p-4 lg:px-6 2xl:p-8">
            <div className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-b from-cyan-200/50 via-cyan-200/60 to-amber-400/50 shadow-2xl shadow-amber-400/40 backdrop-blur-md"></div>
            <p className="xsm:text-2xl text-3xl text-cyan-900 sm:text-4xl">
              {/* Island meets HAUS Cup */}
              {event.title}
            </p>
            <time
              dateTime="2025-04-24"
              className="xsm:text-xl text-2xl text-cyan-900"
            >
              {eventDateFormat(event.from).slice(0, 5)}
            </time>{" "}
            -{" "}
            <time
              dateTime="2025-05-24"
              className="xsm:text-xl text-2xl text-cyan-900"
            >
              {eventDateFormat(event.until)}
            </time>
          </div>
        </div>

        <div className="relative z-10 flex flex-col gap-8 p-4 lg:px-6 2xl:p-8">
          <div className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-b from-cyan-200/50 via-cyan-200/60 to-amber-400/50 shadow-2xl shadow-amber-400/40 backdrop-blur-md"></div>
          <motion.ul
            className="ml-7 flex list-disc flex-col gap-2"
            initial="hidden"
            animate="show"
            variants={containerVariants(0.4)}
          >
            <motion.li
              className="font-nunito xsm:text-xl text-2xl text-cyan-900 xl:text-3xl"
              variants={listItemVariants}
            >
              {t("bullet1")}
            </motion.li>
            <motion.li
              className="font-nunito xsm:text-xl text-2xl text-cyan-900 xl:text-3xl"
              variants={listItemVariants}
            >
              {t("bullet2")}{" "}
            </motion.li>
            <motion.li
              className="font-nunito xsm:text-xl text-2xl text-cyan-900 xl:text-3xl"
              variants={listItemVariants}
            >
              {t("bullet3")}
            </motion.li>
          </motion.ul>
          <div className="flex gap-4">
            <a
              href="#events"
              className="b-cyan-900 group xsm:text-xl cursor-pointer rounded-lg border-2 border-cyan-900 bg-amber-400 px-4 py-2 text-2xl text-cyan-900 transition-all duration-500 hover:border-amber-400 hover:bg-cyan-900 hover:text-amber-400 focus:border-amber-400 focus:bg-cyan-900 focus:text-amber-400 active:border-amber-400 active:bg-cyan-900 active:text-amber-400 xl:text-3xl"
            >
              <span className="group/inner relative flex items-center gap-3 after:absolute after:top-[105%] after:left-0 after:h-0.5 after:w-0 after:bg-amber-400 after:transition-all after:duration-500 after:content-[''] group-focus:after:w-[85%] group-active:after:w-[85%]">
                {t("button")}{" "}
                <FaArrowDownLong className="transition-all duration-500 group-hover/inner:translate-y-1.5" />
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventsLanding;

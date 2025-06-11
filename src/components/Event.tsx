"use client";

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { cardsVariants } from "@/lib/animation";
import { EventType } from "@/types";
import Link from "next/link";
import { useRef } from "react";

const Event = ({ title, date, description, link }: EventType) => {
  const ref = useRef(null);

  const isInView = useInView(ref, { once: true, amount: 0.6 });
  return (
    <motion.li
      className="relative"
      variants={cardsVariants}
      initial="hidden"
      animate={isInView ? "show" : "hidden"}
      ref={ref}
    >
      <Image
        src="/events/carabiner.svg"
        alt="carabiner icon"
        width={160}
        height={1200}
        className="xsm:bottom-[-30px] xsm:top-[unset] absolute right-[-10px] bottom-[-40px] z-0 opacity-70 sm:top-[55%] sm:right-[-40px] sm:bottom-[unset] lg:top-[50%] lg:right-[-50px] 2xl:top-[0px] 2xl:right-[unset] 2xl:left-[-120px]"
      />

      <Link
        href={link}
        className="bg-cards hover:bg-cards-dark active:bg-cards-dark focus:bg-cards-dark relative z-20 flex cursor-pointer flex-col gap-8 rounded-xl bg-cover bg-no-repeat px-4 py-3 text-cyan-900 shadow-2xl shadow-cyan-900/60 transition-all duration-500 hover:shadow-cyan-900 focus:shadow-cyan-900 active:shadow-cyan-900"
      >
        <div>
          <h4 className="my-text-stroke text-2xl font-extrabold">{title}</h4>
          <p className="relative rounded-2xl text-xl after:absolute after:top-[100%] after:left-0 after:h-[2px] after:w-[50px] after:bg-cyan-900 after:content-['']">
            {date}
          </p>
        </div>
        <p className="text-xl">{description}</p>
      </Link>
    </motion.li>
  );
};

export default Event;

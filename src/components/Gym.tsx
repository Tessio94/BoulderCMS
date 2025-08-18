import React from "react";
import MotionClientWrapper from "./motion/MotionClientWrapper";
import { cardsVariants } from "@/lib/animation";
import Image from "next/image";
// import Link from "next/link";
import { TransitionLink } from "./TransitionLink";

const Gym = ({ name, location, information, slug }) => {
  return (
    <MotionClientWrapper
      type="li"
      className="relative z-20"
      variants={cardsVariants}
      initial="hidden"
    >
      <Image
        src="/events/carabiner.svg"
        alt="carabiner icon"
        width={160}
        height={1200}
        className="xsm:bottom-[-30px] xsm:top-[unset] absolute right-[-10px] bottom-[-40px] z-10 sm:top-[55%] sm:right-[-40px] sm:bottom-[unset] lg:top-[50%] lg:right-[-50px] 2xl:top-[0px] 2xl:right-[unset] 2xl:left-[-120px]"
      />

      <TransitionLink
        href={`/gyms/${slug}`}
        className="bg-cards hover:bg-cards-dark active:bg-cards-dark focus:bg-cards-dark relative z-20 flex cursor-pointer flex-col gap-8 rounded-xl bg-cover bg-no-repeat px-4 py-3 text-cyan-900 shadow-2xl shadow-cyan-900/60 transition-all duration-500 hover:shadow-cyan-900 focus:shadow-cyan-900 active:shadow-cyan-900"
      >
        <div>
          <h4 className="my-text-stroke text-2xl font-extrabold">{name}</h4>
          <p className="relative text-xl after:absolute after:top-[100%] after:left-0 after:h-[2px] after:w-[50px] after:bg-cyan-900 after:content-['']">
            {location}
          </p>
        </div>
        <p className="text-xl">{information}</p>
      </TransitionLink>
    </MotionClientWrapper>
  );
};

export default Gym;

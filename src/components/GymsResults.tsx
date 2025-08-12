import React from "react";
import * as motion from "motion/react-client";
import Gym from "@/components/Gym";

const GymsResults = ({ gyms }) => {
  return (
    <main
      id="gyms"
      className="bg-[url(/homepage/background1.svg)] bg-contain min-h-screen z-0 md:mb-[80px] px-[20px] pt-[120px] sm:px-[50px] lg:px-[60px] 2xl:px-[160px]"
    >
      <h5 className="my-text-stroke  relative mb-8 w-fit text-4xl font-extrabold text-cyan-900 bg-cyan-900/10 backdrop-blur-sm px-10 py-3 rounded-xl after:absolute after:top-[85%] after:left-[35%] after:h-[5px] after:w-[45%] after:translate-x-[-50%] after:rounded-2xl after:border-[1px] after:border-amber-400 after:bg-cyan-900 after:content-['']">
        GymsResults
      </h5>
      <motion.ul className="mb-[50px] flex flex-col gap-12  bg-cyan-900/10 backdrop-blur-sm rounded-xl px-2 py-10">
        {gyms.map((gym, index) => {
          return <Gym key={index} {...gym} />;
        })}
      </motion.ul>
    </main>
  );
};

export default GymsResults;

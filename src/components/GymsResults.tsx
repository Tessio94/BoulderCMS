import * as motion from "motion/react-client";
import Gym from "@/components/Gym";

const GymsResults = ({ gyms }) => {
  return (
    <main
      id="gyms"
      className="z-0 min-h-screen bg-[url(/homepage/background1.svg)] bg-contain px-[20px] pt-[120px] sm:px-[50px] md:mb-[80px] lg:px-[60px] 2xl:px-[160px]"
    >
      <h5 className="my-text-stroke relative mb-8 w-fit rounded-xl bg-cyan-900/10 px-10 py-3 text-4xl font-extrabold text-cyan-900 backdrop-blur-sm after:absolute after:top-[85%] after:left-[35%] after:h-[5px] after:w-[45%] after:translate-x-[-50%] after:rounded-2xl after:border-[1px] after:border-amber-400 after:bg-cyan-900 after:content-['']">
        GymsResults
      </h5>
      <motion.ul className="mb-[50px] flex flex-col gap-12 rounded-xl bg-cyan-900/10 px-2 py-10 backdrop-blur-sm">
        {gyms.map((gym, index) => {
          return <Gym key={index} {...gym} />;
        })}
      </motion.ul>
    </main>
  );
};

export default GymsResults;

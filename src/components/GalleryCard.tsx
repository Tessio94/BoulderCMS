import Image from "next/image";
import MotionClientWrapper from "./motion/MotionClientWrapper";
import { cardsGalleryVariants } from "@/lib/animation";
import { eventDateFormat } from "@/lib/utils";
import Link from "next/link";

const GalleryCard = ({ heroImage, title, from, gym, slug }) => {
  return (
    <Link href={`/gallery/${slug}`}>
      <MotionClientWrapper
        className="border-cards hover:shadow-cards-dark shadow-cards relative aspect-square cursor-pointer overflow-hidden rounded-2xl border-2 shadow-lg transition-all duration-500 hover:scale-105 hover:shadow-2xl"
        initial="hidden"
        variants={cardsGalleryVariants}
      >
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-cyan-200/50 backdrop-blur-md">
          <h4 className="relative mb-5 text-2xl after:absolute after:top-[100%] after:left-[50%] after:h-[2px] after:w-[50px] after:translate-x-[-50%] after:bg-amber-400 after:content-['']">
            {title}
          </h4>
          <p className="text-xl">{eventDateFormat(from)}</p>
          <p className="text-xl">{gym.name}</p>
          <button className="group mt-5 cursor-pointer rounded-lg border-2 border-amber-400 bg-cyan-900 px-4 py-2 text-amber-400 transition-all duration-500 hover:border-cyan-900 hover:bg-amber-400 hover:text-cyan-900 focus:border-cyan-900 focus:bg-amber-400 focus:text-cyan-900 active:border-cyan-900 active:bg-amber-400 active:text-cyan-900">
            <span className="xsm:text-lg relative text-xl after:absolute after:top-[100%] after:left-0 after:h-0.5 after:w-0 after:bg-cyan-900 after:transition-all after:duration-500 after:content-[''] group-hover:after:w-full group-focus:after:w-full group-active:after:w-full sm:text-2xl">
              See Gallery
            </span>
          </button>
        </div>
        <Image
          src={
            typeof heroImage === "object" && heroImage?.url
              ? heroImage.url
              : "/homepage/gallery.jpg"
          }
          alt="event one"
          fill
          className="object-cover"
        />
      </MotionClientWrapper>
    </Link>
  );
};

export default GalleryCard;

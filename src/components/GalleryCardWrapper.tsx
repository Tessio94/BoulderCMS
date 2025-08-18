"use client";

import { cn, eventDateFormat } from "@/lib/utils";
import Image from "next/image";
// import Link from "next/link";
import React, { useState } from "react";
import { TransitionLink } from "./TransitionLink";

const GalleryCardWrapper = ({ heroImage, title, from, gym, slug }) => {
  const [showOverlay, setShowOverlay] = useState(false);

  return (
    <>
      <div
        onClick={() => setShowOverlay(!showOverlay)}
        className={cn(
          "absolute inset-0 z-20 flex flex-col items-center justify-center bg-cyan-200/50 backdrop-blur-md transition-all duration-300 xl:opacity-0 xl:hover:opacity-100",
          showOverlay ? "opacity-100" : "opacity-0",
        )}
      >
        <h4 className="relative mb-5 text-2xl after:absolute after:top-[100%] after:left-[50%] after:h-[2px] after:w-[50px] after:translate-x-[-50%] after:bg-amber-400 after:content-['']">
          {title}
        </h4>
        <p className="text-xl">{eventDateFormat(from)}</p>
        <p className="text-xl">{gym.name}</p>
        <TransitionLink
          href={`/gallery/${slug}`}
          className="group mt-5 cursor-pointer rounded-lg border-2 border-amber-400 bg-cyan-900 px-4 py-2 text-amber-400 transition-all duration-500 hover:border-cyan-900 hover:bg-amber-400 hover:text-cyan-900 focus:border-cyan-900 focus:bg-amber-400 focus:text-cyan-900 active:border-cyan-900 active:bg-amber-400 active:text-cyan-900"
        >
          <span className="xsm:text-lg relative text-xl after:absolute after:top-[100%] after:left-0 after:h-0.5 after:w-0 after:bg-cyan-900 after:transition-all after:duration-500 after:content-[''] group-hover:after:w-full group-focus:after:w-full group-active:after:w-full sm:text-2xl">
            See Gallery
          </span>
        </TransitionLink>
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
    </>
  );
};

export default GalleryCardWrapper;

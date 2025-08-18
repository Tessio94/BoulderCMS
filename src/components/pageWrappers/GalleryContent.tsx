"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import GalleryGrid from "../GalleryGrid";
import { FaArrowDownLong } from "react-icons/fa6";
import { SlMagnifier } from "react-icons/sl";
import { useQuery } from "@tanstack/react-query";

const GalleryContent = ({ initialGalleries }) => {
  const t = useTranslations("Gallery");

  const [search, setSearch] = useState("");

  const { data: galleries = [], isLoading } = useQuery({
    queryKey: ["galleries", search],
    queryFn: async () => {
      const res = await fetch(`/api/galleriesRoute?search=${search}`);
      const json = await res.json();

      return json.docs;
    },
    initialData: initialGalleries,
  });

  return (
    <>
      <div className="relative z-0 flex h-screen min-h-[800px] w-full items-center justify-center overflow-hidden lg:min-h-[unset]">
        {/* <div className="absolute top-1/2 left-1/2 translate-y-[-10%] translate-x-[-50%] content-[''] h-[350px] w-[90%] lg:w-[70%] z-10 backdrop-blur-xsm bg-[radial-gradient(circle,_rgba(8,51,68)_0%,_rgba(8,51,68,0)_50%)]"></div> */}
        <Image
          src="/homepage/gallery.jpg"
          alt="climber on boulder"
          fill
          className="object-cover object-center"
          sizes="100vw"
        />

        <div className="z-20 flex w-[800px] max-w-[90%] flex-col gap-8 rounded-2xl xl:gap-12">
          <div className="flex flex-col items-center gap-14 sm:gap-10 xl:gap-12">
            <h5 className="my-text-stroke2 amber-400 relative text-center text-5xl font-extrabold text-amber-400 text-shadow-cyan-900 text-shadow-lg after:absolute after:top-[calc(100%+10px)] after:left-[50%] after:h-[5px] after:w-[20%] after:translate-x-[-50%] after:rounded-2xl after:border-[1px] after:border-cyan-900 after:bg-amber-400 after:content-[''] xl:text-6xl">
              {t("heading")}
            </h5>
            <div className="flex w-full items-center rounded-2xl shadow-2xl shadow-cyan-900">
              <button className="group flex h-[68px] w-[20%] shrink-0 cursor-pointer items-center justify-center rounded-tl-2xl rounded-bl-2xl bg-cyan-900 py-4 sm:w-[10%]">
                <SlMagnifier className="text-2xl font-extrabold text-amber-400 transition-all duration-300 group-hover:scale-[1.1] xl:text-3xl 2xl:text-4xl" />
              </button>
              <input
                type="text"
                placeholder={t("searchPlaceholder")}
                className="h-[68px] w-[80%] overflow-hidden rounded-2xl rounded-l-none border-b-[3px] border-cyan-900 bg-amber-400 px-[20px] py-4 text-2xl text-nowrap text-cyan-900 outline-none sm:w-[90%] xl:text-3xl 2xl:text-4xl"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <a
              href="#gallery"
              className="b-cyan-900 group xsm:text-xl cursor-pointer rounded-lg border-2 border-cyan-900 bg-amber-400 px-4 py-2 text-2xl text-cyan-900 shadow-xl shadow-cyan-900 transition-all duration-500 hover:border-amber-400 hover:bg-cyan-900 hover:text-amber-400 focus:border-amber-400 focus:bg-cyan-900 focus:text-amber-400 active:border-amber-400 active:bg-cyan-900 active:text-amber-400 sm:text-3xl"
            >
              <span className="group/inner relative flex items-center gap-3 after:absolute after:top-[105%] after:left-0 after:h-0.5 after:w-0 after:bg-amber-400 after:transition-all after:duration-500 after:content-[''] group-focus:after:w-[77%] group-active:after:w-[85%]">
                {t("button")}{" "}
                <FaArrowDownLong className="transition-all duration-500 group-hover/inner:translate-y-1.5" />
              </span>
            </a>
          </div>
        </div>
      </div>
      <GalleryGrid galleries={galleries} />
    </>
  );
};

export default GalleryContent;

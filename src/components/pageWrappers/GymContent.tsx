"use client";

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useTranslations } from "next-intl";
import GymsResults from "@/components/GymsResults";
import { FaArrowDownLong } from "react-icons/fa6";
import { SlMagnifier } from "react-icons/sl";

const GymContent = ({ initialGyms }) => {
  const t = useTranslations("Gym");

  const [search, setSearch] = useState("");
  console.log("search", search);
  const { data: gyms = [], isLoading } = useQuery({
    queryKey: ["gyms", search],
    queryFn: async () => {
      const res = await fetch(`/api/gymsRoute?search=${search}`);
      const json = await res.json();
      // console.log(json.docs);
      return json.docs;
    },
    initialData: initialGyms,
  });
  // console.log("gyms", gyms);
  return (
    <>
      <div className="relative z-0 flex h-screen max-h-screen min-h-[800px] w-full items-center justify-center overflow-hidden bg-[url(/gyms/gyms_1024.jpg)] bg-no-repeat sm:min-h-auto lg:bg-none xl:block">
        <Image
          className="absolute right-0 bottom-0 z-0 hidden rounded-bl-[40%] lg:block lg:h-auto lg:object-contain"
          src="/gyms/gyms_1.jpg"
          alt="climber on boulder"
          width={640}
          height={960}
        />
        <Image
          className="absolute bottom-[-40px] left-0 z-0 hidden rounded-tr-[40%] lg:h-auto lg:object-contain xl:block"
          src="/gyms/gyms_2.jpg"
          alt="climber on boulder"
          width={640}
          height={480}
        />
        <div className="bottom-[calc(50% + 125px)] absolute z-20 flex max-w-[90%] translate-y-[50%] flex-col gap-8 rounded-2xl lg:left-[9%] xl:bottom-[440px] xl:w-[900px] xl:gap-12">
          <div className="z-20 flex flex-col items-center gap-14 sm:gap-10 xl:gap-12">
            <h5 className="my-text-stroke2 amber-400 relative text-center text-5xl font-extrabold text-amber-400 text-shadow-cyan-900 text-shadow-lg after:absolute after:top-[118%] after:left-[50%] after:h-[5px] after:w-[20%] after:translate-x-[-50%] after:rounded-2xl after:border-[1px] after:border-cyan-900 after:bg-amber-400 after:content-[''] sm:after:top-[130%] xl:text-6xl">
              {t("heading")}
            </h5>
            <div
              className="flex w-full items-center rounded-2xl shadow-2xl shadow-cyan-900"
              // onSubmit={handleSubmit}
            >
              <button className="group flex h-[68px] shrink-0 basis-[20%] cursor-pointer items-center justify-center rounded-tl-2xl rounded-bl-2xl bg-cyan-900 py-4 sm:basis-[10%]">
                <SlMagnifier className="text-2xl font-extrabold text-amber-400 transition-all duration-300 group-hover:scale-[1.1] xl:text-3xl 2xl:text-4xl" />
              </button>
              <input
                type="text"
                placeholder={t("searchPlaceholder")}
                className="h-[68px] basis-[80%] overflow-hidden rounded-2xl rounded-l-none border-b-[3px] border-cyan-900 bg-amber-400 px-[20px] py-4 text-2xl text-nowrap text-cyan-900 outline-none sm:basis-[90%] xl:text-3xl 2xl:text-4xl"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <a
              href="#gyms"
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
      <GymsResults gyms={gyms} />
    </>
  );
};

export default GymContent;

"use client";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { Gym } from "@/payload-types";
import { Filters } from "@/types";
import { useTranslations } from "next-intl";

interface EventsFormProps {
  filters: Filters;
  onChange: (patch: Partial<Filters>) => void;
}

const EventsForm = ({ filters, onChange }: EventsFormProps) => {
  const [showSort, setShowSort] = useState(false);
  const [showGyms, setShowGyms] = useState(false);

  const { data: gyms = [] } = useQuery<Gym[]>({
    queryKey: ["gyms", filters],
    queryFn: async () => {
      const res = await fetch(`/api/gyms`);
      const json = await res.json();

      return json.docs;
    },
  });
  // console.log(filters);
  const t = useTranslations("EventsSection.form");
  return (
    <div className="mx-5 mb-[50px] flex flex-col gap-6 rounded-2xl bg-cyan-900/10 px-4 py-[50px] max-sm:mx-0 sm:mx-[50px] md:mb-20 md:px-[60px] lg:mx-[60px] 2xl:mx-40">
      <div>
        <div
          className="bg-cards hover:bg-cards-dark active:bg-cards-dark focus:bg-cards-dark w-fit cursor-pointer rounded-2xl px-6 py-2 text-3xl text-cyan-900 transition-all duration-500 hover:text-cyan-800 focus:text-cyan-800 active:text-cyan-800"
          onClick={() => {
            setShowSort((sort) => !sort);
          }}
        >
          {t("sort")}
        </div>
        {showSort && (
          <div className="">
            <div
              className="bg-cards hover:bg-cards-dark active:bg-cards-dark focus:bg-cards-dark mt-1 cursor-pointer rounded-2xl px-6 py-2 text-2xl text-cyan-900 transition-all duration-500 hover:text-cyan-800 focus:text-cyan-800 active:text-cyan-800"
              onClick={() => {
                onChange({
                  sort: "desc",
                });
                setShowSort(false);
              }}
            >
              {t("newest")}
            </div>
            <div
              className="bg-cards hover:bg-cards-dark active:bg-cards-dark focus:bg-cards-dark mt-1 cursor-pointer rounded-2xl px-6 py-2 text-2xl text-cyan-900 transition-all duration-500 hover:text-cyan-800 focus:text-cyan-800 active:text-cyan-800"
              onClick={() => {
                onChange({
                  sort: "asc",
                });
                setShowSort(false);
              }}
            >
              {t("oldest")}
            </div>
          </div>
        )}
      </div>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col items-center justify-between gap-12 md:flex-row md:gap-0">
          <div className="flex w-full flex-col gap-2 md:w-[unset] md:basis-[45%]">
            <label
              htmlFor="from"
              className="pl-6 text-3xl font-extrabold text-cyan-900"
            >
              {t("from")}
            </label>
            <input
              type="date"
              id="from"
              name="from"
              value={filters.from}
              onChange={(e) => onChange({ from: e.target.value })}
              className="rounded-2xl border-b border-cyan-900 bg-cyan-900/10 px-5 py-3 text-2xl text-cyan-900"
            />
          </div>
          <div className="flex w-full flex-col gap-2 md:w-[unset] md:basis-[45%]">
            <label
              htmlFor="to"
              className="pl-6 text-3xl font-extrabold text-cyan-900"
            >
              {t("to")}
            </label>
            <input
              type="date"
              id="to"
              name="to"
              value={filters.to}
              onChange={(e) => onChange({ to: e.target.value })}
              className="rounded-2xl border-b border-cyan-900 bg-cyan-900/10 px-5 py-3 text-2xl text-cyan-900"
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label
            htmlFor="to"
            className="pl-6 text-3xl font-extrabold text-cyan-900"
          >
            {t("hall")}
          </label>
          <div>
            <div
              className="flex cursor-pointer items-center justify-between rounded-2xl border-b border-cyan-900 bg-cyan-900/10 px-5 py-3 text-2xl text-cyan-900"
              onClick={() => setShowGyms((prev) => !prev)}
            >
              <p className="opacity-50">{t("select1")}</p>
              <IoMdArrowDropdown />
            </div>

            {showGyms && (
              <ul className="mt-1 rounded-2xl border-b border-cyan-900 bg-cyan-900/10 text-2xl text-cyan-900">
                {gyms.map((gym) => {
                  return (
                    <li
                      key={gym.id}
                      className="hover:bg-cards-dark active:bg-cards-dark focus:bg-cards-dark cursor-pointer rounded-2xl px-5 py-3 transition-all duration-500 hover:text-cyan-800 focus:text-cyan-800 active:text-cyan-800"
                      onClick={() => {
                        onChange({ hall: gym.id.toString() });
                        setShowGyms((prev) => !prev);
                      }}
                    >
                      {gym.name}
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label
            htmlFor="term"
            className="pl-6 text-3xl font-extrabold text-cyan-900"
          >
            {t("search")}
          </label>
          <div className="rounded-2xl border-b border-cyan-900 bg-cyan-900/10 px-5 py-3 text-2xl text-cyan-900">
            <input
              type="text"
              id="term"
              name="term"
              placeholder={t("search1")}
              value={filters.term}
              onChange={(e) => onChange({ term: e.target.value })}
              className="w-full border-0 outline-0"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventsForm;

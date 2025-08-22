"use client";

import { cn } from "@/lib/utils";
import React, { useState } from "react";

const ResultsForm = ({ category, registrations }) => {
  const [showCategories, setShowCategories] = useState(false);

  return (
    <div className="xsm:w-full w-[90%] sm:w-[85%] md:w-[80%] lg:w-[75%] xl:w-[70%] 2xl:w-[60%]">
      <div className="relative flex flex-col items-center justify-start">
        <div
          onClick={() => setShowCategories((prev) => !prev)}
          className="w-full cursor-pointer rounded-xl border-b-2 border-b-gray-600 bg-cyan-100 px-10 py-4 text-cyan-900 transition-all duration-300 hover:bg-cyan-900/50"
        >
          {category[0].name}
        </div>
        <div
          className={cn(
            "absolute top-[100%] left-0 w-full overflow-y-scroll rounded-xl bg-white shadow-2xl transition-all duration-300",
            showCategories ? "max-h-[300px]" : "max-h-0",
          )}
        >
          {category?.map((group, i) => {
            return (
              <div
                className="cursor-pointer rounded-xl px-10 py-4 text-cyan-900 transition-all duration-300 hover:bg-cyan-900/70 hover:text-amber-400"
                key={i}
              >
                {group.name}
              </div>
            );
          })}
        </div>
      </div>
      <table className="mt-16 w-full">
        <tr>
          <th className="text-start">#</th>
          <th className="text-start">Name</th>
          {/* <th className="text-end">Points</th> */}
        </tr>
        {registrations.docs.map((person, i) => {
          console.log(person);
          return (
            <tr key={i}>
              <td className="text-start">{i + 1}</td>
              <td className="text-start">Šime Klapan</td>
              {/* <td className="text-end">20.123</td> */}
            </tr>
          );
        })}
      </table>
    </div>
  );
};

export default ResultsForm;

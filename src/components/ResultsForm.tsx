"use client";

import { getUser } from "@/lib/serverFunctions/getUserAction";
import { cn } from "@/lib/utils";
import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import ResultsInfo from "./ResultsInfo";

type TotalResult = {
  member: number;
  name: string;
  points: string;
};

const getAllResult = async (eventId) => {
  const res = await fetch(`/api/usersResults?eventId=${eventId}`);
  const results = res.json();

  return results;
};

const ResultsForm = ({ id: eventId, category, registrations }) => {
  const [showCategories, setShowCategories] = useState(false);
  const [showResultInfo, setShowResultInfo] = useState(false);
  const [userResult, setUserResult] = useState(null);

  let eventResults: undefined | TotalResult[];

  const { data, isLoading } = useQuery({
    queryKey: ["results", eventId],
    queryFn: () => getAllResult(eventId),
    refetchOnWindowFocus: false,
    refetchOnMount: true,
  });

  if (data) {
    console.log(data);
    ({ totals: eventResults } = data);
    // ({ id: memberId } = data);
  }

  // let userResultDetails: undefined |

  const handleUserResult = async (memberId) => {
    try {
      const res = await fetch(
        `/api/userResults?eventId=${eventId}&memberId=${memberId}`,
      );

      if (!res.ok) throw new Error("Network response was not ok");

      const data = await res.json();

      setUserResult(data);
      setShowResultInfo((prev) => !prev);
    } catch (error) {
      console.error("Failed to fetch user result:", error);
    }
  };

  return (
    <>
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
          <thead>
            <tr>
              <th className="px-5 py-3 text-start">#</th>
              <th className="px-5 py-3 text-start">Name</th>
              <th className="px-5 py-3 text-end">Points</th>
              {/* <th className="text-end">Points</th> */}
            </tr>
          </thead>
          {eventResults?.map((memberResult, i) => {
            // console.log(person);
            return (
              <tbody
                key={i}
                onClick={() => handleUserResult(memberResult.member)}
                className="cursor-pointer bg-white transition-all duration-300 hover:bg-slate-200"
              >
                <tr>
                  <td className="rounded-l-xl px-5 py-3 text-start">{i + 1}</td>
                  <td className="px-5 py-3 text-start">{memberResult.name}</td>
                  <td className="rounded-r-xl px-5 py-3 text-end">
                    {memberResult.points}
                  </td>
                  {/* <td className="text-end">20.123</td> */}
                </tr>
              </tbody>
            );
          })}
        </table>
      </div>
      {showResultInfo && userResult && (
        <ResultsInfo setShow={setShowResultInfo} data={userResult} />
      )}
    </>
  );
};

export default ResultsForm;

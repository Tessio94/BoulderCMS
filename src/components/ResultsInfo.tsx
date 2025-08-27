"use client";

import { cn } from "@/lib/utils";
import React, { useState } from "react";
import StageInfo from "./StageInfo";

type ResultInfoProps = {
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  data: any;
  eventId: string;
};

const ResultsInfo = ({ setShow, data, eventId }: ResultInfoProps) => {
  const [showStageInfo, setShowStageInfo] = useState(false);
  const [stageData, setStageData] = useState(null);
  // console.log(data);
  const { userResult } = data;
  const name = userResult.docs[0].member.fullName;

  const handleStageInfo = async (stageId) => {
    console.log("eventId3", eventId);
    try {
      const res = await fetch(
        `/api/stageResults?eventId=${eventId}&stageId=${stageId}`,
      );

      if (!res.ok) throw new Error("Network response was not ok");

      const data = await res.json();
      const { stageInfo } = data;

      setShowStageInfo((prev) => !prev);
      setStageData(stageInfo);
    } catch (error) {
      console.error("Failed to fetch user result:", error);
    }
  };
  console.log("eventId2", eventId);
  return (
    <div className="fixed inset-0 backdrop-blur-xs">
      <div className="bg-cards-dark/50 absolute top-[50%] left-[50%] h-[650px] max-h-[700px] min-h-[60vh] w-[650px] max-w-[90%] translate-x-[-50%] translate-y-[-50%] rounded-xl backdrop-blur-sm">
        <div className="absolute top-[50%] left-[50%] flex h-[85%] w-[85%] translate-x-[-50%] translate-y-[-50%] flex-col justify-between rounded-xl bg-gray-100 px-5 py-10">
          <div
            className={cn(
              "absolute inset-0 z-0",
              showStageInfo && "z-20 bg-gray-800/50",
            )}
          ></div>
          <div className="z-10">
            <h4 className="font-nunito relative mb-6 text-2xl font-bold text-cyan-900 capitalize underline">
              {name}
            </h4>
            <div className="max-h-[340px] overflow-y-scroll">
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="py-2 text-start">Name</th>
                    <th className="text-start">Goal</th>
                    <th className="w-[15%] text-start">Punkte</th>
                  </tr>
                </thead>
                <tbody>
                  {userResult.docs.map((result, i) => {
                    const matchedGoal = result.stage.goals.find(
                      (goal) => goal.id === result.goal,
                    );
                    // console.log(matchedGoal);
                    return (
                      <tr
                        key={i}
                        className={cn(
                          "cursor-pointer transition-all duration-300 hover:bg-gray-300",
                          i % 2 === 0 ? "bg-gray-200" : "bg-gray-100",
                        )}
                        onClick={() => handleStageInfo(result.stage.id)}
                      >
                        <td className="py-1 text-start">{result.stage.name}</td>
                        <td className="text-start">{matchedGoal.name}</td>
                        <td className="w-[15%] text-center">{result.points}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
          <button
            onClick={() => setShow((prev) => !prev)}
            className="border-cards-dark hover:bg-cards-dark/60 z-10 mx-auto w-fit cursor-pointer rounded-xl border-2 bg-gray-100 px-10 py-2 transition-all duration-300 hover:text-gray-100"
          >
            Close
          </button>
          {showStageInfo && (
            <StageInfo
              setShowStageInfo={setShowStageInfo}
              stageData={stageData}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ResultsInfo;

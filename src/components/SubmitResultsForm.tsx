"use client";

import { getUser } from "@/lib/serverFunctions/getUserAction";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import Toast from "./sonner/Toast";

const STAGES_PER_PAGE = 5;

const SubmitResultsForm = ({ id: eventId, stages = [] }) => {
  const [page, setPage] = useState(1);
  const [scores, setScores] = useState<Record<string, number>>({});
  const [achievedGoals, setAchievedGoals] = useState<Record<string, number[]>>(
    {},
  );
  const [user, setUser] = useState(null);

  const stagesList = stages.docs || [];
  //

  const totalPages = Math.ceil(stagesList.length / STAGES_PER_PAGE);
  const startIndex = (page - 1) * STAGES_PER_PAGE;
  const paginatedStages = stagesList.slice(
    startIndex,
    startIndex + STAGES_PER_PAGE,
  );

  let memberId: number | undefined;

  const { data, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
    refetchOnWindowFocus: false,
    refetchOnMount: true,
  });

  if (data) {
    ({ id: memberId } = data);
  }

  useEffect(() => {
    const savedScores = localStorage.getItem("scores");
    if (savedScores) setScores(JSON.parse(savedScores));

    const savedGoals = localStorage.getItem("achievedGoals");
    if (savedGoals) setAchievedGoals(JSON.parse(savedGoals));
  }, []);

  // ✅ Persist scores to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("scores", JSON.stringify(scores));
  }, [scores]);

  // ✅ Persist achievedGoals to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("achievedGoals", JSON.stringify(achievedGoals));
  }, [achievedGoals]);

  const handleGoalClick = (stageId, goalId, baseScore, coefficient) => {
    const points = baseScore * coefficient;

    // Update scores for the stage
    setScores((prev) => ({ ...prev, [stageId]: points }));

    // Mark goal as achieved
    setAchievedGoals((prev) => {
      const existing = prev[stageId] || [];

      if (!existing.includes(goalId)) {
        return { ...prev, [stageId]: goalId };
      }
      return prev;
    });
  };
  console.log("memberID", memberId);
  // console.log("scores", scores);
  const handleSubmit = async () => {
    const missing = stagesList.filter(
      (stage) => scores[stage.id] === undefined || scores[stage.id] === null,
    );

    if (missing.length > 0) {
      toast.custom((id) => (
        <Toast
          id={id}
          type="not"
          title={"Select all route results."}
          description={"Please fill result for each route before submitting."}
        />
      ));

      return;
    }

    for (const stage of stagesList) {
      const points = scores[stage.id] ?? 0;
      await fetch("/api/results", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          member: memberId,
          event: eventId,
          stage: stage.id,
          points,
        }),
      });
    }

    // ✅ Optional: clear localStorage after submit
    localStorage.removeItem("scores");
    localStorage.removeItem("achievedGoals");
    setScores({});
    setAchievedGoals({});
    setPage(1);
  };

  const totalPoints = Object.values(scores).reduce(
    (sum, value) => sum + value,
    0,
  );

  return (
    <div className="xsm:w-full flex w-[90%] flex-col gap-10 rounded-xl border-1 border-cyan-900 px-2 py-5 shadow-xl shadow-cyan-900 sm:w-[85%] sm:px-5 sm:py-10 md:mr-auto md:w-[80%] lg:w-[75%] xl:w-[70%] 2xl:w-[60%]">
      <h5 className="text-3xl text-cyan-900">Total points: {totalPoints}</h5>
      {paginatedStages.map((stage, i) => {
        return (
          <div
            key={i}
            className="flex flex-col justify-between gap-5 lg:flex-row lg:gap-0"
          >
            <div>
              <h5 className="text-2xl text-cyan-900 underline">{stage.name}</h5>
              <span className="text-sm text-cyan-900 italic">
                {stage.location}
              </span>
            </div>
            <div>
              <table>
                <thead>
                  <tr className="bg-cyan-900/30 text-cyan-950">
                    <th className="rounded-l-xl px-3 py-2 text-start sm:px-5 sm:py-3">
                      Name
                    </th>
                    <th className="px-3 py-2 text-start sm:px-5 sm:py-3">
                      Coefficient
                    </th>
                    <th className="rounded-r-xl px-3 py-2 text-end sm:px-5 sm:py-3">
                      Points
                    </th>
                  </tr>
                </thead>
                {stage.goals.map((goal, i) => {
                  // console.log("goal", goal);
                  return (
                    <tbody key={i}>
                      <tr
                        className={cn(
                          "cursor-pointer transition-all duration-300",
                          achievedGoals[stage.id]?.includes(goal.id)
                            ? "bg-green-200"
                            : "hover:bg-gray-200",
                        )}
                        onClick={() =>
                          handleGoalClick(
                            stage.id,
                            goal.id,
                            goal.baseScore,
                            goal.coefficient,
                          )
                        }
                      >
                        <td className="rounded-l-xl px-3 py-2 text-start text-cyan-900 capitalize sm:px-5 sm:py-3">
                          {goal.name}
                        </td>
                        <td className="px-3 py-2 text-start text-cyan-900 capitalize sm:px-5 sm:py-3">
                          {goal.coefficient}x
                        </td>
                        <td className="rounded-r-xl px-3 py-2 text-end text-cyan-900 capitalize sm:px-5 sm:py-3">
                          {goal.baseScore}
                        </td>
                      </tr>
                    </tbody>
                  );
                })}
              </table>
            </div>
          </div>
        );
      })}

      {/* Pagination controls */}
      <div className="mt-6 flex justify-center gap-3">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="cursor-pointer rounded-lg border border-cyan-900 px-4 py-2 text-cyan-900 transition-all duration-300 hover:bg-cyan-900/50 disabled:pointer-events-none disabled:opacity-50"
        >
          Prev
        </button>
        <span className="px-4 py-2 text-cyan-900">
          Page {page} of {totalPages}
        </span>
        <button
          disabled={page === totalPages}
          onClick={() => setPage((p) => p + 1)}
          className="cursor-pointer rounded-lg border border-cyan-900 px-4 py-2 text-cyan-900 transition-all duration-300 hover:bg-cyan-900/50 disabled:pointer-events-none disabled:opacity-50"
        >
          Next
        </button>
      </div>
      <button
        className="cursor-pointer rounded-xl border-2 border-cyan-900 bg-cyan-100/50 px-5 py-2 text-cyan-900 transition-all duration-300 hover:border-cyan-100 hover:bg-cyan-900/80 hover:text-cyan-100"
        onClick={handleSubmit}
      >
        Submit results
      </button>
    </div>
  );
};

export default SubmitResultsForm;

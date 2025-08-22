import React from "react";

const SubmitResultsForm = ({ stage }) => {
  return (
    <div className="xsm:w-full flex w-[90%] flex-col gap-10 rounded-xl border-1 border-cyan-900 px-2 py-5 shadow-xl shadow-cyan-900 sm:w-[85%] sm:px-5 sm:py-10 md:mr-auto md:w-[80%] lg:w-[75%] xl:w-[70%] 2xl:w-[60%]">
      {stage.map((s, i) => {
        return (
          <div
            key={i}
            className="flex flex-col justify-between gap-5 lg:flex-row lg:gap-0"
          >
            <div>
              <h5 className="text-2xl text-cyan-900 underline">{s.name}</h5>
              <span className="text-sm text-cyan-900 italic">{s.location}</span>
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
                {s.goals.map((goal, i) => {
                  return (
                    <tbody key={i}>
                      <tr className="cursor-pointer transition-all duration-300 hover:bg-gray-200">
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
    </div>
  );
};

export default SubmitResultsForm;

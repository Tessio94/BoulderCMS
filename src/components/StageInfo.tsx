import Image from "next/image";
import React from "react";

const StageInfo = ({ setShowStageInfo, stageData }) => {
  const stageName = stageData[0]?.stageName;
  const stageLocation = stageData[0]?.stageLocation;
  const stageImage = stageData[0]?.stageImage;
  console.log("stageData", stageData);
  return (
    <div className="absolute inset-0 top-[50%] left-[50%] z-50 flex h-[80%] w-[80%] -translate-1/2 flex-col justify-between rounded-xl bg-white p-5">
      <div>
        <h5 className="mb-4 text-xl text-cyan-900 underline">{stageName}</h5>
        <table className="w-full">
          <thead>
            <tr>
              <th className="px-2 py-1 text-start">Goals</th>
              <th className="px-2 py-1 text-start">Basis</th>
              <th className="px-2 py-1 text-start">Coef.</th>
              <th className="px-2 py-1 text-start">Pkt.</th>
              <th className="px-2 py-1 text-start text-green-700">&#x2713;</th>
            </tr>
          </thead>
          <tbody>
            {stageData.map((goal, i) => {
              return (
                <tr key={i} className="">
                  <td className="px-2 py-1 text-start">{goal.name}</td>
                  <td className="px-2 py-1 text-start">{goal.baseScore}</td>
                  <td className="px-2 py-1 text-start">{goal.coefficient}</td>
                  <td className="px-2 py-1 text-start">
                    ={goal.baseScore * goal.coefficient}
                  </td>
                  <td className="px-2 py-2 text-start">{goal.achievedCount}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {stageLocation && <div>Boulder: {stageLocation}</div>}
        {stageImage && (
          <Image
            src={stageImage}
            alt={`${stageName} boulder`}
            width={300}
            height={300}
          />
        )}
      </div>

      <button
        onClick={() => setShowStageInfo((prev) => !prev)}
        className="border-cards-dark hover:bg-cards-dark/60 mx-auto w-fit cursor-pointer rounded-xl border-2 bg-gray-100 px-10 py-2 transition-all duration-300 hover:text-gray-100"
      >
        Close
      </button>
    </div>
  );
};

export default StageInfo;

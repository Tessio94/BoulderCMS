import React from "react";

type ResultInfoProps = {
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  data: any;
};

const ResultsInfo = ({ setShow, data }: { ResultInfoProps }) => {
  console.log(data);
  const { userResult } = data;
  const name = userResult.docs[0].member.fullName;
  return (
    <div className="bg-cards-dark/50 fixed h-[650px] max-h-[700px] min-h-[60vh] w-[650px] max-w-[90%] rounded-xl backdrop-blur-sm">
      <div className="absolute top-[50%] left-[50%] flex h-[85%] w-[85%] translate-x-[-50%] translate-y-[-50%] flex-col justify-between rounded-xl bg-gray-100 px-5 py-10">
        <div>
          <h4 className="font-nunito my-text-stroke mb-6 text-2xl font-bold capitalize">
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
                  console.log(matchedGoal);
                  return (
                    <tr key={i}>
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
          className="border-cards-dark hover:bg-cards-dark/60 mx-auto w-fit cursor-pointer rounded-xl border-2 bg-gray-100 px-10 py-2 transition-all duration-300 hover:text-gray-100"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ResultsInfo;

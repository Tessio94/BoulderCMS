import UserResultsForm from "@/components/UserResultsForm";
import { getUser } from "@/lib/serverFunctions/getUserAction";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {
  const user = await getUser();
  if (!user) {
    redirect("/");
  }

  const data = await getUserResults(user.id);
  const { totals: results } = data;

  return (
    <main className="xsm:px-3 flex min-h-[calc(100vh-184px)] flex-col gap-10 px-6 py-10 pb-20 sm:px-10 lg:px-15 xl:mx-40">
      <h2 className="my-text-stroke2 relative mb-5 w-fit text-3xl font-extrabold text-amber-400 text-shadow-cyan-900 text-shadow-lg after:absolute after:top-[110%] after:left-0 after:h-[5px] after:w-[20%] after:rounded-2xl after:border-[1px] after:border-cyan-900 after:bg-amber-400 after:content-['']">
        Results of -{" "}
        <span className="my-text-stroke text-cyan-900">{user.userName}</span>
      </h2>
      <div>
        <table className="w-full">
          <thead>
            <tr>
              <th className="p-1 text-start text-sm sm:px-3 sm:py-2 sm:text-lg">
                Event
              </th>
              <th className="p-1 text-start text-sm sm:px-3 sm:py-2 sm:text-lg">
                Category
              </th>
              <th className="p-1 text-start text-sm sm:px-3 sm:py-2 sm:text-lg">
                Points
              </th>
              <th className="p-1 text-start text-sm sm:px-3 sm:py-2 sm:text-lg">
                Position
              </th>
            </tr>
          </thead>
          {results?.map(async (userResult, i) => {
            const allResults = await getAllResult(
              userResult.event,
              userResult.category,
            );

            const index = allResults.totals.findIndex(
              (doc) => doc.member === userResult.member,
            );

            const place = index >= 0 ? index + 1 : "N/A";
            return (
              // <tbody className="" key={i}>
              //   <tr>
              //     <td className="p-1 text-start text-sm sm:px-3 sm:py-2 sm:text-lg">
              //       {userResult.eventName}
              //     </td>
              //     <td className="p-1 text-start text-sm sm:px-3 sm:py-2 sm:text-lg">
              //       {" "}
              //       {userResult.categoryName}
              //     </td>
              //     <td className="p-1 text-start text-sm sm:px-3 sm:py-2 sm:text-lg">
              //       {" "}
              //       {userResult.points}
              //     </td>
              //     <td className="p-1 text-start text-sm sm:px-3 sm:py-2 sm:text-lg">
              //       {place}
              //     </td>
              //   </tr>
              // </tbody>
              <UserResultsForm key={i} userResult={userResult} place={place} />
            );
          })}
        </table>
      </div>
    </main>
  );
};

export default page;

const getUserResults = async (userId) => {
  const baseUrl = process.env.NEXT_PUBLIC_URL || "http://localhost:3000";

  const res = await fetch(`${baseUrl}/api/userProfile?memberId=${userId}`);

  const results = await res.json();

  return results;
};

const getAllResult = async (eventId, categoryId) => {
  const baseUrl = process.env.NEXT_PUBLIC_URL || "http://localhost:3000";

  const res = await fetch(
    `${baseUrl}/api/usersResults?eventId=${eventId}&categoryId=${categoryId}`,
  );
  const results = await res.json();

  return results;
};

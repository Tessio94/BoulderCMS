import { getUser } from "@/lib/serverFunctions/getUserAction";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {
  const user = await getUser();
  if (!user) {
    redirect("/"); // server-side redirect (no flicker, secure)
  }

  const data = await getUserResults(user.id);
  const { totals: results } = data;
  console.log("eee", results);
  return (
    <main className="xsm:px-3 flex min-h-[calc(100vh-184px)] flex-col gap-10 px-6 py-10 pb-20 sm:px-10 lg:px-15 xl:mx-40">
      <h2 className="my-text-stroke2 relative mb-5 w-fit text-3xl font-extrabold text-amber-400 text-shadow-cyan-900 text-shadow-lg after:absolute after:top-[110%] after:left-0 after:h-[5px] after:w-[20%] after:rounded-2xl after:border-[1px] after:border-cyan-900 after:bg-amber-400 after:content-['']">
        Welcome to your profile{" "}
        <span className="my-text-stroke text-cyan-900">{user.userName}</span>
      </h2>
      <div>
        <table className="w-full">
          <thead>
            <tr>
              <th className="px-3 py-2 text-start">Event name</th>
              <th className="px-3 py-2 text-start">Category</th>
              <th className="px-3 py-2 text-start">Your points</th>
              <th className="px-3 py-2 text-start">Achieved place</th>
            </tr>
          </thead>
          {results?.map((userResult, i) => {
            return (
              <tbody className="" key={i}>
                <tr>
                  <td className="px-3 py-2 text-start">
                    {userResult.eventName}
                  </td>
                  <td className="px-3 py-2 text-start">
                    {" "}
                    {userResult.categoryName}
                  </td>
                  <td className="px-3 py-2 text-start"> {userResult.points}</td>
                  <td className="px-3 py-2 text-start">
                    {" "}
                    {userResult.eventName}
                  </td>
                </tr>
              </tbody>
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

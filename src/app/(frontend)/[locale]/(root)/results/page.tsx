import UserResultsForm from "@/components/UserResultsForm";
import { getUser } from "@/lib/serverFunctions/getUserAction";
import { LocaleType } from "@/types";
import { redirect } from "next/navigation";
import React from "react";

type ResultType = {
  event: number;
  eventName: string;
  category: number;
  categoryName: string;
  member: number;
  points: string;
};

type StageResultType = {
  member: number;
  name: string;
  points: string;
};

type DataType = { totals: ResultType[] };

type AllResultsType = { totals: StageResultType[] };

const page = async ({
  params,
}: {
  params: Promise<{ locale: LocaleType }>;
}) => {
  const { locale } = await params;

  const user = await getUser();
  if (!user) {
    redirect("/");
  }

  const data = await getUserResults(user.id, locale);

  const { totals: results } = data as DataType;

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
              <th className="xsm:text-xs p-1 text-start text-sm sm:px-3 sm:py-2 sm:text-lg">
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
          {results.map(async (userResult, i) => {
            const allResults = (await getAllResult(
              userResult.event,
              userResult.category,
            )) as AllResultsType;

            const index = allResults.totals.findIndex(
              (doc) => doc.member === userResult.member,
            );

            const place = index >= 0 ? index + 1 : "N/A";

            return (
              <UserResultsForm key={i} userResult={userResult} place={place} />
            );
          })}
        </table>
      </div>
    </main>
  );
};

export default page;

const getUserResults = async (userId: number, locale: LocaleType) => {
  const baseUrl = process.env.NEXT_PUBLIC_URL || "http://localhost:3000";

  const res = await fetch(
    `${baseUrl}/api/userProfile?memberId=${userId}&locale=${locale}`,
  );

  const results = await res.json();

  return results;
};

const getAllResult = async (eventId: number, categoryId: number) => {
  const baseUrl = process.env.NEXT_PUBLIC_URL || "http://localhost:3000";

  const res = await fetch(
    `${baseUrl}/api/usersResults?eventId=${eventId}&categoryId=${categoryId}`,
  );
  const results = await res.json();

  return results;
};

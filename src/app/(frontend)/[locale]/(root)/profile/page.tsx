import { getUserInfo } from "@/lib/serverFunctions/getuserInfo";
import { eventDateFormat } from "@/lib/utils";
import { redirect } from "next/navigation";
import { getPayload } from "payload";
import config from "@payload-config";
import React from "react";

const Page = async () => {
  const user = await getUserInfo();

  if (!user) {
    redirect("/");
  }

  const visitedEvent = await getEventsVisited(user.id);

  return (
    <main className="xsm:px-3 font-nunito flex min-h-[calc(100vh-184px)] flex-col gap-10 px-6 py-10 pb-20 sm:px-10 lg:px-15 xl:mx-40">
      <p className="text-2xl text-cyan-900">
        First name: <span className="font-extrabold">{user.firstName}</span>
      </p>
      <p className="text-2xl text-cyan-900">
        Last name: <span className="font-extrabold">{user.lastName}</span>
      </p>
      <p className="text-2xl text-cyan-900">
        Username: <span className="font-extrabold">{user.userName}</span>
      </p>
      <p className="text-2xl text-cyan-900">
        Email: <span className="font-extrabold">{user.email}</span>
      </p>
      <p className="text-2xl text-cyan-900">
        Phone number: <span className="font-extrabold">{user.phoneNumber}</span>
      </p>
      <p className="text-2xl text-cyan-900">
        Attended events:{" "}
        <span className="font-extrabold">{visitedEvent.docs.length}</span>
      </p>
      <p className="text-2xl text-cyan-900">
        Member since:{" "}
        <span className="font-extrabold">
          {eventDateFormat(user.createdAt)}
        </span>
      </p>
    </main>
  );
};

export default Page;

const getEventsVisited = async (memberId: number) => {
  const payload = await getPayload({ config });

  const results = await payload.find({
    collection: "event-registrations",
    where: {
      member: {
        equals: memberId,
      },
    },
  });

  return results;
};

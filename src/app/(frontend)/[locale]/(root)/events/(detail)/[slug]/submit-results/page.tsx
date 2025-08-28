import React, { cache } from "react";
import { getPayload } from "payload";
import config from "@payload-config";
import SubmitResultsForm from "@/components/SubmitResultsForm";
import { getUser } from "@/lib/serverFunctions/getUserAction";

const page = async ({ params }: { params: { slug: string } }) => {
  const { slug } = await params;
  const event = await queryEventsBySlug({ slug });
  const { id: eventId } = event;

  const user = await getUser();

  let joinedUser;
  // napraviti ovo da nije conditional u stranicama gdje cemo stavit guard clause (ako je logged in mos uci, ko ne ne mozes i onda ne treba guard clause, druga funkcija)
  if (user) {
    const { id: memberId } = user;
    joinedUser = await queryJoinedInUser(eventId, memberId);
  }

  const {
    member: { userName },
  } = joinedUser;
  // console.log("event :", event);
  // avoid getUser being undefined (make another server function if needed)

  return (
    <main className="xsm:px-6 flex min-h-screen flex-col items-center justify-start px-10 py-10 pb-20 sm:px-20 lg:px-40">
      <h2 className="my-text-stroke2 relative mb-12 w-fit text-3xl font-extrabold text-amber-400 text-shadow-cyan-900 text-shadow-lg after:absolute after:top-[110%] after:left-0 after:h-[5px] after:w-[20%] after:rounded-2xl after:border-[1px] after:border-cyan-900 after:bg-amber-400 after:content-[''] md:mr-auto">
        {event.title}
      </h2>
      <p className="mb-6 rounded-xl bg-cyan-200/30 px-5 py-2 text-2xl text-cyan-900 md:mr-auto">
        <span className="font-bold underline">{userName}</span> select your
        score for different routes:
      </p>
      <SubmitResultsForm event={event} joinedUser={joinedUser} />
    </main>
  );
};

export default page;

const queryEventsBySlug = cache(async ({ slug }: { slug: string }) => {
  const payload = await getPayload({ config });

  const result = await payload.find({
    collection: "events",
    limit: 1,
    pagination: false,
    where: {
      slug: {
        equals: slug,
      },
    },
  });

  const event = result.docs?.[0] || null;

  if (event?.stages?.docs) {
    // Sort stages by createdAt ascending
    event.stages.docs.sort(
      (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    );
  }

  return event;
});

const queryJoinedInUser = cache(async (eventId: number, memberId: number) => {
  const payload = await getPayload({ config });

  const result = await payload.find({
    collection: "event-registrations",
    limit: 1,
    pagination: false,
    where: {
      and: [
        {
          member: {
            equals: memberId,
          },
        },
        {
          event: {
            equals: eventId,
          },
        },
      ],
    },
    select: {
      id: true,
      category: true,
      member: true,
    },
  });

  return result.docs?.[0] || null;
});

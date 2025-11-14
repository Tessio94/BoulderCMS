import React, { cache } from "react";
import { getPayload } from "payload";
import config from "@payload-config";
import ResultsForm from "@/components/ResultsForm";
import { Category } from "@/payload-types";
import Image from "next/image";

const page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const event = await queryEventsBySlug({ slug });
  const { id: eventId } = event;
  const categories = (event.category?.docs as Category[]) ?? [];

  let firstCategoryId;
  let data;

  if (categories) {
    firstCategoryId = categories[0]?.id;
    data = await getAllResult(eventId, firstCategoryId);
  }
  const { totals: eventResults } = data;
  return (
    <main className="xsm:px-6 flex min-h-screen flex-col items-center justify-start gap-10 px-10 py-10 pb-20 sm:px-20 lg:gap-16 lg:px-40">
      <h2 className="my-text-stroke2 relative mr-auto mb-5 w-fit text-3xl font-extrabold text-amber-400 text-shadow-cyan-900 text-shadow-lg after:absolute after:top-[110%] after:left-0 after:h-[5px] after:w-[20%] after:rounded-2xl after:border-[1px] after:border-cyan-900 after:bg-amber-400 after:content-['']">
        {event.title}
      </h2>
      {eventResults ? (
        <ResultsForm
          event={event}
          eventResults={eventResults}
          categories={categories}
        />
      ) : (
        <div className="flex w-full flex-col items-center gap-10 rounded-2xl bg-linear-to-b from-cyan-200/50 via-cyan-200/60 to-amber-400/50 px-3 py-5 shadow-2xl shadow-amber-400/40 backdrop-blur-md sm:w-auto sm:px-10">
          <p className="text-center text-3xl text-cyan-900 sm:text-5xl">
            Result haven't been submitted yet
          </p>
          <Image
            src="/header/logo3.svg"
            alt="Bouldermeet logo"
            width={150}
            height={113}
          />
          <p className="text-center text-2xl text-cyan-900 sm:text-4xl">
            Come back later
          </p>
        </div>
      )}
    </main>
  );
};

export default page;

const queryEventsBySlug = cache(async ({ slug }: { slug: string }) => {
  const payload = await getPayload({ config });

  const result = await payload.find({
    collection: "events",
    limit: 1,
    where: {
      slug: {
        equals: slug,
      },
    },
  });

  return result.docs?.[0] || null;
});

const getAllResult = async (eventId: number, categoryId: number) => {
  const baseUrl = process.env.NEXT_PUBLIC_URL || "http://localhost:3000";

  const res = await fetch(
    `${baseUrl}/api/usersResults?eventId=${eventId}&categoryId=${categoryId}`,
  );
  const results = await res.json();

  return results;
};

// const queryResults = cache(async (eventId: number) => {
//   const payload = await getPayload({ config });

//   const result = await payload.find({
//     collection: "results",
//     pagination: false,
//     where: {
//       event: {
//         equals: eventId,
//       },
//     },
//   });

//   return result.docs?.[0] || null;
// });

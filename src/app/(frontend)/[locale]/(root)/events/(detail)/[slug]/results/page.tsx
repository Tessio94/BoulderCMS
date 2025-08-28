import React, { cache } from "react";
import { getPayload } from "payload";
import config from "@payload-config";
import ResultsForm from "@/components/ResultsForm";

const page = async ({ params }: { params: { slug: string } }) => {
  const { slug } = await params;
  const event = await queryEventsBySlug({ slug });
  const { id: eventId } = event;
  console.log("event :", event);

  const results = await queryResults(eventId);
  console.log("result", results);

  return (
    <main className="xsm:px-6 flex min-h-screen flex-col items-center justify-start gap-10 px-10 py-10 pb-20 sm:px-20 lg:gap-16 lg:px-40">
      <h2 className="my-text-stroke2 relative mr-auto mb-5 w-fit text-3xl font-extrabold text-amber-400 text-shadow-cyan-900 text-shadow-lg after:absolute after:top-[110%] after:left-0 after:h-[5px] after:w-[20%] after:rounded-2xl after:border-[1px] after:border-cyan-900 after:bg-amber-400 after:content-['']">
        {event.title}
      </h2>
      <ResultsForm event={event} />
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

const queryResults = cache(async (eventId: number) => {
  const payload = await getPayload({ config });

  const result = await payload.find({
    collection: "results",
    pagination: false,
    where: {
      event: {
        equals: eventId,
      },
    },
  });

  return result.docs?.[0] || null;
});

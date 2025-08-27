import { cache } from "react";
import { getPayload } from "payload";
import config from "@payload-config";
import { eventDateFormat } from "@/lib/utils";
import FancyboxWrapper from "@/components/fancybox/FancyBoxWrapper";
import MasonryGrid from "@/components/masonry/MasonryWrapper";

const Page = async ({ params }) => {
  const { slug } = await params;
  console.log(slug);

  const event = await queryEventsBySlug({ slug });
  console.log("event :", event);

  return (
    <main className="xsm:px-3 relative flex min-h-[calc(100vh-187px)] w-full max-w-[1920px] flex-col items-start px-6 pt-3 pb-10 sm:px-10 lg:px-15 xl:px-55">
      <div className="my-15">
        <h1 className="my-text-stroke relative mb-8 w-fit text-4xl font-extrabold text-cyan-900 after:absolute after:top-[118%] after:left-0 after:h-[5px] after:w-[45%] after:rounded-2xl after:border-[1px] after:border-amber-400 after:bg-cyan-900 after:content-['']">
          {event.title}
        </h1>
        <p className="text-2xl text-cyan-900">{eventDateFormat(event.from)}</p>
        <p className="text-2xl text-cyan-900">{event.gym?.location}</p>
      </div>

      <FancyboxWrapper>
        <div className="relative min-h-[30vh] w-full">
          <MasonryGrid event={event} />
        </div>
      </FancyboxWrapper>
    </main>
  );
};

export default Page;

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
    depth: 2,
    select: {
      title: true,
      from: true,
      gallery: true,
      gym: true,
    },
  });

  return result.docs?.[0] || null;
});

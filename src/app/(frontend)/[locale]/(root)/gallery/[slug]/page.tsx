import { cache } from "react";
import { getPayload } from "payload";
import config from "@payload-config";
import Image from "next/image";
import { eventDateFormat } from "@/lib/utils";
import FancyboxWrapper from "@/components/fancybox/FancyBoxWrapper";
import MasonryGrid from "@/components/masonry/MasonryWrapper";

const Page = async ({ params }) => {
  const { slug } = await params;
  console.log(slug);

  const event = await queryEventsBySlug({ slug });
  console.log("event :", event);

  return (
    <FancyboxWrapper>
      <main className="relative mb-20 flex w-full max-w-[1920px] flex-col items-start px-[20px] py-3 sm:px-[50px] lg:px-[60px] 2xl:px-[160px]">
        <div className="my-15">
          <h1 className="my-text-stroke relative mb-8 w-fit text-4xl font-extrabold text-cyan-900 after:absolute after:top-[118%] after:left-0 after:h-[5px] after:w-[45%] after:rounded-2xl after:border-[1px] after:border-amber-400 after:bg-cyan-900 after:content-['']">
            {event.title}
          </h1>
          <p className="text-2xl text-cyan-900">
            {eventDateFormat(event.from)}
          </p>
          <p className="text-2xl text-cyan-900">{event.gym?.location}</p>
        </div>

        <MasonryGrid event={event} />
        {/* <Masonry
            items={items}
            config={{
              columns: [1, 2, 3],
              gap: [24, 12, 6],
              media: [640, 768, 1024],
            }}
            render={(item, idx) => (
              <img
                key={idx}
                src={item}
                style={{ width: "100%", height: "auto" }}
              />
            )}
          /> */}
        {/* {event.gallery?.map((photo, index) => {
            return (
              <a
                key={index}
                href={photo.url}
                data-fancybox="gallery"
                data-caption={photo.alt}
                className="group relative block"
              >
                <Image
                  src={photo.url}
                  alt={photo.alt}
                  width={photo.width}
                  height={photo.height}
                  className="rounded-xl"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-color1 absolute top-3 right-3 h-10 w-10 rounded-2xl bg-white/70 p-2 transition-all duration-300 xl:opacity-0 xl:group-hover:opacity-100"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 3h6v6m0-6l-7 7m-3 11H3v-6m0 6l7-7"
                  />
                </svg>
              </a>
            );
          })} */}
      </main>
    </FancyboxWrapper>
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

// import Image from "next/image";

import EventButton from "@/components/buttons/EventButton";
import { DateRangeDisplay } from "@/components/DateRangeDisplay";
import { EventGallery } from "@/components/EventGallery";
import { RenderHTML } from "@/components/RenderHTML";
import { TransitionLink } from "@/components/TransitionLink";
import { cn } from "@/lib/utils";
import config from "@payload-config";
import Image from "next/image";
// import Link from "next/link";
import { getPayload } from "payload";
import { cache } from "react";

const Page = async ({ params }: { params: { slug: string } }) => {
  const { slug } = await params;

  const event = await queryEventsBySlug({ slug });

  const heroAspectRatio = event?.heroImage?.width / event?.heroImage?.height;

  console.log(event);

  return (
    <div className="shadow-xl shadow-cyan-500/50 xl:mx-40">
      {/* <Image
        className="aspect-auto max-h-screen"
        src={
          typeof event.heroImage === "object" && event.heroImage?.url
            ? event.heroImage.url
            : "/homepage/gallery.jpg"
        }
        alt={event.title}
        width={1920}
        height={1080}
      /> */}
      {/* lg:min-h-[calc(100vh-125px)] - donji div */}
      <div className="relative z-0 flex w-full items-center justify-center overflow-hidden lg:p-10">
        <div
          className="absolute inset-0 z-0 scale-110 blur-sm"
          style={{
            backgroundImage:
              typeof event.heroImage === "object" && event.heroImage?.url
                ? `url(${event.heroImage.url})`
                : "url('/homepage/gallery.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div
          className={cn(
            "z-10",
            event.heroImage.backgroundColor
              ? `${event.heroImage.backgroundColor}`
              : "bg-white",
          )}
        >
          <Image
            className="z-10 max-h-screen shadow-[0px_0px_15px_15px_#859ca3] ring-4"
            src={
              typeof event.heroImage === "object" && event.heroImage?.url
                ? event.heroImage.url
                : "/homepage/gallery.jpg"
            }
            alt={event.title}
            width={event.heroImage.width}
            height={event.heroImage.height}
          />
        </div>

        {/* <div
          className="relative z-10 flex h-full w-full items-center justify-center"
          style={{ aspectRatio: heroAspectRatio }}
        >
          <Image
            src={
              typeof event.heroImage === "object" && event.heroImage?.url
                ? event.heroImage.url
                : "/homepage/gallery.jpg"
            }
            alt={event.title}
            fill
            style={{ objectFit: "contain" }} // key: proper contain behavior
            className="max-h-screen"
          />
        </div> */}
      </div>
      <main
        id="event-content"
        className="xsm:px-3 flex flex-col justify-between gap-10 px-6 py-10 pb-20 sm:px-10 md:flex-row md:gap-0 lg:px-15"
      >
        <div className="basis-[60%]">
          <div className="mb-5">
            <h2 className="my-text-stroke2 relative mb-5 w-fit text-3xl font-extrabold text-amber-400 text-shadow-cyan-900 text-shadow-lg after:absolute after:top-[110%] after:left-0 after:h-[5px] after:w-[20%] after:rounded-2xl after:border-[1px] after:border-cyan-900 after:bg-amber-400 after:content-['']">
              {event.title}
            </h2>
            <div className="mt-4 flex items-center gap-2">
              <p className="my-text-stroke2 text-xl">Location: </p>
              <TransitionLink
                href={`/gyms/${event.gym.slug}`}
                className="my-text-stroke2 relative text-xl font-extrabold text-amber-400 text-shadow-cyan-900 text-shadow-lg after:absolute after:top-[100%] after:left-0 after:h-[3px] after:w-[100%] after:rounded-2xl after:border-[1px] after:border-cyan-900 after:bg-amber-400 after:transition-all after:duration-300 after:content-[''] hover:after:bg-cyan-900"
              >
                {event.gym.name}
              </TransitionLink>
            </div>
            <p className="my-text-stroke2 mt-10 text-2xl">
              {event.description}
            </p>
          </div>

          {event.content && <RenderHTML data={event.content} />}
        </div>
        <div className="basis-[35%] text-cyan-900">
          <div className="rounded-2xl border-2 border-cyan-900/30 pb-10 shadow-2xl">
            <Image
              className="mb-5 aspect-auto max-h-screen rounded-t-2xl"
              src={
                typeof event.cardImage === "object" && event.cardImage?.url
                  ? event.cardImage.url
                  : "/homepage/gallery.jpg"
              }
              alt={event.title}
              width={1920}
              height={1080}
            />
            <div className="px-5">
              <p className="mb-5 text-xl font-bold">Qualification</p>
              <div className="mb-10 flex justify-between">
                <div>
                  <DateRangeDisplay label="Timeframe" range={event.timeframe} />
                </div>
                <div>
                  <DateRangeDisplay
                    label="Registration"
                    range={event.registration}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-5">
                <EventButton
                  type="join"
                  eventId={event.id}
                  slug={event.slug}
                  timeframe={event.timeframe}
                  registration={event.registration}
                />
                <EventButton
                  type="results"
                  eventId={event.id}
                  slug={event.slug}
                  timeframe={event.timeframe}
                  registration={event.registration}
                />
                <EventButton
                  type="submit"
                  eventId={event.id}
                  slug={event.slug}
                  timeframe={event.timeframe}
                  registration={event.registration}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
      {event.gallery && (
        <div className="xsm:px-3 px-6 pb-20 sm:px-10 lg:px-15">
          <h2 className="my-text-stroke2 mx-10 mb-5 text-2xl font-extrabold text-amber-400">
            Images from past event:
          </h2>
          <div className="aspect-auto max-w-full overflow-hidden rounded-xl border-2 border-cyan-900/30 shadow-xl shadow-cyan-900/40 lg:max-w-[60%] xl:max-w-[60%]">
            <EventGallery gallery={event.gallery} />
          </div>
        </div>
      )}
    </div>
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
  });

  return result.docs?.[0] || null;
});

// import Image from "next/image";

import EventButton from "@/components/buttons/EventButton";
import { DateRangeDisplay } from "@/components/DateRangeDisplay";
import { EventGallery } from "@/components/EventGallery";
import { RenderHTML } from "@/components/RenderHTML";
import { TransitionLink } from "@/components/TransitionLink";
import config from "@payload-config";
import Image from "next/image";
// import Link from "next/link";
import { getPayload } from "payload";
import { cache } from "react";

const Page = async ({ params }) => {
  const { slug } = await params;

  const event = await queryEventsBySlug({ slug });
  // console.log("event :", event);
  const heroAspectRatio = event?.heroImage?.width / event?.heroImage?.height;
  // console.log(heroAspectRatio);

  return (
    <>
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
      <div className="relative z-0 flex w-full items-center justify-center overflow-hidden lg:min-h-[calc(100vh-125px)]">
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
        <Image
          className="z-10 max-h-screen shadow-[0px_0px_35px_35px_#859ca3] ring-4"
          src={
            typeof event.heroImage === "object" && event.heroImage?.url
              ? event.heroImage.url
              : "/homepage/gallery.jpg"
          }
          alt={event.title}
          width={event.heroImage.width}
          height={event.heroImage.height}
        />
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
      <main className="xsm:px-6 flex flex-col justify-between gap-10 px-10 py-10 pb-20 sm:px-20 md:flex-row md:gap-0 lg:px-40">
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
                <EventButton eventId={event.id} slug={event.slug} type="join" />
                <button className="w-full cursor-pointer rounded-2xl bg-cyan-100/80 py-2 text-cyan-900 uppercase transition-all duration-500 hover:bg-cyan-900/40">
                  show results
                </button>
                <EventButton
                  eventId={event.id}
                  slug={event.slug}
                  type="submit"
                />
              </div>
            </div>
          </div>
        </div>
      </main>
      {event.gallery && (
        <>
          <h2 className="xsm:mx-6 my-text-stroke2 mx-10 mb-5 text-2xl font-extrabold text-amber-400 sm:mx-20 lg:mx-40">
            Images from past event:
          </h2>
          <div className="xxl:max-w-[40%] xsm:mx-6 mx-10 mb-20 aspect-auto max-w-full overflow-hidden rounded-xl border-2 border-cyan-900/30 shadow-xl shadow-cyan-900/40 sm:mx-20 md:max-w-[60%] lg:mx-40 xl:max-w-[50%]">
            <EventGallery gallery={event.gallery} />
          </div>
        </>
      )}
    </>
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

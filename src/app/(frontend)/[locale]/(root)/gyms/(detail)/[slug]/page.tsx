import { getPayload } from "payload";
import { cache } from "react";
import config from "@payload-config";
import Image from "next/image";
import * as motion from "motion/react-client";
import { EventGallery } from "@/components/EventGallery";
import EventCard from "@/components/EventCard";
import { FaPhoneAlt } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { TbWorld } from "react-icons/tb";
import { FaLocationDot } from "react-icons/fa6";
import { cn } from "@/lib/utils";
import { Event as EventType, Media } from "@/payload-types";
import { LocaleType } from "@/types";

const Page = async ({
  params,
}: {
  params: Promise<{ locale: LocaleType; slug: string }>;
}) => {
  const { locale, slug } = await params;

  const gym = await queryGymsBySlug({ locale, slug });
  const gymHeroImage = gym.heroImage as Media;

  // console.log("gymDetail", gym);
  return (
    <div className="shadow-xl shadow-cyan-500/50 xl:mx-40">
      {/* lg:min-h-[calc(100vh-125px)] - donji div */}
      <div className="relative z-0 flex w-full items-center justify-center overflow-hidden lg:p-10">
        <div
          className="absolute inset-0 z-0 scale-110 blur-sm"
          style={{
            backgroundImage: gymHeroImage.url
              ? `url(${gymHeroImage.url})`
              : "url('/homepage/gallery.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div
          className={cn(
            "z-10 w-fit",
            gymHeroImage.backgroundColor
              ? `${gymHeroImage.backgroundColor}`
              : "bg-white",
          )}
        >
          <Image
            className="z-10 max-h-[600px] w-fit shadow-[0px_0px_15px_15px_#859ca3] ring-4"
            style={{
              aspectRatio:
                gymHeroImage.width && gymHeroImage.height
                  ? gymHeroImage.width / gymHeroImage.height
                  : 16 / 9,
            }}
            src={gymHeroImage.url || "/homepage/gallery.jpg"}
            alt={gymHeroImage.alt || "Boulder gym poster"}
            width={gymHeroImage.width || 1200}
            height={gymHeroImage.height || 456}
          />
        </div>
      </div>
      <main className="xsm:px-6 flex flex-col justify-between gap-10 px-10 py-10 pb-20 sm:px-10 md:gap-0 lg:px-15 xl:flex-row">
        <div className="w-full xl:w-[55%]">
          <div className="mb-5">
            <h2 className="my-text-stroke2 relative mb-5 w-fit text-3xl font-extrabold text-amber-400 text-shadow-cyan-900 text-shadow-lg after:absolute after:top-[110%] after:left-0 after:h-[5px] after:w-[20%] after:rounded-2xl after:border-[1px] after:border-cyan-900 after:bg-amber-400 after:content-['']">
              {gym.name}
            </h2>
          </div>
          <div className="mt-10 flex flex-col gap-6 text-xl text-cyan-900">
            <div className="group flex items-center gap-3">
              <FaPhoneAlt />
              <a href={`tel:+${gym.phone}`} className="group-hover:underline">
                {gym.phone}
              </a>
            </div>
            <div className="group flex items-center gap-3">
              <IoMdMail />
              <a href={`mailto:${gym.email}`} className="group-hover:underline">
                {gym.email}
              </a>
            </div>
            <div className="group flex items-center gap-3">
              <TbWorld />
              <a href={`${gym.website}`} className="group-hover:underline">
                {gym.website}
              </a>
            </div>
            <div className="flex items-center gap-3">
              <FaLocationDot />
              <p>{gym.location}</p>
            </div>
          </div>
          <div className="mt-14">
            <p className="font-nunito text-xl text-cyan-900">
              {gym.information}
            </p>
            {gym.workingHours && gym.workingHours?.length > 0 && (
              <>
                <p className="my-text-stroke mt-8 text-2xl font-extrabold text-cyan-900">
                  Working hours:
                </p>
                <div className="mt-2 flex flex-col gap-4">
                  {gym.workingHours?.map((day, i) => {
                    // console.log("dddaay", day.days);
                    let abbrWeekDay;
                    const weekDayDE = {
                      mon: "mo",
                      tue: "di",
                      wed: "mi",
                      thu: "do",
                      fri: "fr",
                      sat: "sa",
                      sun: "so",
                    };

                    if (locale === "de") {
                      abbrWeekDay = day.days
                        .map((day) => weekDayDE[day])
                        .join(" ");
                    } else {
                      abbrWeekDay = day.days.map((day) => day).join(" ");
                    }

                    return (
                      <div
                        className="font-nunito flex items-start gap-3"
                        key={i}
                      >
                        <p className="text-xl font-extrabold text-cyan-900 underline">
                          {/* {day.days.join(" ")}: */}
                          {abbrWeekDay}
                        </p>
                        <p className="text-xl font-extrabold text-cyan-900">
                          {day.from === 0
                            ? "Closed"
                            : `${day.from}:00 - ${day.to}:00`}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </div>
          <div className="mt-14">
            <p className="my-text-stroke mt-8 mb-4 text-2xl font-extrabold text-cyan-900">
              Events in this gym:
            </p>
            {gym.relatedEvents?.docs && gym.relatedEvents?.docs.length > 0 && (
              <motion.ul className="mb-[50px] flex flex-col gap-12 md:mb-[80px]">
                {gym.relatedEvents.docs.map((ev) => {
                  // console.log("eventsaaah", ev);
                  const relatedEvent = ev as EventType;
                  return <EventCard key={relatedEvent.id} {...relatedEvent} />;
                })}
              </motion.ul>
            )}
          </div>
        </div>
        <div className="w-full xl:w-[40%]">
          {gym.gallery && gym.gallery.length > 0 && (
            <>
              <h2 className="my-text-stroke2 mb-5 text-2xl font-extrabold text-amber-400">
                Images from {gym.name}:
              </h2>
              <div className="aspect-auto overflow-hidden rounded-xl border-2 border-cyan-900/30 shadow-xl shadow-cyan-900/40">
                <EventGallery gallery={gym.gallery as Media[]} />
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default Page;

const queryGymsBySlug = cache(
  async ({ locale, slug }: { locale: LocaleType; slug: string }) => {
    const payload = await getPayload({ config });

    const result = await payload.find({
      collection: "gyms",
      limit: 1,
      pagination: false,
      locale,
      where: {
        slug: {
          equals: slug,
        },
      },
      depth: 2,
    });

    return result.docs?.[0] || null;
  },
);

import { getPayload } from "payload";
import { cache } from "react";
import config from "@payload-config";
import Image from "next/image";
import * as motion from "motion/react-client";
import { EventGallery } from "@/components/EventGallery";
import Event from "@/components/Event";
import { FaPhoneAlt } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { TbWorld } from "react-icons/tb";
import { FaLocationDot } from "react-icons/fa6";

const Page = async ({ params }) => {
  const { slug } = await params;

  const gym = await queryGymsBySlug({ slug });
  // console.log("slug", slug);
  console.log("gym", gym);

  return (
    <>
      <div className="relative aspect-[16/9] max-h-[calc(100vh-125px)] w-full overflow-hidden">
        <div
          className="absolute inset-0 z-0 scale-110 blur-sm"
          style={{
            backgroundImage:
              typeof gym.heroImage === "object" && gym.heroImage?.url
                ? `url(${gym.heroImage.url})`
                : "url('/homepage/gallery.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Image
          className="relative z-10 max-h-[calc(100vh-125px)] object-contain"
          src={
            typeof gym.heroImage === "object" && gym.heroImage?.url
              ? gym.heroImage.url
              : "/homepage/gallery.jpg"
          }
          alt={gym.name}
          width={1920}
          height={955}
        />
      </div>
      <main className="xsm:px-6 flex flex-col justify-between gap-10 px-10 py-10 pb-20 sm:px-20 md:flex-row md:gap-0 lg:px-40">
        <div className="w-[55%]">
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
                  {gym.workingHours?.map((day, i) => (
                    <div className="font-nunito flex items-start gap-3" key={i}>
                      <p className="text-xl font-extrabold text-cyan-900 underline">
                        {day.days.join(" ")}:
                      </p>
                      <p className="text-xl font-extrabold text-cyan-900">
                        {day.from === 0
                          ? "Closed"
                          : `${day.from}:00 - ${day.to}:00`}
                      </p>
                    </div>
                  ))}
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
                {gym.relatedEvents.docs.map((event, index) => {
                  return <Event key={index} {...event} />;
                })}
              </motion.ul>
            )}
          </div>
        </div>
        <div className="w-[40%]">
          {gym.gallery && gym.gallery.length > 0 && (
            <>
              <h2 className="my-text-stroke2 mb-5 text-2xl font-extrabold text-amber-400">
                Images from {gym.name}:
              </h2>
              <div className="aspect-auto overflow-hidden rounded-xl border-2 border-cyan-900/30 shadow-xl shadow-cyan-900/40">
                <EventGallery gallery={gym.gallery} />
              </div>
            </>
          )}
        </div>
      </main>
    </>
  );
};

export default Page;

const queryGymsBySlug = cache(async ({ slug }: { slug: string }) => {
  const payload = await getPayload({ config });

  const result = await payload.find({
    collection: "gyms",
    limit: 1,
    pagination: false,
    where: {
      slug: {
        equals: slug,
      },
    },
    depth: 2,
  });

  return result.docs?.[0] || null;
});

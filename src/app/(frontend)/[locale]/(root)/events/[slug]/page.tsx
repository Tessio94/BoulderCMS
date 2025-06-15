// import Image from "next/image";

import { RenderHTML } from "@/components/RenderHTML";
import config from "@payload-config";
import Image from "next/image";
import { getPayload } from "payload";
import { cache } from "react";

const Page = async ({ params }) => {
  const { slug } = await params;

  const event = await queryEventsBySlug({ slug });
  //   console.log("event :", event);
  return (
    <>
      <Image
        className="max-h-screen aspect-auto"
        src={
          typeof event.heroImage === "object" && event.heroImage?.url
            ? event.heroImage.url
            : "/homepage/gallery.jpg"
        }
        alt={event.title}
        width={1920}
        height={1080}
      />
      <main className="pt-10 pb-20 xsm:px-6 px-10 sm:px-20 lg:px-40 flex flex-col md:gap-0 gap-10 md:flex-row justify-between">
        <div className="basis-[60%]">
          <div className="mb-10">
            <h2 className="text-3xl font-bold mb-5">{event.title}</h2>
            <p className="text-2xl">{event.description}</p>
          </div>

          {event.content && <RenderHTML data={event.content} />}
        </div>
        <div className="basis-[35%]">
          <div className="shadow-2xl border-2 border-cyan-900/30 rounded-2xl pb-10">
            <Image
              className="max-h-screen aspect-auto rounded-t-2xl mb-5"
              src={
                typeof event.heroImage === "object" && event.heroImage?.url
                  ? event.heroImage.url
                  : "/homepage/gallery.jpg"
              }
              alt={event.title}
              width={1920}
              height={1080}
            />
            <div className="px-5">
              <p className="text-xl mb-5 font-bold">Qualifikation</p>
              <div className="flex justify-between mb-10">
                <div>
                  <p>Zeltraum</p>
                  <time dateTime="2025-04-24">24.04.</time> –{" "}
                  <time dateTime="2025-05-24">24.05.2025</time>
                </div>
                <div>
                  <p>Anmeldung</p>
                  <time dateTime="2025-04-24">08.04.</time> –{" "}
                  <time dateTime="2025-05-24">24.05.2025</time>
                </div>
              </div>
              <div className="flex flex-col gap-5">
                <button className="w-full py-2 bg-cyan-100/80 text-cyan-900 rounded-2xl cursor-pointer hover:bg-cyan-900/40 transition-all duration-500">
                  ANMELDEN
                </button>
                <button className="w-full py-2 bg-cyan-100/80 text-cyan-900 rounded-2xl cursor-pointer hover:bg-cyan-900/40 transition-all duration-500">
                  ERGENISSE ANZEIGEN
                </button>
                <button className="w-full py-2 bg-cyan-100/80 text-cyan-900 rounded-2xl cursor-pointer hover:bg-cyan-900/40 transition-all duration-500">
                  ERGEBNISSE EINTRAGEN
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
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

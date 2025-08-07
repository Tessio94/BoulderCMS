// import Image from "next/image";

import { DateRangeDisplay } from "@/components/DateRangeDisplay";
import { EventGallery } from "@/components/EventGallery";
import { RenderHTML } from "@/components/RenderHTML";
import config from "@payload-config";
import Image from "next/image";
import Link from "next/link";
import { getPayload } from "payload";
import { cache } from "react";

const Page = async ({ params }) => {
	const { slug } = await params;

	const event = await queryEventsBySlug({ slug });
	// console.log("event :", event);
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
			<main className="py-10 pb-20 xsm:px-6 px-10 sm:px-20 lg:px-40 flex flex-col md:gap-0 gap-10 md:flex-row justify-between">
				<div className="basis-[60%]">
					<div className="mb-5">
						<h2 className="w-fit text-3xl relative mb-5 my-text-stroke2 font-extrabold text-amber-400 text-shadow-cyan-900 text-shadow-lg after:absolute after:top-[110%] after:left-0 after:h-[5px] after:w-[20%] after:rounded-2xl after:border-[1px] after:border-cyan-900 after:bg-amber-400 after:content-['']">
							{event.title}
						</h2>
						<div className="mt-4 flex gap-2 items-center">
							<p className="text-xl my-text-stroke2">Location: </p>
							<Link
								href={`/gyms/${event.gym.slug}`}
								className="relative text-xl my-text-stroke2 text-shadow-lg text-amber-400 text-shadow-cyan-900 font-extrabold after:absolute after:top-[100%] after:left-0 after:h-[3px] after:w-[100%] after:rounded-2xl after:border-[1px] after:border-cyan-900 after:bg-amber-400 after:content-[''] hover:after:bg-cyan-900 after:transition-all after:duration-300"
							>
								{event.gym.name}
							</Link>
						</div>
						<p className="text-2xl my-text-stroke2 mt-10">
							{event.description}
						</p>
					</div>

					{event.content && <RenderHTML data={event.content} />}
				</div>
				<div className="basis-[35%] text-cyan-900">
					<div className="shadow-2xl border-2 border-cyan-900/30 rounded-2xl pb-10">
						<Image
							className="max-h-screen aspect-auto rounded-t-2xl mb-5"
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
							<p className="text-xl mb-5 font-bold">Qualification</p>
							<div className="flex justify-between mb-10">
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
								<button className="w-full py-2 bg-cyan-100/80 text-cyan-900 rounded-2xl cursor-pointer hover:bg-cyan-900/40 transition-all duration-500 uppercase">
									log in
								</button>
								<button className="w-full py-2 bg-cyan-100/80 text-cyan-900 rounded-2xl cursor-pointer hover:bg-cyan-900/40 transition-all duration-500 uppercase">
									show results
								</button>
								<button className="w-full py-2 bg-cyan-100/80 text-cyan-900 rounded-2xl cursor-pointer hover:bg-cyan-900/40 transition-all duration-500 uppercase">
									submit results
								</button>
							</div>
						</div>
					</div>
				</div>
			</main>
			{event.gallery && (
				<>
					<h2 className="mb-5 text-2xl xsm:mx-6 mx-10 sm:mx-20 lg:mx-40 my-text-stroke2 text-amber-400 font-extrabold">
						Images from past event:
					</h2>
					<div className="border-2 border-cyan-900/30 max-w-full md:max-w-[60%] xl:max-w-[50%] xxl:max-w-[40%] aspect-auto mb-20 xsm:mx-6 mx-10 sm:mx-20 lg:mx-40 shadow-xl shadow-cyan-900/40 rounded-xl overflow-hidden">
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

import { getPayload } from "payload";
import { cache } from "react";
import config from "@payload-config";
import Image from "next/image";
import { EventGallery } from "@/components/EventGallery";
import { FaPhoneAlt } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { TbWorld } from "react-icons/tb";
import { FaLocationDot } from "react-icons/fa6";

const page = async ({ params }) => {
	const { slug } = await params;

	const gym = await queryGymsBySlug({ slug });
	console.log("slug", slug);
	console.log("gym", gym);

	return (
		<>
			<Image
				className="max-h-screen aspect-auto"
				src={
					typeof gym.heroImage === "object" && gym.heroImage?.url
						? gym.heroImage.url
						: "/homepage/gallery.jpg"
				}
				alt={gym.name}
				width={1920}
				height={1080}
			/>
			<main className="py-10 pb-20 xsm:px-6 px-10 sm:px-20 lg:px-40 flex flex-col md:gap-0 gap-10 md:flex-row justify-between">
				<div className="basis-[60%]">
					<div className="mb-5">
						<h2 className="w-fit text-3xl relative mb-5 my-text-stroke2 font-extrabold text-amber-400 text-shadow-cyan-900 text-shadow-lg after:absolute after:top-[110%] after:left-0 after:h-[5px] after:w-[20%] after:rounded-2xl after:border-[1px] after:border-cyan-900 after:bg-amber-400 after:content-['']">
							{gym.name}
						</h2>
					</div>
					<div className="flex flex-col gap-6 mt-10 text-cyan-900 text-xl">
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
								<p className="my-text-stroke text-cyan-900 text-2xl font-extrabold mt-8">
									Working hours:
								</p>
								<div className="flex flex-col gap-4 mt-2">
									{gym.workingHours?.map((day, i) => (
										<div className="flex gap-3 items-start font-nunito" key={i}>
											<p className=" text-cyan-900 font-extrabold text-xl underline">
												{day.days.join(" ")}:
											</p>
											<p className=" text-cyan-900 font-extrabold text-xl">
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
				</div>
			</main>
			{gym.gallery && gym.gallery.length > 0 && (
				<>
					<h2 className="mb-5 text-2xl xsm:mx-6 mx-10 sm:mx-20 lg:mx-40 my-text-stroke2 text-amber-400 font-extrabold">
						Images from {gym.name}:
					</h2>
					<div className="border-2 border-cyan-900/30 max-w-full md:max-w-[60%] xl:max-w-[50%] xxl:max-w-[40%] aspect-auto mb-20 xsm:mx-6 mx-10 sm:mx-20 lg:mx-40 shadow-xl shadow-cyan-900/40 rounded-xl overflow-hidden">
						<EventGallery gallery={gym.gallery} />
					</div>
				</>
			)}
		</>
	);
};

export default page;

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
	});

	return result.docs?.[0] || null;
});

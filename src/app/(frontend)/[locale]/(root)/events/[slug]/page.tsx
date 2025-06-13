// import Image from "next/image";

import { RenderHTML } from "@/components/RenderHTML";
import config from "@payload-config";
import Image from "next/image";
import { getPayload } from "payload";
import { cache } from "react";

const Page = async ({ params }) => {
	const { slug } = await params;

	const event = await queryEventsBySlug({ slug });
	console.log("event :", event);
	return (
		<>
			<Image
				src={event.heroImage ? event.heroImage : "/homepage/gallery.jpg"}
				alt={event.title}
				width={1920}
				height={1080}
			/>
			<main>{event.content && <RenderHTML data={event.content} />}</main>
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

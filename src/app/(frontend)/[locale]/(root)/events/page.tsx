// import { useTranslations } from "next-intl";
import EventsLanding from "@/components/EventsLanding";
import EventsSection from "@/components/EventsSection";
import config from "@payload-config";
import { getPayload } from "payload";

export default async function Events() {
	// const t = useTranslations("Landing");
	const payload = await getPayload({ config });

	const { docs: events } = await payload.find({
		collection: "events",
		sort: "-from",
	});
	console.log(events);
	console.log(events[0].content);
	return (
		<>
			<EventsLanding />
			<EventsSection events={events} />
		</>
	);
}

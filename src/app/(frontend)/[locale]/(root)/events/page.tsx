import { EventsContent } from "@/components/pageWrappers/EventsContent";
import { getPayload } from "payload";
import config from "@payload-config";

export default async function Events() {
	const payload = await getPayload({ config });

	const events = await payload.find({
		collection: "events",
	});

	return <EventsContent initialEvents={events.docs ?? []} />;
}

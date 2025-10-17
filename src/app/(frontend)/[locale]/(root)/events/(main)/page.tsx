import { EventsContent } from "@/components/pageWrappers/EventsContent";
import { getPayload } from "payload";
import config from "@payload-config";

export default async function Events({
  params,
}: {
  params: { locale: string };
}) {
  const payload = await getPayload({ config });
  const locale = params.locale;
  console.log("locale3", locale);

  const events = await payload.find({
    collection: "events",
    sort: "-from",
    locale: locale,
  });
  console.log("events1", events);
  return <EventsContent initialEvents={events.docs ?? []} locale={locale} />;
}

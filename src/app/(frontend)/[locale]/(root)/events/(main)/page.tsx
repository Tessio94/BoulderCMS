import { EventsContent } from "@/components/pageWrappers/EventsContent";
import { getPayload } from "payload";
import config from "@payload-config";
import { LocaleType } from "@/types";

export default async function Events({
  params,
}: {
  params: Promise<{ locale: LocaleType }>;
}) {
  const payload = await getPayload({ config });
  const { locale } = await params;
  // console.log("locale3", locale);

  const events = await payload.find({
    collection: "events",
    sort: "-from",
    locale,
  });
  // console.log("events1", events);
  return <EventsContent initialEvents={events.docs ?? []} locale={locale} />;
}

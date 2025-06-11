// import { useTranslations } from "next-intl";
import EventsLanding from "@/components/EventsLanding";
import EventsSection from "@/components/EventsSection";

export default function Events() {
  // const t = useTranslations("Landing");

  return (
    <>
      <EventsLanding />
      <EventsSection />
    </>
  );
}

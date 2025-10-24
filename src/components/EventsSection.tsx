import { useTranslations } from "next-intl";
import EventCard from "./EventCard";
import EventsForm from "./EventsForm";
// import { EventType } from "@/types";
import * as motion from "motion/react-client";
import { Event } from "@/payload-types";
import { Filters } from "@/types";

interface EventsSectionProps {
  events: Event[];
  filters: Filters;
  onChange: (patch: Partial<Filters>) => void;
}

const EventsSection = ({ events, filters, onChange }: EventsSectionProps) => {
  const heading = useTranslations("EventsSection");

  return (
    <main
      className="bg-cyan-200/10 px-5 pt-[120px] sm:px-[50px] lg:px-[60px] 2xl:px-40"
      id="events"
    >
      <EventsForm filters={filters} onChange={onChange} />
      <h5 className="my-text-stroke relative mb-8 w-fit text-4xl font-extrabold text-cyan-900 after:absolute after:top-[118%] after:left-10 after:h-[5px] after:w-[45%] after:translate-x-[-50%] after:rounded-2xl after:border after:border-amber-400 after:bg-cyan-900 after:content-['']">
        {heading("resultsHeading")}
      </h5>
      <motion.ul className="mb-[50px] flex flex-col gap-12 md:mb-20">
        {events.map((ev) => {
          // console.log("ev", ev);
          return <EventCard key={ev.id} {...ev} />;
        })}
      </motion.ul>
    </main>
  );
};

export default EventsSection;

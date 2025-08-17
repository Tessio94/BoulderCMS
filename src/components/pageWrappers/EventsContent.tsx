"use client";

import { useQuery } from "@tanstack/react-query";
import EventsLanding from "@/components/EventsLanding";
import EventsSection from "@/components/EventsSection";
import { useState } from "react";
import Image from "next/image";

export const EventsContent = ({ initialEvents }) => {
  const [filters, setFilters] = useState({
    from: "",
    to: "",
    hall: "",
    term: "",
    sort: "desc",
  });

  const { data: events = [], isLoading } = useQuery({
    queryKey: ["events", filters],
    queryFn: async () => {
      const query = new URLSearchParams(filters).toString();
      const res = await fetch(`/api/eventsRoute?${query}`);
      const json = await res.json();
      // console.log(json.docs);
      return json.docs;
    },
    // enabled: false, // run only when triggered
    initialData: initialEvents,
  });

  return (
    <>
      {!isLoading && events.length > 0 ? (
        <EventsLanding event={events[0]} />
      ) : (
        <div className="relative h-screen min-h-[800px] w-full shadow-2xl shadow-amber-400/40 lg:min-h-[unset]">
          <Image
            src="/homepage/boulder_1920.jpg"
            alt="gym boulder"
            fill
            className="object-cover object-center"
            sizes="100vw"
          />
        </div>
      )}
      <EventsSection
        events={events}
        filters={filters}
        onChange={(f) => setFilters({ ...filters, ...f })}
      />
    </>
  );
};

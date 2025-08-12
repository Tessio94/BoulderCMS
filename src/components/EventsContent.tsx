"use client";

import { useQuery } from "@tanstack/react-query";
import EventsLanding from "./EventsLanding";
import EventsSection from "./EventsSection";
import { useState } from "react";

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
      const res = await fetch(`/api/events?${query}`);
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
        <div className="relative h-screen min-h-[800px] max-h-screen w-full bg-[url(/homepage/boulder_1920.jpg)] bg-cover bg-no-repeat shadow-2xl shadow-amber-400/40"></div>
      )}
      <EventsSection
        events={events}
        filters={filters}
        onChange={(f) => setFilters({ ...filters, ...f })}
      />
    </>
  );
};

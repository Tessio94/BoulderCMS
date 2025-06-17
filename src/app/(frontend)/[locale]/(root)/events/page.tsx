"use client";
// import { useTranslations } from "next-intl";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { EventsContent } from "@/components/EventsContent";

export default function Events() {
	const [queryClient] = useState(() => new QueryClient());

	const [filters, setFilters] = useState({
		from: "",
		to: "",
		hall: "",
		term: "",
		sort: "desc",
	});

	return (
		<QueryClientProvider client={queryClient}>
			<EventsContent filters={filters} setFilters={setFilters} />
		</QueryClientProvider>
	);
}

"use client";

import { useTranslations } from "next-intl";
import Event from "./Event";
import EventsForm from "./EventsForm";
// import { EventType } from "@/types";
import { motion } from "framer-motion";

const EventsSection = ({ events, filters, onChange }) => {
	const heading = useTranslations("EventsSection");

	return (
		<main
			className="bg-cyan-200/10 px-[20px] pt-[120px] sm:px-[50px] lg:px-[60px] 2xl:px-[160px]"
			id="events"
		>
			<EventsForm filters={filters} onChange={onChange} />
			<h5 className="my-text-stroke relative mb-8 w-fit text-4xl font-extrabold text-cyan-900 after:absolute after:top-[118%] after:left-10 after:h-[5px] after:w-[45%] after:translate-x-[-50%] after:rounded-2xl after:border-[1px] after:border-amber-400 after:bg-cyan-900 after:content-['']">
				{heading("resultsHeading")}
			</h5>
			<motion.ul className="mb-[50px] flex flex-col gap-12 md:mb-[80px]">
				{events.map((event, index) => {
					return <Event key={index} {...event} />;
				})}
			</motion.ul>
		</main>
	);
};

export default EventsSection;

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function eventDateFormat(date: string) {
	// return new Date(date).toISOString().split("T")[0].replaceAll("-", "/");

	return new Date(date)
		.toISOString()
		.split("T")[0]
		.split("-")
		.reverse()
		.join("/");
}

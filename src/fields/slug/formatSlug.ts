import type { FieldHook } from "payload";

export const formatSlug = (val: string): string =>
	val
		.replace(/ /g, "-")
		.replace(/[^\w-]+/g, "")
		.toLowerCase();

export const formatSlugHook =
	(fallback: string): FieldHook =>
	({ data, operation, value }) => {
		console.log("data :", data);
		console.log("operation :", operation);
		console.log("value :", value);

		if (typeof value === "string") {
			return formatSlug(value);
		}

		if (operation === "create" || !data?.slug) {
			const fallbackData = data?.[fallback] || data?.[fallback];

			if (fallbackData && typeof fallbackData === "string") {
				return formatSlug(fallbackData);
			}
		}

		return value;
	};

// export const formatSlug = (val: string): string =>
// val
//   .trim()
//   .toLowerCase()
//   .replace(/\s+/g, "-")           // Replace all whitespace with a single dash
//   .replace(/[^\w-]/g, "")         // Remove all non-word chars except dash
//   .replace(/--+/g, "-")           // Collapse multiple dashes
//   .replace(/^-+|-+$/g, "");       // Trim leading/trailing dashes

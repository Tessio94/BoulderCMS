import type { CollectionConfig } from "payload";

export const Events: CollectionConfig = {
	slug: "events",
	admin: {
		defaultColumns: ["title", "slug", "updatedAt"],
		useAsTitle: "title",
	},
	orderable: true,

	fields: [
		{
			name: "title",
			type: "text",
			required: true,
		},
		{
			name: "from",
			type: "date",
			required: true,
		},
		{
			name: "until",
			type: "date",
			required: true,
		},
		{
			name: "description",
			type: "text",
			admin: {
				description: "Maximum up to 20 words",
			},
		},
	],
};

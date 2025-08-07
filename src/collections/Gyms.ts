import { formatSlugHook } from "@/fields/slug/formatSlug";
import type { CollectionConfig } from "payload";

export const Gyms: CollectionConfig = {
	slug: "gyms",
	access: {
		read: () => true,
	},
	admin: {
		defaultColumns: ["name", "slug"],
		useAsTitle: "name",
	},
	orderable: true,
	fields: [
		{
			name: "name",
			type: "text",
			required: true,
		},
		{
			name: "heroImage",
			type: "upload",
			relationTo: "media",
		},
		{
			name: "location",
			type: "text",
			required: true,
		},
		{
			name: "phone",
			type: "text",
		},
		{
			name: "email",
			type: "email",
		},
		{
			name: "website",
			type: "text",
		},
		{
			name: "information",
			type: "text",
			required: true,
		},
		{
			name: "workingHours",
			type: "array",
			label: "Working hours",
			fields: [
				{
					name: "days",
					type: "select",
					hasMany: true,
					options: [
						{ label: "Mon", value: "mon" },
						{ label: "Tue", value: "tue" },
						{ label: "Wed", value: "wed" },
						{ label: "Thu", value: "thu" },
						{ label: "Fri", value: "fri" },
						{ label: "Sat", value: "sat" },
						{ label: "Sun", value: "sun" },
					],
					required: true,
				},
				{
					name: "from",
					type: "number",
					label: "From",
					required: true,
				},
				{
					name: "to",
					type: "number",
					label: "To",
					required: true,
				},
			],
		},
		{
			name: "gallery",
			label: "Gallery",
			type: "upload",
			relationTo: "media",
			hasMany: true,
		},
		{
			name: "slug",
			type: "text",
			unique: true,
			admin: {
				readOnly: true,
			},
			hooks: {
				beforeValidate: [formatSlugHook("name")],
			},
		},
	],
};

import { formatSlugHook } from "@/fields/slug/formatSlug";
import type { CollectionConfig } from "payload";

import {
	FixedToolbarFeature,
	HeadingFeature,
	HorizontalRuleFeature,
	InlineToolbarFeature,
	lexicalEditor,
} from "@payloadcms/richtext-lexical";

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
			// maxLength: 20,
			// admin: {
			// 	description: "Maximum up to 20 words",
			// },
		},
		{
			name: "location",
			type: "text",
		},
		{
			type: "tabs",
			tabs: [
				{
					fields: [
						{
							name: "heroImage",
							type: "upload",
							relationTo: "media",
						},
						{
							name: "content",
							type: "richText",
							editor: lexicalEditor({
								features: ({ rootFeatures }) => {
									return [
										...rootFeatures,
										HeadingFeature({
											enabledHeadingSizes: ["h2", "h3", "h4"],
										}),
										FixedToolbarFeature(),
										InlineToolbarFeature(),
										HorizontalRuleFeature(),
									];
								},
							}),
							label: false,
							required: true,
						},
					],
					label: "Content",
				},
			],
		},
		{
			name: "cardImage",
			type: "upload",
			relationTo: "media",
		},
		{
			name: "timeframe",
			type: "group",
			required: true,
			fields: [
				{
					name: "start",
					type: "date",
					required: true,
				},
				{
					name: "end",
					type: "date",
					required: false,
				},
			],
		},
		{
			name: "registration",
			type: "group",
			required: true,
			fields: [
				{ name: "start", type: "date", required: true },
				{
					name: "end",
					type: "date",
					required: false,
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
			// required: true,
			unique: true,
			admin: {
				readOnly: true,
			},
			hooks: {
				beforeValidate: [formatSlugHook("title")],
			},
		},
	],
};

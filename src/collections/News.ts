import { formatSlugHook } from "@/fields/slug/formatSlug";
import type { CollectionConfig } from "payload";

import {
  FixedToolbarFeature,
  HeadingFeature,
  HorizontalRuleFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from "@payloadcms/richtext-lexical";

export const News: CollectionConfig = {
  slug: "news",
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
      name: "intro",
      type: "text",
    },
    {
      type: "tabs",
      tabs: [
        {
          fields: [
            {
              name: "newsImage",
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

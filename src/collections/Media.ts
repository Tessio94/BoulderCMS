import type { CollectionConfig } from "payload";

export const Media: CollectionConfig = {
  slug: "media",
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
    },
    {
      name: "backgroundColor",
      type: "text",
      label: "Background Color",
      admin: {
        description:
          "Used for transparent PNG logos - write image hex code that suit background.",
      },
    },
  ],
  upload: true,
};

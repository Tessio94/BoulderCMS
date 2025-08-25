import { CollectionConfig } from "payload";

export const Stages: CollectionConfig = {
  slug: "stages",
  admin: { useAsTitle: "name", defaultColumns: ["name", "event", "updatedAt"] },
  fields: [
    {
      name: "event",
      type: "relationship",
      relationTo: "events",
      required: true,
    },
    { name: "name", type: "text", required: true },
    { name: "location", type: "text" },
    { name: "image", type: "upload", relationTo: "media" },
    {
      name: "goals",
      type: "array",
      fields: [
        { name: "name", type: "text", required: true },
        { name: "baseScore", type: "number", required: true },
        { name: "coefficient", type: "number", defaultValue: 1 },
      ],
    },
  ],
};

import type { CollectionConfig } from "payload";

export const Results: CollectionConfig = {
  slug: "results",
  admin: {
    useAsTitle: "id",
    defaultColumns: ["member", "event", "stage", "points"],
  },
  fields: [
    {
      name: "member",
      type: "relationship",
      relationTo: "members",
      required: true,
    },
    {
      name: "event",
      type: "relationship",
      relationTo: "events",
      required: true,
    },
    {
      name: "stage",
      type: "relationship",
      relationTo: "stages", // if you move stages out
      required: true,
    },
    {
      name: "goal",
      type: "text",
      required: true,
    },
    {
      name: "points",
      type: "number",
      required: true,
    },

    // {
    //   name: "category",
    //   type: "relationship",
    //   relationTo: "events.category",
    //   required: true,
    // },
  ],
  indexes: [
    {
      fields: ["member", "event", "stage"],
      unique: true, // for combination of fields to be unique
    },
  ],
};

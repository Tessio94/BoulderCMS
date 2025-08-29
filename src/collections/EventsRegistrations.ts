import type { CollectionConfig } from "payload";

export const EventRegistrations: CollectionConfig = {
  slug: "event-registrations",
  admin: {
    useAsTitle: "id",
    defaultColumns: ["event", "member", "createdAt"],
  },
  access: {
    create: ({ req }) => !!req.user,
    read: () => true,
  },
  fields: [
    {
      name: "event",
      type: "relationship",
      relationTo: "events",
      required: true,
    },
    {
      name: "member",
      type: "relationship",
      relationTo: "members",
      required: true,
    },
    {
      name: "category",
      type: "relationship",
      relationTo: "categories",
      required: true,
    },
    {
      name: "order",
      type: "number",
    },
  ],
  indexes: [
    {
      fields: ["member", "event"],
      unique: true, // for combination of fields to be unique
    },
  ],
};

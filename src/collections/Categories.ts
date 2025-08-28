import { CollectionConfig } from "payload";

export const Categories: CollectionConfig = {
  slug: "categories",
  admin: { useAsTitle: "name" },
  fields: [
    {
      name: "event",
      type: "relationship",
      relationTo: "events",
      required: true,
    },
    {
      name: "name",
      type: "text",
      required: true,
      admin: { readOnly: true },
      hooks: {
        beforeValidate: [
          ({ siblingData }) => {
            if (siblingData.ageFrom && siblingData.ageTo) {
              return `${siblingData.gender} - (${siblingData.ageFrom} - ${siblingData.ageTo})`;
            }

            if (siblingData.ageFrom && !siblingData.ageTo) {
              return `${siblingData.gender} - ${siblingData.ageFrom}+`;
            }

            if (!siblingData.ageFrom && siblingData.ageTo) {
              return `${siblingData.gender} - ${siblingData.ageTo}-`;
            }

            return siblingData.name;
          },
        ],
      },
    },
    { name: "ageFrom", type: "number" },
    { name: "ageTo", type: "number" },
    { name: "gender", type: "select", options: ["male", "female"] },
    {
      name: "registrations",
      type: "relationship",
      relationTo: "event-registrations",
      hasMany: true,
      admin: {
        hidden: true,
      },
    },
  ],
};

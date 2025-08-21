import type { CollectionConfig } from "payload";

export const Members: CollectionConfig = {
  slug: "members",
  admin: {
    useAsTitle: "fullName",
  },
  access: {
    // create: ({ req }) => {
    //   if (req.user) return false;

    //   return true;
    // },

    create: () => true,
  },
  auth: true,
  fields: [
    {
      name: "firstName",
      type: "text",
      required: true,
    },
    {
      name: "lastName",
      type: "text",
      required: true,
    },
    {
      name: "userName",
      type: "text",
      required: true,
    },
    {
      name: "phoneNumber",
      type: "text",
    },
    {
      name: "termsAcceptedAt",
      type: "date",
      admin: {
        description: "Timestamp of when the user accepted terms",
      },
    },
    {
      name: "fullName",
      type: "text",
      admin: {
        disabled: true,
      },
    },
    {
      name: "registrations",
      type: "relationship",
      relationTo: "event-registrations",
      hasMany: true,
    },
  ],
  hooks: {
    beforeValidate: [
      ({ data }) => {
        if (data.firstName || data.lastName) {
          data.fullName =
            `${data.firstName ?? ""} ${data.lastName ?? ""}`.trim();
        }
        return data;
      },
    ],
  },
};

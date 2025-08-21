import { CollectionConfig } from "payload";

export const Categories: CollectionConfig = {
  slug: "categories",
  admin: { useAsTitle: "name" },
  fields: [
    { name: "name", type: "text", required: true },
    { name: "ageFrom", type: "number" },
    { name: "ageTo", type: "number" },
    { name: "gender", type: "select", options: ["male", "female"] },
  ],
};

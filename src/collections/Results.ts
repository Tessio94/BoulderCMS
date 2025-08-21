import type { CollectionConfig } from "payload";

export const Results: CollectionConfig = {
  slug: "results",
  admin: {
    useAsTitle: "id",
    defaultColumns: ["event", "member"],
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
    // {
    //   name: "category",
    //   type: "relationship",
    //   relationTo: "events.category",
    //   required: true,
    // },
  ],
  //     {
  //       name: "stageResults",
  //       type: "array",
  //       fields: [
  //         {
  //           name: "stage",
  //           type: "relationship",
  //           relationTo: "events.stages",
  //           required: true,
  //         },
  //         {
  //           name: "goalResults",
  //           type: "array",
  //           fields: [
  //             { name: "goal", type: "text", required: true },
  //             { name: "score", type: "number", required: true },
  //             { name: "multiplier", type: "number", defaultValue: 1 },
  //           ],
  //         },
  //         { name: "totalPoints", type: "number" },
  //       ],
  //     },
  //     { name: "totalEventPoints", type: "number" },
  //   ],
  //   hooks: {
  //     beforeChange: [
  //       ({ data }) => {
  //         if (data.stageResults && Array.isArray(data.stageResults)) {
  //           data.totalEventPoints = data.stageResults.reduce(
  //             (acc, s) => acc + (s.points || 0),
  //             0,
  //           );
  //         }
  //         return data;
  //       },
  //     ],
  //   },
};

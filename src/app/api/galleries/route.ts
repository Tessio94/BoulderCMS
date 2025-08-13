import { NextRequest, NextResponse } from "next/server";
import { getPayload, Where } from "payload";
import config from "@payload-config";

export async function GET(req: NextRequest) {
  const payload = await getPayload({ config });

  const { searchParams } = new URL(req.url);
  console.log(searchParams);
  const search = searchParams.get("search") || "";

  const query: { where: Where } = {
    where: {
      or: [{ title: { like: search } }, { description: { like: search } }],
    },
  };

  const galleries = await payload.find({
    collection: "events",
    select: {
      slug: true,
      title: true,
      gym: true,
      location: true,
      from: true,
      gallery: true,
      heroImage: true,
    },
    ...query,
  });

  return NextResponse.json(galleries);
}

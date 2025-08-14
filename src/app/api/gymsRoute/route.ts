import { NextRequest, NextResponse } from "next/server";
import { getPayload, Where } from "payload";
import config from "@payload-config";

export async function GET(req: NextRequest) {
  const payload = await getPayload({ config });

  const { searchParams } = new URL(req.url);

  const search = searchParams.get("search") || "";

  const query: { where: Where } = {
    where: {
      or: [{ name: { like: search } }, { location: { like: search } }],
    },
  };

  const gyms = await payload.find({
    collection: "gyms",
    ...query,
  });

  return NextResponse.json(gyms);
}

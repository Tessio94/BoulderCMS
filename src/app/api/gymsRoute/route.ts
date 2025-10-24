import { NextRequest, NextResponse } from "next/server";
import { getPayload, Where } from "payload";
import config from "@payload-config";
import { LocaleType } from "@/types";

export async function GET(req: NextRequest) {
  const payload = await getPayload({ config });

  const { searchParams } = new URL(req.url);

  const search = searchParams.get("search") || "";
  const locale = searchParams.get("locale") as LocaleType;

  const query: { where: Where } = {
    where: {
      or: [{ name: { like: search } }, { location: { like: search } }],
    },
  };

  const gyms = await payload.find({
    collection: "gyms",
    locale,
    ...query,
  });

  return NextResponse.json(gyms);
}

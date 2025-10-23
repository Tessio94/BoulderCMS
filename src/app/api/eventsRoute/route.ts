import { NextRequest, NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "@payload-config";
import { LocaleType } from "@/types";

type queryType = {
  where: {
    from?: {
      greater_than_equal?: string | null;
      less_than_equal?: string | null;
    };
    gym?: { equals: string | null };
    or?: Array<{
      title?: { like: string | null };
      description?: { like: string | null };
    }>;
  };
  sort: "from" | "-from";
};

export async function GET(req: NextRequest) {
  const payload = await getPayload({ config });

  const { searchParams } = new URL(req.url);

  const locale = searchParams.get("locale") as LocaleType;

  const query: queryType = {
    where: {},
    sort: searchParams.get("sort") === "asc" ? "from" : "-from",
  };

  if (searchParams.get("from")) {
    query.where.from = { greater_than_equal: searchParams.get("from") };
  }

  if (searchParams.get("to")) {
    query.where.from = {
      ...query.where.from,
      less_than_equal: searchParams.get("to"),
    };
  }

  if (searchParams.get("hall")) {
    // console.log(searchParams.get("hall"));
    query.where.gym = { equals: searchParams.get("hall") };
  }

  if (searchParams.get("term")) {
    query.where.or = [
      { title: { like: searchParams.get("term") } },
      { description: { like: searchParams.get("term") } },
    ];
  }

  const events = await payload.find({
    collection: "events",
    locale,
    ...query,
  });

  return NextResponse.json(events);
}

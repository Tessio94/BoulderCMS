import { NextRequest, NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "@payload-config";

import {
  event_registrations,
  members,
  results,
} from "@/payload-generated-schema";
import { and, desc, eq, sum } from "@payloadcms/db-postgres/drizzle";

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const eventIdParam = url.searchParams.get("eventId");
    const categoryIdParam = url.searchParams.get("categoryId");

    if (!eventIdParam || !categoryIdParam) {
      return NextResponse.json({ error: "Missing params" }, { status: 400 });
    }

    const eventId = Number(eventIdParam);
    const categoryId = Number(categoryIdParam);

    const payload = await getPayload({ config });

    const totals = await payload.db.drizzle
      .select({
        member: results.member,
        name: members.fullName,
        points: sum(results.points),
      })
      .from(results)
      .leftJoin(members, eq(results.member, members.id))
      .where(and(eq(results.event, eventId), eq(results.category, categoryId)))
      .groupBy(results.member, members.fullName)
      .orderBy(desc(sum(results.points)));

    console.log("server scores", totals);

    return NextResponse.json({ totals }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        error: error.message || "Something went wrong",
      },
      { status: 5000 },
    );
  }
}

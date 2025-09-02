import { NextRequest, NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "@payload-config";

import { categories, events, results } from "@/payload-generated-schema";
import { desc, eq, sum } from "@payloadcms/db-postgres/drizzle";

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const memberIdParam = url.searchParams.get("memberId");

    if (!memberIdParam) {
      return NextResponse.json({ error: "Missing user id" }, { status: 400 });
    }

    const memberId = Number(memberIdParam);

    const payload = await getPayload({ config });

    const totals = await payload.db.drizzle
      .select({
        event: results.event,
        eventName: events.title,
        category: results.category,
        categoryName: categories.name,
        member: results.member,
        points: sum(results.points),
      })
      .from(results)
      .leftJoin(events, eq(results.event, events.id))
      .leftJoin(categories, eq(results.category, categories.id))
      .where(eq(results.member, memberId))
      .groupBy(
        results.event,
        results.category,
        events.title,
        categories.name,
        results.member,
      );
    //   .orderBy(desc(results.createdAt));

    return NextResponse.json({ totals }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        error: error.message || "Something went wrong",
      },
      { status: 5000 },
    );
  }
}

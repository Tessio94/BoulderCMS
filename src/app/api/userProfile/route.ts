import { NextRequest, NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "@payload-config";

import {
  categories,
  events,
  events_locales,
  results,
} from "@/payload-generated-schema";
import { eq, sum, and } from "@payloadcms/db-postgres/drizzle";
import { LocaleType } from "@/types";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const memberIdParam = searchParams.get("memberId");
    const localeParam = searchParams.get("locale");

    if (localeParam !== "en" && localeParam !== "de") {
      throw new Error("Invalid locale");
    }
    const locale: LocaleType = localeParam;

    if (!memberIdParam) {
      return NextResponse.json({ error: "Missing user id" }, { status: 400 });
    }

    const memberId = Number(memberIdParam);

    const payload = await getPayload({ config });

    const totals = await payload.db.drizzle
      .select({
        event: results.event,
        eventName: events_locales.title,
        category: results.category,
        categoryName: categories.name,
        member: results.member,
        points: sum(results.points),
      })
      .from(results)
      .leftJoin(events, eq(results.event, events.id))
      .leftJoin(events_locales, eq(events.id, events_locales._parentID))
      .leftJoin(categories, eq(results.category, categories.id))
      .where(
        and(eq(results.member, memberId), eq(events_locales._locale, locale)),
      )
      .groupBy(
        results.event,
        results.category,
        events_locales.title,
        categories.name,
        results.member,
      );

    return NextResponse.json({ totals }, { status: 200 });
  } catch (error) {
    let message = "Something went wrong";
    if (error instanceof Error) {
      message = error.message;
    }
    return NextResponse.json(
      {
        error: message,
      },
      { status: 500 },
    );
  }
}

import { NextRequest, NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "@payload-config";

// import { members, results, stages } from "@/payload-generated-schema";
// import { and, eq, sql, sum } from "@payloadcms/db-postgres/drizzle";

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const eventIdParam = url.searchParams.get("eventId");
    const memberIdParam = url.searchParams.get("memberId");

    if (!eventIdParam || !memberIdParam) {
      return NextResponse.json(
        { error: "Missing param arguments" },
        { status: 400 },
      );
    }

    const eventId = Number(eventIdParam);
    const memberId = Number(memberIdParam);

    const payload = await getPayload({ config });
    const userResult = await payload.find({
      collection: "results",
      where: {
        and: [
          {
            member: {
              equals: memberId,
            },
          },
          {
            event: {
              equals: eventId,
            },
          },
        ],
      },
      select: {
        createdAt: true,
        goal: true,
        id: true,
        member: true,
        points: true,
        stage: true,
      },
      depth: 1,
      sort: "createdAt",
    });

    return NextResponse.json({ userResult }, { status: 200 });
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

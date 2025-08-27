import { NextRequest, NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "@payload-config";
import { members, results, stages } from "@/payload-generated-schema";
import { and, eq } from "@payloadcms/db-postgres/drizzle";

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);

    const eventIdParam = url.searchParams.get("eventId");
    const stageIdParam = url.searchParams.get("stageId");

    if (!eventIdParam || !stageIdParam) {
      return NextResponse.json({ error: "Missing eventId" }, { status: 400 });
    }

    const eventId = Number(eventIdParam);
    const stageId = Number(stageIdParam);

    const payload = await getPayload({ config });

    const result = await payload.find({
      collection: "results",
      where: {
        and: [
          {
            event: {
              equals: eventId,
            },
          },
          {
            stage: {
              equals: stageId,
            },
          },
        ],
      },
      select: {
        createdAt: true,
        goal: true,
        id: true,
        stage: true,
      },
      depth: 1,
      pagination: false,
    });

    const data = result.docs;

    const stage = data[0].stage;
    const goals = data[0].stage.goals;

    const counts = data.reduce((acc, item) => {
      acc[item.goal] = (acc[item.goal] || 0) + 1;
      return acc;
    }, {});

    const stageInfo = goals.map((goal) => ({
      stageName: stage.name,
      stageLocation: stage.location,
      stageImage: stage.image,
      id: goal.id,
      name: goal.name,
      baseScore: goal.baseScore,
      coefficient: goal.coefficient,
      achievedCount: counts[goal.id] || 0,
    }));

    return NextResponse.json({ stageInfo }, { status: 200 });
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

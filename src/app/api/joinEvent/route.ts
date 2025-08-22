import { NextRequest, NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "@payload-config";

export async function POST(req: NextRequest) {
  try {
    const payload = await getPayload({ config });

    const body = await req.json();
    const { event: eventId, member: memberId } = body;

    if (!eventId || !memberId) {
      return NextResponse.json(
        { error: "Missing eventId or memberId" },
        { status: 400 },
      );
    }

    const existingRegistration = await payload.find({
      collection: "event-registrations",
      where: {
        event: {
          equals: eventId,
        },
        member: {
          equals: memberId,
        },
      },
      limit: 1,
    });

    if (existingRegistration.totalDocs > 0) {
      return NextResponse.json({
        message: "Already registered",
        alreadyRegistered: true,
      });
    }

    const registeredMember = await payload.create({
      collection: "event-registrations",
      data: {
        event: eventId,
        member: memberId,
      },
    });

    return NextResponse.json(registeredMember);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        error: error.message || "Something went wrong",
      },
      { status: 500 },
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const payload = await getPayload({ config });
    const url = new URL(req.url);
    const eventId = url.searchParams.get("eventId");
    const memberId = url.searchParams.get("memberId");

    if (!eventId || !memberId) {
      return NextResponse.json(
        { error: "Missing eventId or memberId" },
        { status: 400 },
      );
    }

    const existing = await payload.find({
      collection: "event-registrations",
      where: {
        event: { equals: Number(eventId) },
        member: { equals: Number(memberId) },
      },
      limit: 1,
    });

    return NextResponse.json({ alreadyRegistered: existing.totalDocs > 0 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      error: error.message || "Something went wrong",
    });
  }
}

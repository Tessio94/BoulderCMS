import { NextRequest, NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "@payload-config";

export async function POST(req: NextRequest) {
  try {
    const payload = await getPayload({ config });

    const { results } = await req.json();

    if (!Array.isArray(results) || results.length === 0) {
      return NextResponse.json(
        { error: "No results provided" },
        { status: 400 },
      );
    }

    // pogledati da li je bolje da member može updeatat rezultat
    const saved = [];
    for (const r of results) {
      try {
        const created = await payload.create({
          collection: "results",
          data: r,
        });
        saved.push(created);
      } catch (err: unknown) {
        // If unique constraint fails, surface error
        if (err instanceof Error) {
          if (err.message?.includes("duplicate key")) {
            return NextResponse.json(
              {
                error: `Result already exists for member ${r.member}, event ${r.event}, stage ${r.stage}`,
              },
              { status: 409 },
            );
          }
        }

        throw err;
      }
    }

    return NextResponse.json(
      { success: true, results: saved },
      { status: 201 },
    );
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

import { NextRequest, NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "@payload-config";

export async function GET(req: NextRequest) {
	const payload = await getPayload({ config });

	const { searchParams } = new URL(req.url);
	const query: any = {
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
		query.where.hall = { like: searchParams.get("hall") };
	}

	if (searchParams.get("term")) {
		query.where.or = [
			{ title: { like: searchParams.get("term") } },
			{ description: { like: searchParams.get("term") } },
		];
	}

	const events = await payload.find({
		collection: "events",
		...query,
	});

	return NextResponse.json(events);
}

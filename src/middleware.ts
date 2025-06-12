import createMiddleware from "next-intl/middleware";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { routing } from "./i18n/routing";

// Create the next-intl middleware
const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl;

	// Exclude /admin from locale detection/redirection
	if (pathname.startsWith("/admin")) {
		return NextResponse.next();
	}

	// All other routes use next-intl's locale-aware middleware
	return intlMiddleware(request);
}

export const config = {
	matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};

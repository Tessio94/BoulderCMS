import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
	// A list of all locales that are supported
	locales: ["en", "de"],
	localePrefix: "as-needed",

	// Used when no locale matches
	defaultLocale: "en",
	pathnames: {
		"/": "/",
		"/events": "/events",
		"/gyms": "/gyms",
		"/login": "/login",
		"/gallery": {
			de: "/galerie",
		},
		"/register": {
			de: "/registrieren",
		},
		// "/admin": "/admin",
	},
});

import { withPayload } from "@payloadcms/next/withPayload";
import createNextIntlPlugin from "next-intl/plugin";

/** @type {import('next').NextConfig} */
const nextConfig = {
	// Your Next.js config here
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(
	withPayload(nextConfig, {
		devBundleServerPackages: false,
	})
);

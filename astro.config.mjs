import vercel from "@astrojs/vercel";
import react from "@astrojs/react";
import auditLog from "@emdash-cms/plugin-audit-log";
import { defineConfig, fontProviders, memoryCache } from "astro/config";
import emdash, { s3 } from "emdash/astro";
import { postgres } from "emdash/db";


if (typeof process.loadEnvFile === "function") {
	try {
		process.loadEnvFile();
	} catch { }
}

export default defineConfig({
	output: "server",
	session: {
		driver: "fs-lite",
		options: { base: "./.astro/session" },
	},
	image: {
		layout: "constrained",
		responsiveStyles: true,
	},
	cache: {
		provider: memoryCache({ max: 500 }),
	},


	integrations: [
		react(),
		emdash({
			database: postgres({
				connectionString: process.env.DATABASE_URL,
				ssl: { rejectUnauthorized: false },
				pool: {
					max: 3,
					min: 0,
				},
			}),
			storage: s3(),
		}),
	],

	fonts: [
		{
			provider: fontProviders.google(),
			name: "Inter",
			cssVariable: "--font-body",
			weights: [400, 500, 600, 700],
			fallbacks: ["sans-serif"],
		},
		{
			provider: fontProviders.google(),
			name: "JetBrains Mono",
			cssVariable: "--font-mono",
			weights: [400, 500],
			fallbacks: ["monospace"],
		},
	],

	devToolbar: { enabled: false },

	adapter: vercel({
		imageService: true,
	}),
});
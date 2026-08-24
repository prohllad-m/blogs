// import node from "@astrojs/node";
import react from "@astrojs/react";
import auditLog from "@emdash-cms/plugin-audit-log";
import { defineConfig, fontProviders, memoryCache } from "astro/config";
import emdash, { s3 } from "emdash/astro";
import { postgres } from "emdash/db";
import node from "@astrojs/node";
// import tailwind from "@astrojs/tailwind";


if (typeof process.loadEnvFile === "function") {
	try {
		process.loadEnvFile();
	} catch { }
}

export default defineConfig({
	outDir: "server",
	output: "server",
	image: {
		layout: "constrained",
		responsiveStyles: true,
	},
	cache: {
		provider: memoryCache({ max: 500 }),
	},


	integrations: [
		react(),
		// tailwind(),
		emdash({
			database: postgres({
				connectionString: process.env.DATABASE_URL,
				ssl: { rejectUnauthorized: false },
				pool: {
					max: 3,
					min: 0,
				},
			}),
			storage: s3({
				endpoint: process.env.S3_ENDPOINT,
				accessKeyId: process.env.S3_ACCESS_KEY_ID,
				secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
				bucket: process.env.S3_BUCKET || "blog",
				region: process.env.S3_REGION || "ap-south-1",
			}),
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

	server: {
		allowedHosts: [
			"localhost"
		],
	},

	adapter: node({
		mode: "standalone"
	})
});
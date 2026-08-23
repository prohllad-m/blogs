import cloudflare from "@astrojs/cloudflare";
import react from "@astrojs/react";
import auditLog from "@emdash-cms/plugin-audit-log";
import { defineConfig, fontProviders } from "astro/config";
import emdash, { s3 } from "emdash/astro";
import { postgres } from "emdash/db";

// if (typeof process.loadEnvFile === "function") {
// 	try {
// 		process.loadEnvFile();
// 	} catch { }
// }

export default defineConfig({
	output: "server",
	adapter: cloudflare({
		platformProxy: { enabled: true },
	}),
	image: {
		layout: "constrained",
		responsiveStyles: true,
	},
	integrations: [
		react(),
		emdash({
			database: postgres({
				connectionString: process.env.DATABASE_URL,
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
			plugins: [auditLog],
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
		allowedHosts: true,
	},
	// 	vite: {
	// 		plugins: [
	// 			{
	// 				// sanitize-html (used by emdash) imports postcss to parse CSS style
	// 				// attributes at runtime. postcss is a Node.js build tool that uses
	// 				// CJS require("fs"/"path"/"url") — which don't exist in Cloudflare
	// 				// Workers. We stub postcss with a no-op so style attributes are
	// 				// simply not CSS-validated (they are still sanitized by attribute
	// 				// allowlists). sanitize-html already warns that style parsing "only
	// 				// works in a node environment" and gracefully catches parse errors.
	// 				name: "stub-postcss-for-cloudflare",
	// 				resolveId(id) {
	// 					if (id === "postcss") return "\0postcss-stub";
	// 				},
	// 				load(id) {
	// 					if (id === "\0postcss-stub") {
	// 						return `export function parse() { return { nodes: [] }; }
	// export default { parse() { return { nodes: [] }; } };`;
	// 					}
	// 				},
	// 			},	
	// 		],
	// 	},
});

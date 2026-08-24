import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import "./after-B1IIdH3Y_B4Q-P28s.mjs";
import "./base64-B-PsqheR_BCqhUefc.mjs";
import "./types-D1iJ3DpO_B-DMySoc.mjs";
import { n as apiSuccess, t as apiError } from "./error-CEGF6UZb_BSWyf8Gu.mjs";
import { t as resolveSecretsCached } from "./secrets-CSwQIl4q_CA0X4cuR.mjs";
import { n as getPublicOrigin } from "./public-url-DSGTnJFw__NsO_zTH.mjs";
import { r as requirePerm } from "./authorize-WxsiePzy_C95XGFDu.mjs";
//#region node_modules/emdash/dist/astro/routes/api/themes/preview.mjs
var preview_exports = /* @__PURE__ */ __exportAll({
	POST: () => POST,
	prerender: () => false
});
var POST = async ({ request, url, locals }) => {
	const { emdash, user } = locals;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	const denied = requirePerm(user, "plugins:read");
	if (denied) return denied;
	const { previewSecret: secret } = await resolveSecretsCached(emdash.db);
	let body;
	try {
		body = await request.json();
	} catch {
		return apiError("INVALID_REQUEST", "Invalid JSON body", 400);
	}
	if (!body.previewUrl || typeof body.previewUrl !== "string") return apiError("INVALID_REQUEST", "previewUrl is required", 400);
	let parsedPreviewUrl;
	try {
		parsedPreviewUrl = new URL(body.previewUrl);
	} catch {
		return apiError("INVALID_REQUEST", "previewUrl must be a valid URL", 400);
	}
	if (parsedPreviewUrl.protocol !== "https:") return apiError("INVALID_REQUEST", "previewUrl must use HTTPS", 400);
	const source = getPublicOrigin(url, emdash?.config);
	const exp = Math.floor(Date.now() / 1e3) + 3600;
	const encoder = new TextEncoder();
	const key = await crypto.subtle.importKey("raw", encoder.encode(secret), {
		name: "HMAC",
		hash: "SHA-256"
	}, false, ["sign"]);
	const buffer = await crypto.subtle.sign("HMAC", key, encoder.encode(`${source}:${exp}`));
	const sig = Array.from(new Uint8Array(buffer), (b) => b.toString(16).padStart(2, "0")).join("");
	const previewUrl = new URL(body.previewUrl);
	previewUrl.searchParams.set("source", source);
	previewUrl.searchParams.set("exp", String(exp));
	previewUrl.searchParams.set("sig", sig);
	return apiSuccess({ url: previewUrl.toString() });
};
//#endregion
//#region \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/themes/preview@_@mjs
var page = () => preview_exports;
//#endregion
export { page };

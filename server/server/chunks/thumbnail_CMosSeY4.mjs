import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import "./base64-B-PsqheR_BCqhUefc.mjs";
import "./types-D1iJ3DpO_B-DMySoc.mjs";
import { t as apiError } from "./error-CEGF6UZb_BSWyf8Gu.mjs";
import { r as requirePerm } from "./authorize-WxsiePzy_C95XGFDu.mjs";
//#region node_modules/emdash/dist/astro/routes/api/admin/themes/marketplace/_id_/thumbnail.mjs
var thumbnail_exports = /* @__PURE__ */ __exportAll({
	GET: () => GET,
	prerender: () => false
});
var GET = async ({ params, url, locals }) => {
	const { emdash, user } = locals;
	const { id } = params;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	const denied = requirePerm(user, "plugins:read");
	if (denied) return denied;
	const marketplaceUrl = emdash.config.marketplace;
	if (!marketplaceUrl || !id) return apiError("NOT_CONFIGURED", "Marketplace not configured", 400);
	const width = url.searchParams.get("w");
	const target = new URL(`/api/v1/themes/${encodeURIComponent(id)}/thumbnail`, marketplaceUrl);
	if (width) target.searchParams.set("w", width);
	try {
		const resp = await fetch(target.href);
		if (!resp.ok) return new Response(resp.body, {
			status: resp.status,
			headers: {
				"Content-Type": resp.headers.get("Content-Type") ?? "application/octet-stream",
				"Cache-Control": "private, no-store"
			}
		});
		return new Response(resp.body, { headers: {
			"Content-Type": resp.headers.get("Content-Type") ?? "image/png",
			"Cache-Control": "private, no-store"
		} });
	} catch {
		return apiError("PROXY_ERROR", "Failed to fetch thumbnail", 502);
	}
};
//#endregion
//#region \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/themes/marketplace/_id_/thumbnail@_@mjs
var page = () => thumbnail_exports;
//#endregion
export { page };

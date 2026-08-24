import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import "./base64-B-PsqheR_BCqhUefc.mjs";
import "./types-D1iJ3DpO_B-DMySoc.mjs";
import "./loader-Be3ouI5L_CXV56CH4.mjs";
import "./media-kIV1IxFf_BRR3CdsF.mjs";
import { pt as searchQuery } from "./relations-5_avdrN__CvbT7cha.mjs";
import "./fts-manager-DzqIBrrW_C8Ds5uQp.mjs";
import { m as hasPermission } from "./dist_Cewgrg50.mjs";
import { n as apiSuccess, r as handleError, t as apiError } from "./error-CEGF6UZb_BSWyf8Gu.mjs";
import { i as parseQuery, t as isParseError } from "./parse-C_-6klII_DXl37F4C.mjs";
import { i as searchWithDb } from "./search-Bff-7jFt_Dr2xnFF5.mjs";
import "./schemas_9zeCee0X.mjs";
//#region node_modules/emdash/dist/astro/routes/api/search/index.mjs
var search_exports = /* @__PURE__ */ __exportAll({
	GET: () => GET,
	prerender: () => false
});
/**
* Search content
*
* Query parameters:
* - q: Search query (required)
* - collections: Comma-separated list of collection slugs (optional, defaults to all)
* - status: Filter by status (optional, defaults to 'published')
* - limit: Maximum results (optional, defaults to 20)
*/
var GET = async ({ url, locals }) => {
	const { emdash, user } = locals;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash not configured", 500);
	const query = parseQuery(url, searchQuery);
	if (isParseError(query)) return query;
	const collections = query.collections ? query.collections.split(",").map((c) => c.trim()) : void 0;
	const status = query.status && query.status !== "published" && hasPermission(user, "content:read_drafts") ? query.status : "published";
	try {
		await emdash.ensureSearchHealthy?.();
		return apiSuccess(await searchWithDb(emdash.db, query.q, {
			collections,
			status,
			locale: query.locale,
			limit: query.limit,
			cursor: query.cursor
		}));
	} catch (error) {
		return handleError(error, "Search failed", "SEARCH_ERROR");
	}
};
//#endregion
//#region \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/search/index@_@mjs
var page = () => search_exports;
//#endregion
export { page };

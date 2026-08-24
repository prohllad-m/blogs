import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import "./base64-B-PsqheR_BCqhUefc.mjs";
import "./types-D1iJ3DpO_B-DMySoc.mjs";
import "./loader-Be3ouI5L_CXV56CH4.mjs";
import "./media-kIV1IxFf_BRR3CdsF.mjs";
import { ht as searchSuggestQuery } from "./relations-5_avdrN__CvbT7cha.mjs";
import "./fts-manager-DzqIBrrW_C8Ds5uQp.mjs";
import { n as apiSuccess, r as handleError, t as apiError } from "./error-CEGF6UZb_BSWyf8Gu.mjs";
import { i as parseQuery, t as isParseError } from "./parse-C_-6klII_DXl37F4C.mjs";
import { n as getSuggestions } from "./search-Bff-7jFt_Dr2xnFF5.mjs";
import "./schemas_9zeCee0X.mjs";
//#region node_modules/emdash/dist/astro/routes/api/search/suggest.mjs
var suggest_exports = /* @__PURE__ */ __exportAll({
	GET: () => GET,
	prerender: () => false
});
/**
* Get search suggestions for autocomplete
*
* Query parameters:
* - q: Partial search query (required)
* - collections: Comma-separated list of collection slugs (optional)
* - limit: Maximum suggestions (optional, defaults to 5)
*/
var GET = async ({ url, locals }) => {
	const { emdash } = locals;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash not configured", 500);
	const query = parseQuery(url, searchSuggestQuery);
	if (isParseError(query)) return query;
	const collections = query.collections ? query.collections.split(",").map((c) => c.trim()) : void 0;
	try {
		await emdash.ensureSearchHealthy?.();
		return apiSuccess({ items: await getSuggestions(emdash.db, query.q, {
			collections,
			locale: query.locale,
			limit: query.limit
		}) });
	} catch (error) {
		return handleError(error, "Failed to get suggestions", "SUGGESTION_ERROR");
	}
};
//#endregion
//#region \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/search/suggest@_@mjs
var page = () => suggest_exports;
//#endregion
export { page };

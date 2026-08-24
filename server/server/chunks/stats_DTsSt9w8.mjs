import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import "./base64-B-PsqheR_BCqhUefc.mjs";
import "./types-D1iJ3DpO_B-DMySoc.mjs";
import "./loader-Be3ouI5L_CXV56CH4.mjs";
import "./fts-manager-DzqIBrrW_C8Ds5uQp.mjs";
import { n as apiSuccess, r as handleError, t as apiError } from "./error-CEGF6UZb_BSWyf8Gu.mjs";
import { t as getSearchStats } from "./search-Bff-7jFt_Dr2xnFF5.mjs";
import { r as requirePerm } from "./authorize-WxsiePzy_C95XGFDu.mjs";
//#region node_modules/emdash/dist/astro/routes/api/search/stats.mjs
var stats_exports = /* @__PURE__ */ __exportAll({
	GET: () => GET,
	prerender: () => false
});
/**
* Get search index statistics
*/
var GET = async ({ locals }) => {
	const { emdash, user } = locals;
	const denied = requirePerm(user, "search:manage");
	if (denied) return denied;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash not configured", 500);
	try {
		return apiSuccess(await getSearchStats(emdash.db));
	} catch (error) {
		return handleError(error, "Failed to get stats", "STATS_ERROR");
	}
};
//#endregion
//#region \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/search/stats@_@mjs
var page = () => stats_exports;
//#endregion
export { page };

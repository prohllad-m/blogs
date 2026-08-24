import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import "./base64-B-PsqheR_BCqhUefc.mjs";
import "./types-D1iJ3DpO_B-DMySoc.mjs";
import "./loader-Be3ouI5L_CXV56CH4.mjs";
import "./media-kIV1IxFf_BRR3CdsF.mjs";
import { ft as searchEnableBody } from "./relations-5_avdrN__CvbT7cha.mjs";
import { t as FTSManager } from "./fts-manager-DzqIBrrW_C8Ds5uQp.mjs";
import { n as apiSuccess, r as handleError, t as apiError } from "./error-CEGF6UZb_BSWyf8Gu.mjs";
import { n as parseBody, t as isParseError } from "./parse-C_-6klII_DXl37F4C.mjs";
import "./search-Bff-7jFt_Dr2xnFF5.mjs";
import "./schemas_9zeCee0X.mjs";
import { r as requirePerm } from "./authorize-WxsiePzy_C95XGFDu.mjs";
//#region node_modules/emdash/dist/astro/routes/api/search/enable.mjs
var enable_exports = /* @__PURE__ */ __exportAll({
	POST: () => POST,
	prerender: () => false
});
/**
* Enable or disable search for a collection
*
* Body:
* - collection: Collection slug (required)
* - enabled: boolean (required)
* - weights: Optional field weights for ranking
*/
var POST = async ({ request, locals }) => {
	const { emdash, user } = locals;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash not configured", 500);
	const denied = requirePerm(user, "search:manage");
	if (denied) return denied;
	const body = await parseBody(request, searchEnableBody);
	if (isParseError(body)) return body;
	const ftsManager = new FTSManager(emdash.db);
	try {
		if (body.enabled) {
			await ftsManager.enableSearch(body.collection, { weights: body.weights });
			const stats = await ftsManager.getIndexStats(body.collection);
			return apiSuccess({
				collection: body.collection,
				enabled: true,
				indexed: stats?.indexed ?? 0
			});
		} else {
			await ftsManager.disableSearch(body.collection);
			return apiSuccess({
				collection: body.collection,
				enabled: false
			});
		}
	} catch (error) {
		return handleError(error, "Failed to update search config", "SEARCH_ERROR");
	}
};
//#endregion
//#region \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/search/enable@_@mjs
var page = () => enable_exports;
//#endregion
export { page };

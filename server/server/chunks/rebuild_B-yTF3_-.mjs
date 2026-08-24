import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import "./base64-B-PsqheR_BCqhUefc.mjs";
import "./types-D1iJ3DpO_B-DMySoc.mjs";
import "./loader-Be3ouI5L_CXV56CH4.mjs";
import "./media-kIV1IxFf_BRR3CdsF.mjs";
import { mt as searchRebuildBody } from "./relations-5_avdrN__CvbT7cha.mjs";
import { t as FTSManager } from "./fts-manager-DzqIBrrW_C8Ds5uQp.mjs";
import { n as apiSuccess, r as handleError, t as apiError } from "./error-CEGF6UZb_BSWyf8Gu.mjs";
import { n as parseBody, t as isParseError } from "./parse-C_-6klII_DXl37F4C.mjs";
import "./search-Bff-7jFt_Dr2xnFF5.mjs";
import "./schemas_9zeCee0X.mjs";
import { r as requirePerm } from "./authorize-WxsiePzy_C95XGFDu.mjs";
//#region node_modules/emdash/dist/astro/routes/api/search/rebuild.mjs
var rebuild_exports = /* @__PURE__ */ __exportAll({
	POST: () => POST,
	prerender: () => false
});
/**
* Rebuild the search index for a collection
*
* Body:
* - collection: Collection slug to rebuild (required)
*/
var POST = async ({ request, locals }) => {
	const { emdash, user } = locals;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash not configured", 500);
	const denied = requirePerm(user, "search:manage");
	if (denied) return denied;
	const body = await parseBody(request, searchRebuildBody);
	if (isParseError(body)) return body;
	const ftsManager = new FTSManager(emdash.db);
	try {
		const config = await ftsManager.getSearchConfig(body.collection);
		if (!config?.enabled) return apiError("SEARCH_NOT_ENABLED", `Search is not enabled for collection "${body.collection}"`, 400);
		const searchableFields = await ftsManager.getSearchableFields(body.collection);
		if (searchableFields.length === 0) return apiError("NO_SEARCHABLE_FIELDS", `No searchable fields defined for collection "${body.collection}"`, 400);
		await ftsManager.rebuildIndex(body.collection, searchableFields, config.weights);
		const stats = await ftsManager.getIndexStats(body.collection);
		return apiSuccess({
			collection: body.collection,
			indexed: stats?.indexed ?? 0
		});
	} catch (error) {
		return handleError(error, "Failed to rebuild index", "REBUILD_ERROR");
	}
};
//#endregion
//#region \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/search/rebuild@_@mjs
var page = () => rebuild_exports;
//#endregion
export { page };

import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import "./base64-B-PsqheR_BCqhUefc.mjs";
import "./types-D1iJ3DpO_B-DMySoc.mjs";
import "./media-kIV1IxFf_BRR3CdsF.mjs";
import { at as notFoundPruneBody, it as notFoundListQuery } from "./relations-5_avdrN__CvbT7cha.mjs";
import "./redirect-CgLPYflR_CplqVHl6.mjs";
import { a as unwrapResult, i as requireDb, r as handleError } from "./error-CEGF6UZb_BSWyf8Gu.mjs";
import { i as parseQuery, n as parseBody, t as isParseError } from "./parse-C_-6klII_DXl37F4C.mjs";
import "./schemas_9zeCee0X.mjs";
import { r as requirePerm } from "./authorize-WxsiePzy_C95XGFDu.mjs";
import { n as handleNotFoundList, r as handleNotFoundPrune, t as handleNotFoundClear } from "./redirects-B7t9bKsL_CV9uFbqj.mjs";
//#region node_modules/emdash/dist/astro/routes/api/redirects/404s/index.mjs
var _404s_exports = /* @__PURE__ */ __exportAll({
	DELETE: () => DELETE,
	GET: () => GET,
	POST: () => POST,
	prerender: () => false
});
var GET = async ({ url, locals }) => {
	const { emdash, user } = locals;
	const dbErr = requireDb(emdash?.db);
	if (dbErr) return dbErr;
	const db = emdash.db;
	const denied = requirePerm(user, "redirects:read");
	if (denied) return denied;
	try {
		const query = parseQuery(url, notFoundListQuery);
		if (isParseError(query)) return query;
		return unwrapResult(await handleNotFoundList(db, query));
	} catch (error) {
		return handleError(error, "Failed to fetch 404 log", "NOT_FOUND_LIST_ERROR");
	}
};
var DELETE = async ({ locals }) => {
	const { emdash, user } = locals;
	const dbErr = requireDb(emdash?.db);
	if (dbErr) return dbErr;
	const db = emdash.db;
	const denied = requirePerm(user, "redirects:manage");
	if (denied) return denied;
	try {
		return unwrapResult(await handleNotFoundClear(db));
	} catch (error) {
		return handleError(error, "Failed to clear 404 log", "NOT_FOUND_CLEAR_ERROR");
	}
};
var POST = async ({ request, locals }) => {
	const { emdash, user } = locals;
	const dbErr = requireDb(emdash?.db);
	if (dbErr) return dbErr;
	const db = emdash.db;
	const denied = requirePerm(user, "redirects:manage");
	if (denied) return denied;
	try {
		const body = await parseBody(request, notFoundPruneBody);
		if (isParseError(body)) return body;
		return unwrapResult(await handleNotFoundPrune(db, body.olderThan));
	} catch (error) {
		return handleError(error, "Failed to prune 404 log", "NOT_FOUND_PRUNE_ERROR");
	}
};
//#endregion
//#region \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/redirects/404s/index@_@mjs
var page = () => _404s_exports;
//#endregion
export { page };

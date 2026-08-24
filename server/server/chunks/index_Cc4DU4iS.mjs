import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import "./base64-B-PsqheR_BCqhUefc.mjs";
import "./types-D1iJ3DpO_B-DMySoc.mjs";
import "./media-kIV1IxFf_BRR3CdsF.mjs";
import { Z as createRedirectBody, ct as redirectsListQuery } from "./relations-5_avdrN__CvbT7cha.mjs";
import "./redirect-CgLPYflR_CplqVHl6.mjs";
import { r as invalidateRedirectCache } from "./cache-CGCd6AVM_NiDm1kDt.mjs";
import { a as unwrapResult, i as requireDb, r as handleError } from "./error-CEGF6UZb_BSWyf8Gu.mjs";
import { i as parseQuery, n as parseBody, t as isParseError } from "./parse-C_-6klII_DXl37F4C.mjs";
import "./schemas_9zeCee0X.mjs";
import { r as requirePerm } from "./authorize-WxsiePzy_C95XGFDu.mjs";
import { a as handleRedirectCreate, c as handleRedirectList } from "./redirects-B7t9bKsL_CV9uFbqj.mjs";
//#region node_modules/emdash/dist/astro/routes/api/redirects/index.mjs
var redirects_exports = /* @__PURE__ */ __exportAll({
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
		const query = parseQuery(url, redirectsListQuery);
		if (isParseError(query)) return query;
		return unwrapResult(await handleRedirectList(db, query));
	} catch (error) {
		return handleError(error, "Failed to fetch redirects", "REDIRECT_LIST_ERROR");
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
		const body = await parseBody(request, createRedirectBody);
		if (isParseError(body)) return body;
		const result = await handleRedirectCreate(db, body);
		invalidateRedirectCache();
		return unwrapResult(result, 201);
	} catch (error) {
		return handleError(error, "Failed to create redirect", "REDIRECT_CREATE_ERROR");
	}
};
//#endregion
//#region \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/redirects/index@_@mjs
var page = () => redirects_exports;
//#endregion
export { page };

import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import "./base64-B-PsqheR_BCqhUefc.mjs";
import "./types-D1iJ3DpO_B-DMySoc.mjs";
import "./media-kIV1IxFf_BRR3CdsF.mjs";
import { ot as notFoundSummaryQuery } from "./relations-5_avdrN__CvbT7cha.mjs";
import "./redirect-CgLPYflR_CplqVHl6.mjs";
import { a as unwrapResult, i as requireDb, r as handleError } from "./error-CEGF6UZb_BSWyf8Gu.mjs";
import { i as parseQuery, t as isParseError } from "./parse-C_-6klII_DXl37F4C.mjs";
import "./schemas_9zeCee0X.mjs";
import { r as requirePerm } from "./authorize-WxsiePzy_C95XGFDu.mjs";
import { i as handleNotFoundSummary } from "./redirects-B7t9bKsL_CV9uFbqj.mjs";
//#region node_modules/emdash/dist/astro/routes/api/redirects/404s/summary.mjs
var summary_exports = /* @__PURE__ */ __exportAll({
	GET: () => GET,
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
		const query = parseQuery(url, notFoundSummaryQuery);
		if (isParseError(query)) return query;
		return unwrapResult(await handleNotFoundSummary(db, query.limit));
	} catch (error) {
		return handleError(error, "Failed to fetch 404 summary", "NOT_FOUND_SUMMARY_ERROR");
	}
};
//#endregion
//#region \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/redirects/404s/summary@_@mjs
var page = () => summary_exports;
//#endregion
export { page };

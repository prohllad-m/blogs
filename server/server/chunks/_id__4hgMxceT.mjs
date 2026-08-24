import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import "./base64-B-PsqheR_BCqhUefc.mjs";
import "./types-D1iJ3DpO_B-DMySoc.mjs";
import "./media-kIV1IxFf_BRR3CdsF.mjs";
import { St as updateRedirectBody } from "./relations-5_avdrN__CvbT7cha.mjs";
import "./redirect-CgLPYflR_CplqVHl6.mjs";
import { r as invalidateRedirectCache } from "./cache-CGCd6AVM_NiDm1kDt.mjs";
import { a as unwrapResult, i as requireDb, r as handleError, t as apiError } from "./error-CEGF6UZb_BSWyf8Gu.mjs";
import { n as parseBody, t as isParseError } from "./parse-C_-6klII_DXl37F4C.mjs";
import "./schemas_9zeCee0X.mjs";
import { r as requirePerm } from "./authorize-WxsiePzy_C95XGFDu.mjs";
import { l as handleRedirectUpdate, o as handleRedirectDelete, s as handleRedirectGet } from "./redirects-B7t9bKsL_CV9uFbqj.mjs";
//#region node_modules/emdash/dist/astro/routes/api/redirects/_id_.mjs
var _id__exports = /* @__PURE__ */ __exportAll({
	DELETE: () => DELETE,
	GET: () => GET,
	PUT: () => PUT,
	prerender: () => false
});
var GET = async ({ params, locals }) => {
	const { emdash, user } = locals;
	const dbErr = requireDb(emdash?.db);
	if (dbErr) return dbErr;
	const db = emdash.db;
	const { id } = params;
	const denied = requirePerm(user, "redirects:read");
	if (denied) return denied;
	if (!id) return apiError("VALIDATION_ERROR", "id is required", 400);
	try {
		return unwrapResult(await handleRedirectGet(db, id));
	} catch (error) {
		return handleError(error, "Failed to fetch redirect", "REDIRECT_GET_ERROR");
	}
};
var PUT = async ({ params, request, locals }) => {
	const { emdash, user } = locals;
	const dbErr = requireDb(emdash?.db);
	if (dbErr) return dbErr;
	const db = emdash.db;
	const { id } = params;
	const denied = requirePerm(user, "redirects:manage");
	if (denied) return denied;
	if (!id) return apiError("VALIDATION_ERROR", "id is required", 400);
	try {
		const body = await parseBody(request, updateRedirectBody);
		if (isParseError(body)) return body;
		const result = await handleRedirectUpdate(db, id, body);
		invalidateRedirectCache();
		return unwrapResult(result);
	} catch (error) {
		return handleError(error, "Failed to update redirect", "REDIRECT_UPDATE_ERROR");
	}
};
var DELETE = async ({ params, locals }) => {
	const { emdash, user } = locals;
	const dbErr = requireDb(emdash?.db);
	if (dbErr) return dbErr;
	const db = emdash.db;
	const { id } = params;
	const denied = requirePerm(user, "redirects:manage");
	if (denied) return denied;
	if (!id) return apiError("VALIDATION_ERROR", "id is required", 400);
	try {
		const result = await handleRedirectDelete(db, id);
		invalidateRedirectCache();
		return unwrapResult(result);
	} catch (error) {
		return handleError(error, "Failed to delete redirect", "REDIRECT_DELETE_ERROR");
	}
};
//#endregion
//#region \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/redirects/_id_@_@mjs
var page = () => _id__exports;
//#endregion
export { page };

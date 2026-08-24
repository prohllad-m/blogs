import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import "./after-B1IIdH3Y_B4Q-P28s.mjs";
import "./object-cache-Bok5j2ae_wXe_7GEG.mjs";
import "./base64-B-PsqheR_BCqhUefc.mjs";
import "./types-D1iJ3DpO_B-DMySoc.mjs";
import "./request-cache-BSUptuJR_CCaufTtE.mjs";
import "./loader-Be3ouI5L_CXV56CH4.mjs";
import "./resolve-Cd9dzclN_C_W0skoc.mjs";
import "./media-kIV1IxFf_BRR3CdsF.mjs";
import { k as bylineUpdateBody } from "./relations-5_avdrN__CvbT7cha.mjs";
import "./byline-registry-BCuOp4UF_EQhUHNLu.mjs";
import "./field-defs-cache-DvmlgP-D_bBrZBINr.mjs";
import { t as BylineRepository } from "./byline-XEjchwzZ_MSMp-1jc.mjs";
import { a as unwrapResult, i as requireDb, n as apiSuccess, r as handleError, t as apiError } from "./error-CEGF6UZb_BSWyf8Gu.mjs";
import { n as parseBody, t as isParseError } from "./parse-C_-6klII_DXl37F4C.mjs";
import "./bylines-czseViYo_BLHCxP7O.mjs";
import "./schemas_9zeCee0X.mjs";
import { r as requirePerm } from "./authorize-WxsiePzy_C95XGFDu.mjs";
import { i as handleBylineUpdate } from "./bylines-BJbT4gKS_BJgCHZWX.mjs";
//#region node_modules/emdash/dist/astro/routes/api/admin/bylines/_id_/index.mjs
var _id__exports = /* @__PURE__ */ __exportAll({
	DELETE: () => DELETE,
	GET: () => GET,
	PUT: () => PUT,
	prerender: () => false
});
var GET = async ({ params, locals }) => {
	const { emdash, user } = locals;
	const denied = requirePerm(user, "bylines:read");
	if (denied) return denied;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	try {
		const byline = await new BylineRepository(emdash.db).findById(params.id);
		if (!byline) return apiError("NOT_FOUND", "Byline not found", 404);
		return apiSuccess(byline);
	} catch (error) {
		return handleError(error, "Failed to get byline", "BYLINE_GET_ERROR");
	}
};
var PUT = async ({ params, request, locals }) => {
	const { emdash, user } = locals;
	const denied = requirePerm(user, "bylines:manage");
	if (denied) return denied;
	const dbErr = requireDb(emdash?.db);
	if (dbErr) return dbErr;
	const body = await parseBody(request, bylineUpdateBody);
	if (isParseError(body)) return body;
	const result = await handleBylineUpdate(emdash.db, params.id, {
		slug: body.slug,
		displayName: body.displayName,
		bio: body.bio ?? null,
		avatarMediaId: body.avatarMediaId ?? null,
		websiteUrl: body.websiteUrl ?? null,
		userId: body.userId ?? null,
		isGuest: body.isGuest,
		customFields: body.customFields
	});
	if (result.success);
	return unwrapResult(result);
};
var DELETE = async ({ params, locals }) => {
	const { emdash, user } = locals;
	const denied = requirePerm(user, "bylines:manage");
	if (denied) return denied;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	try {
		if (!await new BylineRepository(emdash.db).delete(params.id)) return apiError("NOT_FOUND", "Byline not found", 404);
		return apiSuccess({ deleted: true });
	} catch (error) {
		return handleError(error, "Failed to delete byline", "BYLINE_DELETE_ERROR");
	}
};
//#endregion
//#region \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/bylines/_id_/index@_@mjs
var page = () => _id__exports;
//#endregion
export { page };

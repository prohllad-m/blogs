import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import "./base64-B-PsqheR_BCqhUefc.mjs";
import "./types-D1iJ3DpO_B-DMySoc.mjs";
import "./media-kIV1IxFf_BRR3CdsF.mjs";
import { i as bylineFieldUpdateBody } from "./relations-5_avdrN__CvbT7cha.mjs";
import "./byline-registry-BCuOp4UF_EQhUHNLu.mjs";
import { a as unwrapResult, i as requireDb, t as apiError } from "./error-CEGF6UZb_BSWyf8Gu.mjs";
import { n as parseBody, t as isParseError } from "./parse-C_-6klII_DXl37F4C.mjs";
import "./schemas_9zeCee0X.mjs";
import { r as requirePerm } from "./authorize-WxsiePzy_C95XGFDu.mjs";
import { n as handleBylineFieldDelete, o as handleBylineFieldUpdate, r as handleBylineFieldGet } from "./byline-fields-CdU_LTF1_ePBT4u1Y.mjs";
//#region node_modules/emdash/dist/astro/routes/api/admin/byline-fields/_slug_.mjs
var _slug__exports = /* @__PURE__ */ __exportAll({
	DELETE: () => DELETE,
	GET: () => GET,
	PATCH: () => PATCH,
	prerender: () => false
});
var GET = async ({ params, locals }) => {
	const { emdash, user } = locals;
	const denied = requirePerm(user, "schema:read");
	if (denied) return denied;
	const dbErr = requireDb(emdash?.db);
	if (dbErr) return dbErr;
	const slug = params.slug;
	if (!slug) return apiError("MISSING_PARAM", "Field slug is required", 400);
	return unwrapResult(await handleBylineFieldGet(emdash.db, slug));
};
var PATCH = async ({ params, request, locals }) => {
	const { emdash, user } = locals;
	const denied = requirePerm(user, "schema:manage");
	if (denied) return denied;
	const dbErr = requireDb(emdash?.db);
	if (dbErr) return dbErr;
	const slug = params.slug;
	if (!slug) return apiError("MISSING_PARAM", "Field slug is required", 400);
	const body = await parseBody(request, bylineFieldUpdateBody);
	if (isParseError(body)) return body;
	return unwrapResult(await handleBylineFieldUpdate(emdash.db, slug, {
		label: body.label,
		required: body.required,
		translatable: body.translatable,
		validation: body.validation,
		sortOrder: body.sortOrder
	}));
};
var DELETE = async ({ params, locals }) => {
	const { emdash, user } = locals;
	const denied = requirePerm(user, "schema:manage");
	if (denied) return denied;
	const dbErr = requireDb(emdash?.db);
	if (dbErr) return dbErr;
	const slug = params.slug;
	if (!slug) return apiError("MISSING_PARAM", "Field slug is required", 400);
	return unwrapResult(await handleBylineFieldDelete(emdash.db, slug));
};
//#endregion
//#region \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/byline-fields/_slug_@_@mjs
var page = () => _slug__exports;
//#endregion
export { page };

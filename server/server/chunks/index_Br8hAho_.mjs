import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import "./base64-B-PsqheR_BCqhUefc.mjs";
import "./types-D1iJ3DpO_B-DMySoc.mjs";
import "./media-kIV1IxFf_BRR3CdsF.mjs";
import { n as bylineFieldCreateBody } from "./relations-5_avdrN__CvbT7cha.mjs";
import "./byline-registry-BCuOp4UF_EQhUHNLu.mjs";
import { a as unwrapResult, i as requireDb } from "./error-CEGF6UZb_BSWyf8Gu.mjs";
import { n as parseBody, t as isParseError } from "./parse-C_-6klII_DXl37F4C.mjs";
import "./schemas_9zeCee0X.mjs";
import { r as requirePerm } from "./authorize-WxsiePzy_C95XGFDu.mjs";
import { i as handleBylineFieldList, t as handleBylineFieldCreate } from "./byline-fields-CdU_LTF1_ePBT4u1Y.mjs";
//#region node_modules/emdash/dist/astro/routes/api/admin/byline-fields/index.mjs
var byline_fields_exports = /* @__PURE__ */ __exportAll({
	GET: () => GET,
	POST: () => POST,
	prerender: () => false
});
var GET = async ({ locals }) => {
	const { emdash, user } = locals;
	const denied = requirePerm(user, "schema:read");
	if (denied) return denied;
	const dbErr = requireDb(emdash?.db);
	if (dbErr) return dbErr;
	return unwrapResult(await handleBylineFieldList(emdash.db));
};
var POST = async ({ request, locals }) => {
	const { emdash, user } = locals;
	const denied = requirePerm(user, "schema:manage");
	if (denied) return denied;
	const dbErr = requireDb(emdash?.db);
	if (dbErr) return dbErr;
	const body = await parseBody(request, bylineFieldCreateBody);
	if (isParseError(body)) return body;
	return unwrapResult(await handleBylineFieldCreate(emdash.db, {
		slug: body.slug,
		label: body.label,
		type: body.type,
		required: body.required,
		translatable: body.translatable,
		validation: body.validation ?? null,
		sortOrder: body.sortOrder
	}), 201);
};
//#endregion
//#region \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/byline-fields/index@_@mjs
var page = () => byline_fields_exports;
//#endregion
export { page };

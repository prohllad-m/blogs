import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import "./after-B1IIdH3Y_B4Q-P28s.mjs";
import "./object-cache-Bok5j2ae_wXe_7GEG.mjs";
import "./base64-B-PsqheR_BCqhUefc.mjs";
import "./types-D1iJ3DpO_B-DMySoc.mjs";
import "./request-cache-BSUptuJR_CCaufTtE.mjs";
import "./loader-Be3ouI5L_CXV56CH4.mjs";
import "./resolve-Cd9dzclN_C_W0skoc.mjs";
import "./media-kIV1IxFf_BRR3CdsF.mjs";
import { O as bylineTranslationCreateBody } from "./relations-5_avdrN__CvbT7cha.mjs";
import "./byline-registry-BCuOp4UF_EQhUHNLu.mjs";
import "./field-defs-cache-DvmlgP-D_bBrZBINr.mjs";
import { t as BylineRepository } from "./byline-XEjchwzZ_MSMp-1jc.mjs";
import { a as unwrapResult, i as requireDb, r as handleError, t as apiError } from "./error-CEGF6UZb_BSWyf8Gu.mjs";
import { n as parseBody, t as isParseError } from "./parse-C_-6klII_DXl37F4C.mjs";
import "./bylines-czseViYo_BLHCxP7O.mjs";
import "./schemas_9zeCee0X.mjs";
import { r as requirePerm } from "./authorize-WxsiePzy_C95XGFDu.mjs";
import { n as handleBylineCreate, r as handleBylineTranslations } from "./bylines-BJbT4gKS_BJgCHZWX.mjs";
//#region node_modules/emdash/dist/astro/routes/api/admin/bylines/_id_/translations.mjs
var translations_exports = /* @__PURE__ */ __exportAll({
	GET: () => GET,
	POST: () => POST,
	prerender: () => false
});
var GET = async ({ params, locals }) => {
	const { emdash, user } = locals;
	const id = params.id;
	const dbErr = requireDb(emdash?.db);
	if (dbErr) return dbErr;
	const denied = requirePerm(user, "bylines:read");
	if (denied) return denied;
	try {
		return unwrapResult(await handleBylineTranslations(emdash.db, id));
	} catch (error) {
		return handleError(error, "Failed to fetch byline translations", "BYLINE_TRANSLATIONS_ERROR");
	}
};
var POST = async ({ params, request, locals }) => {
	const { emdash, user } = locals;
	const id = params.id;
	const dbErr = requireDb(emdash?.db);
	if (dbErr) return dbErr;
	const denied = requirePerm(user, "bylines:manage");
	if (denied) return denied;
	try {
		const body = await parseBody(request, bylineTranslationCreateBody);
		if (isParseError(body)) return body;
		const source = await new BylineRepository(emdash.db).findById(id);
		if (!source) return apiError("NOT_FOUND", "Byline not found", 404);
		const result = await handleBylineCreate(emdash.db, {
			slug: body.slug ?? source.slug,
			displayName: body.displayName ?? source.displayName,
			bio: body.bio ?? null,
			avatarMediaId: body.avatarMediaId ?? source.avatarMediaId,
			websiteUrl: body.websiteUrl ?? source.websiteUrl,
			userId: null,
			isGuest: source.isGuest,
			locale: body.locale,
			translationOf: id
		});
		if (result.success);
		return unwrapResult(result, 201);
	} catch (error) {
		return handleError(error, "Failed to create byline translation", "BYLINE_TRANSLATION_CREATE_ERROR");
	}
};
//#endregion
//#region \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/bylines/_id_/translations@_@mjs
var page = () => translations_exports;
//#endregion
export { page };

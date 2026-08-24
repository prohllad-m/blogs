import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { o as getI18nConfig } from "./runner-DfnZ5eUr_D0TboABR.mjs";
import "./after-B1IIdH3Y_B4Q-P28s.mjs";
import "./object-cache-Bok5j2ae_wXe_7GEG.mjs";
import "./base64-B-PsqheR_BCqhUefc.mjs";
import "./types-D1iJ3DpO_B-DMySoc.mjs";
import "./request-cache-BSUptuJR_CCaufTtE.mjs";
import "./loader-Be3ouI5L_CXV56CH4.mjs";
import "./resolve-Cd9dzclN_C_W0skoc.mjs";
import "./media-kIV1IxFf_BRR3CdsF.mjs";
import { A as bylinesListQuery, D as bylineCreateBody } from "./relations-5_avdrN__CvbT7cha.mjs";
import "./byline-registry-BCuOp4UF_EQhUHNLu.mjs";
import "./field-defs-cache-DvmlgP-D_bBrZBINr.mjs";
import { t as BylineRepository } from "./byline-XEjchwzZ_MSMp-1jc.mjs";
import { a as unwrapResult, n as apiSuccess, r as handleError, t as apiError } from "./error-CEGF6UZb_BSWyf8Gu.mjs";
import { i as parseQuery, n as parseBody, t as isParseError } from "./parse-C_-6klII_DXl37F4C.mjs";
import "./bylines-czseViYo_BLHCxP7O.mjs";
import "./schemas_9zeCee0X.mjs";
import { r as requirePerm } from "./authorize-WxsiePzy_C95XGFDu.mjs";
import { n as handleBylineCreate } from "./bylines-BJbT4gKS_BJgCHZWX.mjs";
//#region node_modules/emdash/dist/astro/routes/api/admin/bylines/index.mjs
var bylines_exports = /* @__PURE__ */ __exportAll({
	GET: () => GET,
	POST: () => POST,
	prerender: () => false
});
var GET = async ({ url, locals }) => {
	const { emdash, user } = locals;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	const denied = requirePerm(user, "bylines:read");
	if (denied) return denied;
	const query = parseQuery(url, bylinesListQuery);
	if (isParseError(query)) return query;
	const i18n = getI18nConfig();
	if (query.locale && i18n && !i18n.locales.includes(query.locale)) return apiError("VALIDATION_ERROR", `Locale "${query.locale}" is not configured for this site`, 400);
	try {
		return apiSuccess(await new BylineRepository(emdash.db).findMany({
			search: query.search,
			isGuest: query.isGuest,
			userId: query.userId,
			locale: query.locale,
			cursor: query.cursor,
			limit: query.limit
		}));
	} catch (error) {
		return handleError(error, "Failed to list bylines", "BYLINE_LIST_ERROR");
	}
};
var POST = async ({ request, locals }) => {
	const { emdash, user } = locals;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	const denied = requirePerm(user, "bylines:manage");
	if (denied) return denied;
	const body = await parseBody(request, bylineCreateBody);
	if (isParseError(body)) return body;
	try {
		const result = await handleBylineCreate(emdash.db, {
			slug: body.slug,
			displayName: body.displayName,
			bio: body.bio ?? null,
			avatarMediaId: body.avatarMediaId ?? null,
			websiteUrl: body.websiteUrl ?? null,
			userId: body.userId ?? null,
			isGuest: body.isGuest,
			locale: body.locale,
			translationOf: body.translationOf,
			customFields: body.customFields
		});
		if (result.success);
		return unwrapResult(result, 201);
	} catch (error) {
		return handleError(error, "Failed to create byline", "BYLINE_CREATE_ERROR");
	}
};
//#endregion
//#region \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/bylines/index@_@mjs
var page = () => bylines_exports;
//#endregion
export { page };

import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import "./after-B1IIdH3Y_B4Q-P28s.mjs";
import "./object-cache-Bok5j2ae_wXe_7GEG.mjs";
import "./base64-B-PsqheR_BCqhUefc.mjs";
import "./types-D1iJ3DpO_B-DMySoc.mjs";
import { s as localeFilterQuery } from "./media-kIV1IxFf_BRR3CdsF.mjs";
import "./relations-5_avdrN__CvbT7cha.mjs";
import { l as handleMenuTranslations, r as handleMenuGet, t as handleMenuCreate } from "./menus-CZyG6rvx_y54L2Ozg.mjs";
import { a as unwrapResult, i as requireDb, r as handleError } from "./error-CEGF6UZb_BSWyf8Gu.mjs";
import { i as parseQuery, n as parseBody, t as isParseError } from "./parse-C_-6klII_DXl37F4C.mjs";
import "./schemas_9zeCee0X.mjs";
import { r as requirePerm } from "./authorize-WxsiePzy_C95XGFDu.mjs";
import { z } from "zod";
//#region node_modules/emdash/dist/astro/routes/api/menus/_name_/translations.mjs
var translations_exports = /* @__PURE__ */ __exportAll({
	GET: () => GET,
	POST: () => POST,
	prerender: () => false
});
var createTranslationBody = z.object({
	locale: z.string().min(1),
	label: z.string().min(1).optional()
}).meta({ id: "CreateMenuTranslationBody" });
var GET = async ({ params, request, locals }) => {
	const { emdash, user } = locals;
	const name = params.name;
	const dbErr = requireDb(emdash?.db);
	if (dbErr) return dbErr;
	const denied = requirePerm(user, "menus:read");
	if (denied) return denied;
	const localeQ = parseQuery(new URL(request.url), localeFilterQuery);
	if (isParseError(localeQ)) return localeQ;
	try {
		const anchor = await handleMenuGet(emdash.db, name, { locale: localeQ.locale });
		if (!anchor.success) return unwrapResult(anchor);
		return unwrapResult(await handleMenuTranslations(emdash.db, anchor.data.id));
	} catch (error) {
		return handleError(error, "Failed to fetch menu translations", "MENU_TRANSLATIONS_ERROR");
	}
};
var POST = async ({ params, request, locals }) => {
	const { emdash, user } = locals;
	const name = params.name;
	const dbErr = requireDb(emdash?.db);
	if (dbErr) return dbErr;
	const denied = requirePerm(user, "menus:manage");
	if (denied) return denied;
	const localeQ = parseQuery(new URL(request.url), localeFilterQuery);
	if (isParseError(localeQ)) return localeQ;
	try {
		const body = await parseBody(request, createTranslationBody);
		if (isParseError(body)) return body;
		const source = await handleMenuGet(emdash.db, name, { locale: localeQ.locale });
		if (!source.success) return unwrapResult(source);
		return unwrapResult(await handleMenuCreate(emdash.db, {
			name,
			label: body.label ?? source.data.label,
			locale: body.locale,
			translationOf: source.data.id
		}), 201);
	} catch (error) {
		return handleError(error, "Failed to create menu translation", "MENU_TRANSLATION_CREATE_ERROR");
	}
};
//#endregion
//#region \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/menus/_name_/translations@_@mjs
var page = () => translations_exports;
//#endregion
export { page };

import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import "./after-B1IIdH3Y_B4Q-P28s.mjs";
import "./object-cache-Bok5j2ae_wXe_7GEG.mjs";
import "./base64-B-PsqheR_BCqhUefc.mjs";
import "./types-D1iJ3DpO_B-DMySoc.mjs";
import "./taxonomy-DfVooU4W_BOv42Utk.mjs";
import "./request-cache-BSUptuJR_CCaufTtE.mjs";
import "./loader-Be3ouI5L_CXV56CH4.mjs";
import "./resolve-Cd9dzclN_C_W0skoc.mjs";
import { s as localeFilterQuery } from "./media-kIV1IxFf_BRR3CdsF.mjs";
import "./relations-5_avdrN__CvbT7cha.mjs";
import "./taxonomies-DjSKBZpq_OMwze2dv.mjs";
import { a as handleTermGet, r as handleTermCreate, s as handleTermTranslations } from "./taxonomies-Ce49uIzY_W3kbPv94.mjs";
import { a as unwrapResult, i as requireDb, r as handleError, t as apiError } from "./error-CEGF6UZb_BSWyf8Gu.mjs";
import { i as parseQuery, n as parseBody, t as isParseError } from "./parse-C_-6klII_DXl37F4C.mjs";
import "./schemas_9zeCee0X.mjs";
import { r as requirePerm } from "./authorize-WxsiePzy_C95XGFDu.mjs";
import { z } from "zod";
//#region node_modules/emdash/dist/astro/routes/api/taxonomies/_name_/terms/_slug_/translations.mjs
var translations_exports = /* @__PURE__ */ __exportAll({
	GET: () => GET,
	POST: () => POST,
	prerender: () => false
});
var createTermTranslationBody = z.object({
	locale: z.string().min(1),
	label: z.string().min(1).optional(),
	slug: z.string().min(1).optional()
}).meta({ id: "CreateTermTranslationBody" });
var GET = async ({ params, request, locals }) => {
	const { emdash, user } = locals;
	const { name, slug } = params;
	if (!name || !slug) return apiError("VALIDATION_ERROR", "Taxonomy name and slug required", 400);
	const dbErr = requireDb(emdash?.db);
	if (dbErr) return dbErr;
	const denied = requirePerm(user, "taxonomies:read");
	if (denied) return denied;
	const query = parseQuery(new URL(request.url), localeFilterQuery);
	if (isParseError(query)) return query;
	try {
		const anchor = await handleTermGet(emdash.db, name, slug, { locale: query.locale });
		if (!anchor.success) return unwrapResult(anchor);
		return unwrapResult(await handleTermTranslations(emdash.db, anchor.data.term.id));
	} catch (error) {
		return handleError(error, "Failed to list term translations", "TERM_TRANSLATIONS_ERROR");
	}
};
var POST = async ({ params, request, locals }) => {
	const { emdash, user } = locals;
	const { name, slug } = params;
	if (!name || !slug) return apiError("VALIDATION_ERROR", "Taxonomy name and slug required", 400);
	const dbErr = requireDb(emdash?.db);
	if (dbErr) return dbErr;
	const denied = requirePerm(user, "taxonomies:manage");
	if (denied) return denied;
	const query = parseQuery(new URL(request.url), localeFilterQuery);
	if (isParseError(query)) return query;
	try {
		const body = await parseBody(request, createTermTranslationBody);
		if (isParseError(body)) return body;
		const source = await handleTermGet(emdash.db, name, slug, { locale: query.locale });
		if (!source.success) return unwrapResult(source);
		return unwrapResult(await handleTermCreate(emdash.db, name, {
			slug: body.slug ?? source.data.term.slug,
			label: body.label ?? source.data.term.label,
			parentId: source.data.term.parentId,
			description: source.data.term.description,
			locale: body.locale,
			translationOf: source.data.term.id
		}), 201);
	} catch (error) {
		return handleError(error, "Failed to create term translation", "TERM_TRANSLATION_CREATE_ERROR");
	}
};
//#endregion
//#region \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/taxonomies/_name_/terms/_slug_/translations@_@mjs
var page = () => translations_exports;
//#endregion
export { page };

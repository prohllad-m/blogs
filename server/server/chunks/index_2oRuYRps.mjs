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
import { $ as createTaxonomyDefBody } from "./relations-5_avdrN__CvbT7cha.mjs";
import "./taxonomies-DjSKBZpq_OMwze2dv.mjs";
import { n as handleTaxonomyList, t as handleTaxonomyCreate } from "./taxonomies-Ce49uIzY_W3kbPv94.mjs";
import { a as unwrapResult, i as requireDb, r as handleError } from "./error-CEGF6UZb_BSWyf8Gu.mjs";
import { i as parseQuery, n as parseBody, t as isParseError } from "./parse-C_-6klII_DXl37F4C.mjs";
import "./schemas_9zeCee0X.mjs";
import { r as requirePerm } from "./authorize-WxsiePzy_C95XGFDu.mjs";
//#region node_modules/emdash/dist/astro/routes/api/taxonomies/index.mjs
var taxonomies_exports = /* @__PURE__ */ __exportAll({
	GET: () => GET,
	POST: () => POST,
	prerender: () => false
});
/**
* List taxonomy definitions
*/
var GET = async ({ request, locals }) => {
	const { emdash, user } = locals;
	const dbErr = requireDb(emdash?.db);
	if (dbErr) return dbErr;
	const denied = requirePerm(user, "taxonomies:read");
	if (denied) return denied;
	const query = parseQuery(new URL(request.url), localeFilterQuery);
	if (isParseError(query)) return query;
	try {
		return unwrapResult(await handleTaxonomyList(emdash.db, { locale: query.locale }));
	} catch (error) {
		return handleError(error, "Failed to list taxonomies", "TAXONOMY_LIST_ERROR");
	}
};
/**
* Create a custom taxonomy definition
*/
var POST = async ({ request, locals }) => {
	const { emdash, user } = locals;
	const dbErr = requireDb(emdash?.db);
	if (dbErr) return dbErr;
	const denied = requirePerm(user, "taxonomies:manage");
	if (denied) return denied;
	try {
		const body = await parseBody(request, createTaxonomyDefBody);
		if (isParseError(body)) return body;
		return unwrapResult(await handleTaxonomyCreate(emdash.db, body), 201);
	} catch (error) {
		return handleError(error, "Failed to create taxonomy", "TAXONOMY_CREATE_ERROR");
	}
};
//#endregion
//#region \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/taxonomies/index@_@mjs
var page = () => taxonomies_exports;
//#endregion
export { page };

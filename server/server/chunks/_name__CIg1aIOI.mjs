import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import "./after-B1IIdH3Y_B4Q-P28s.mjs";
import "./object-cache-Bok5j2ae_wXe_7GEG.mjs";
import "./base64-B-PsqheR_BCqhUefc.mjs";
import "./types-D1iJ3DpO_B-DMySoc.mjs";
import { s as localeFilterQuery } from "./media-kIV1IxFf_BRR3CdsF.mjs";
import { bt as updateMenuBody } from "./relations-5_avdrN__CvbT7cha.mjs";
import { n as handleMenuDelete, r as handleMenuGet, u as handleMenuUpdate } from "./menus-CZyG6rvx_y54L2Ozg.mjs";
import { a as unwrapResult, r as handleError } from "./error-CEGF6UZb_BSWyf8Gu.mjs";
import { i as parseQuery, n as parseBody, t as isParseError } from "./parse-C_-6klII_DXl37F4C.mjs";
import "./schemas_9zeCee0X.mjs";
import { r as requirePerm } from "./authorize-WxsiePzy_C95XGFDu.mjs";
//#region node_modules/emdash/dist/astro/routes/api/menus/_name_.mjs
var _name__exports = /* @__PURE__ */ __exportAll({
	DELETE: () => DELETE,
	GET: () => GET,
	PUT: () => PUT,
	prerender: () => false
});
var GET = async ({ params, request, locals }) => {
	const { emdash, user } = locals;
	const name = params.name;
	const denied = requirePerm(user, "menus:read");
	if (denied) return denied;
	const query = parseQuery(new URL(request.url), localeFilterQuery);
	if (isParseError(query)) return query;
	try {
		return unwrapResult(await handleMenuGet(emdash.db, name, { locale: query.locale }));
	} catch (error) {
		return handleError(error, "Failed to fetch menu", "MENU_GET_ERROR");
	}
};
var PUT = async ({ params, request, locals }) => {
	const { emdash, user } = locals;
	const name = params.name;
	const denied = requirePerm(user, "menus:manage");
	if (denied) return denied;
	const query = parseQuery(new URL(request.url), localeFilterQuery);
	if (isParseError(query)) return query;
	try {
		const body = await parseBody(request, updateMenuBody);
		if (isParseError(body)) return body;
		return unwrapResult(await handleMenuUpdate(emdash.db, name, {
			...body,
			locale: query.locale
		}));
	} catch (error) {
		return handleError(error, "Failed to update menu", "MENU_UPDATE_ERROR");
	}
};
var DELETE = async ({ params, request, locals }) => {
	const { emdash, user } = locals;
	const name = params.name;
	const denied = requirePerm(user, "menus:manage");
	if (denied) return denied;
	const query = parseQuery(new URL(request.url), localeFilterQuery);
	if (isParseError(query)) return query;
	try {
		return unwrapResult(await handleMenuDelete(emdash.db, name, { locale: query.locale }));
	} catch (error) {
		return handleError(error, "Failed to delete menu", "MENU_DELETE_ERROR");
	}
};
//#endregion
//#region \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/menus/_name_@_@mjs
var page = () => _name__exports;
//#endregion
export { page };

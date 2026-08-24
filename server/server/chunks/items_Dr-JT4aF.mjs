import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import "./after-B1IIdH3Y_B4Q-P28s.mjs";
import "./object-cache-Bok5j2ae_wXe_7GEG.mjs";
import "./base64-B-PsqheR_BCqhUefc.mjs";
import "./types-D1iJ3DpO_B-DMySoc.mjs";
import { s as localeFilterQuery } from "./media-kIV1IxFf_BRR3CdsF.mjs";
import { Y as createMenuItemBody } from "./relations-5_avdrN__CvbT7cha.mjs";
import { i as handleMenuItemCreate } from "./menus-CZyG6rvx_y54L2Ozg.mjs";
import { a as unwrapResult, r as handleError } from "./error-CEGF6UZb_BSWyf8Gu.mjs";
import { i as parseQuery, n as parseBody, t as isParseError } from "./parse-C_-6klII_DXl37F4C.mjs";
import "./schemas_9zeCee0X.mjs";
import { r as requirePerm } from "./authorize-WxsiePzy_C95XGFDu.mjs";
//#region node_modules/emdash/dist/astro/routes/api/menus/_name_/items.mjs
var items_exports = /* @__PURE__ */ __exportAll({
	POST: () => POST,
	prerender: () => false
});
var POST = async ({ params, request, locals }) => {
	const { emdash, user } = locals;
	const name = params.name;
	const denied = requirePerm(user, "menus:manage");
	if (denied) return denied;
	const localeQ = parseQuery(new URL(request.url), localeFilterQuery);
	if (isParseError(localeQ)) return localeQ;
	try {
		const body = await parseBody(request, createMenuItemBody);
		if (isParseError(body)) return body;
		return unwrapResult(await handleMenuItemCreate(emdash.db, name, body, { locale: localeQ.locale }), 201);
	} catch (error) {
		return handleError(error, "Failed to create menu item", "MENU_ITEM_CREATE_ERROR");
	}
};
//#endregion
//#region \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/menus/_name_/items@_@mjs
var page = () => items_exports;
//#endregion
export { page };

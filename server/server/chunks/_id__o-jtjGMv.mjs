import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import "./after-B1IIdH3Y_B4Q-P28s.mjs";
import "./object-cache-Bok5j2ae_wXe_7GEG.mjs";
import "./base64-B-PsqheR_BCqhUefc.mjs";
import "./types-D1iJ3DpO_B-DMySoc.mjs";
import { s as localeFilterQuery } from "./media-kIV1IxFf_BRR3CdsF.mjs";
import { xt as updateMenuItemBody } from "./relations-5_avdrN__CvbT7cha.mjs";
import { a as handleMenuItemDelete, s as handleMenuItemUpdate } from "./menus-CZyG6rvx_y54L2Ozg.mjs";
import { a as unwrapResult, r as handleError, t as apiError } from "./error-CEGF6UZb_BSWyf8Gu.mjs";
import { i as parseQuery, n as parseBody, t as isParseError } from "./parse-C_-6klII_DXl37F4C.mjs";
import "./schemas_9zeCee0X.mjs";
import { r as requirePerm } from "./authorize-WxsiePzy_C95XGFDu.mjs";
//#region node_modules/emdash/dist/astro/routes/api/menus/_name_/items/_id_.mjs
var _id__exports = /* @__PURE__ */ __exportAll({
	DELETE: () => DELETE,
	PUT: () => PUT,
	prerender: () => false
});
var PUT = async ({ params, request, locals }) => {
	const { emdash, user } = locals;
	const name = params.name;
	const itemId = params.id;
	const denied = requirePerm(user, "menus:manage");
	if (denied) return denied;
	if (!itemId) return apiError("VALIDATION_ERROR", "id is required", 400);
	const localeQ = parseQuery(new URL(request.url), localeFilterQuery);
	if (isParseError(localeQ)) return localeQ;
	try {
		const body = await parseBody(request, updateMenuItemBody);
		if (isParseError(body)) return body;
		return unwrapResult(await handleMenuItemUpdate(emdash.db, name, itemId, body, { locale: localeQ.locale }));
	} catch (error) {
		return handleError(error, "Failed to update menu item", "MENU_ITEM_UPDATE_ERROR");
	}
};
var DELETE = async ({ params, request, locals }) => {
	const { emdash, user } = locals;
	const name = params.name;
	const itemId = params.id;
	const denied = requirePerm(user, "menus:manage");
	if (denied) return denied;
	if (!itemId) return apiError("VALIDATION_ERROR", "id is required", 400);
	const localeQ = parseQuery(new URL(request.url), localeFilterQuery);
	if (isParseError(localeQ)) return localeQ;
	try {
		return unwrapResult(await handleMenuItemDelete(emdash.db, name, itemId, { locale: localeQ.locale }));
	} catch (error) {
		return handleError(error, "Failed to delete menu item", "MENU_ITEM_DELETE_ERROR");
	}
};
//#endregion
//#region \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/menus/_name_/items/_id_@_@mjs
var page = () => _id__exports;
//#endregion
export { page };

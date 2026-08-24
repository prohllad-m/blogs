import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import "./after-B1IIdH3Y_B4Q-P28s.mjs";
import "./object-cache-Bok5j2ae_wXe_7GEG.mjs";
import "./base64-B-PsqheR_BCqhUefc.mjs";
import "./types-D1iJ3DpO_B-DMySoc.mjs";
import { s as localeFilterQuery } from "./media-kIV1IxFf_BRR3CdsF.mjs";
import { lt as reorderMenuItemsBody } from "./relations-5_avdrN__CvbT7cha.mjs";
import { o as handleMenuItemReorder } from "./menus-CZyG6rvx_y54L2Ozg.mjs";
import { a as unwrapResult, r as handleError } from "./error-CEGF6UZb_BSWyf8Gu.mjs";
import { i as parseQuery, n as parseBody, t as isParseError } from "./parse-C_-6klII_DXl37F4C.mjs";
import "./schemas_9zeCee0X.mjs";
import { r as requirePerm } from "./authorize-WxsiePzy_C95XGFDu.mjs";
//#region node_modules/emdash/dist/astro/routes/api/menus/_name_/reorder.mjs
var reorder_exports = /* @__PURE__ */ __exportAll({
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
		const body = await parseBody(request, reorderMenuItemsBody);
		if (isParseError(body)) return body;
		return unwrapResult(await handleMenuItemReorder(emdash.db, name, body.items, { locale: localeQ.locale }));
	} catch (error) {
		return handleError(error, "Failed to reorder menu items", "MENU_REORDER_ERROR");
	}
};
//#endregion
//#region \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/menus/_name_/reorder@_@mjs
var page = () => reorder_exports;
//#endregion
export { page };

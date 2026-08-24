import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import "./base64-B-PsqheR_BCqhUefc.mjs";
import "./types-D1iJ3DpO_B-DMySoc.mjs";
import { n as apiSuccess, t as apiError } from "./error-CEGF6UZb_BSWyf8Gu.mjs";
import { r as requirePerm } from "./authorize-WxsiePzy_C95XGFDu.mjs";
//#region node_modules/emdash/dist/astro/routes/api/media/providers/index.mjs
var providers_exports = /* @__PURE__ */ __exportAll({
	GET: () => GET,
	prerender: () => false
});
/**
* List all configured media providers
*/
var GET = async ({ locals }) => {
	const { emdash, user } = locals;
	const denied = requirePerm(user, "media:read");
	if (denied) return denied;
	if (!emdash?.getMediaProviderList) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	return apiSuccess({ items: emdash.getMediaProviderList() });
};
//#endregion
//#region \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/media/providers/index@_@mjs
var page = () => providers_exports;
//#endregion
export { page };

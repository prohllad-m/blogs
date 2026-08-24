import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import "./base64-B-PsqheR_BCqhUefc.mjs";
import "./types-D1iJ3DpO_B-DMySoc.mjs";
import { a as unwrapResult, t as apiError } from "./error-CEGF6UZb_BSWyf8Gu.mjs";
import { r as requirePerm } from "./authorize-WxsiePzy_C95XGFDu.mjs";
//#region node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_/compare.mjs
var compare_exports = /* @__PURE__ */ __exportAll({
	GET: () => GET,
	prerender: () => false
});
var GET = async ({ params, locals }) => {
	const { emdash, user } = locals;
	if (!emdash?.handleContentCompare) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	const denied = requirePerm(user, "content:read_drafts");
	if (denied) return denied;
	const collection = params.collection;
	const id = params.id;
	return unwrapResult(await emdash.handleContentCompare(collection, id));
};
//#endregion
//#region \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_/compare@_@mjs
var page = () => compare_exports;
//#endregion
export { page };

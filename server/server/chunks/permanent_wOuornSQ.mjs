import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import "./base64-B-PsqheR_BCqhUefc.mjs";
import "./types-D1iJ3DpO_B-DMySoc.mjs";
import { a as unwrapResult, t as apiError } from "./error-CEGF6UZb_BSWyf8Gu.mjs";
import { r as requirePerm } from "./authorize-WxsiePzy_C95XGFDu.mjs";
//#region node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_/permanent.mjs
var permanent_exports = /* @__PURE__ */ __exportAll({
	DELETE: () => DELETE,
	prerender: () => false
});
var DELETE = async ({ params, locals, cache }) => {
	const { emdash, user } = locals;
	const collection = params.collection;
	const id = params.id;
	if (!emdash?.handleContentPermanentDelete) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	const denied = requirePerm(user, "content:delete_permanent");
	if (denied) return denied;
	const result = await emdash.handleContentPermanentDelete(collection, id);
	if (!result.success) return unwrapResult(result);
	if (cache?.enabled) await cache.invalidate({ tags: [collection, id] });
	return unwrapResult(result);
};
//#endregion
//#region \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_/permanent@_@mjs
var page = () => permanent_exports;
//#endregion
export { page };

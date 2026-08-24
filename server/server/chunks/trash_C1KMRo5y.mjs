import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import "./base64-B-PsqheR_BCqhUefc.mjs";
import "./types-D1iJ3DpO_B-DMySoc.mjs";
import "./media-kIV1IxFf_BRR3CdsF.mjs";
import { U as contentTrashQuery } from "./relations-5_avdrN__CvbT7cha.mjs";
import { a as unwrapResult, t as apiError } from "./error-CEGF6UZb_BSWyf8Gu.mjs";
import { i as parseQuery, t as isParseError } from "./parse-C_-6klII_DXl37F4C.mjs";
import "./schemas_9zeCee0X.mjs";
import { r as requirePerm } from "./authorize-WxsiePzy_C95XGFDu.mjs";
//#region node_modules/emdash/dist/astro/routes/api/content/_collection_/trash.mjs
var trash_exports = /* @__PURE__ */ __exportAll({
	GET: () => GET,
	prerender: () => false
});
var GET = async ({ params, url, locals }) => {
	const { emdash, user } = locals;
	const collection = params.collection;
	if (!emdash?.handleContentListTrashed) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	const denied = requirePerm(user, "content:read_drafts");
	if (denied) return denied;
	const query = parseQuery(url, contentTrashQuery);
	if (isParseError(query)) return query;
	return unwrapResult(await emdash.handleContentListTrashed(collection, query));
};
//#endregion
//#region \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/content/_collection_/trash@_@mjs
var page = () => trash_exports;
//#endregion
export { page };

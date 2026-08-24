import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import "./base64-B-PsqheR_BCqhUefc.mjs";
import "./types-D1iJ3DpO_B-DMySoc.mjs";
import { a as unwrapResult, t as apiError } from "./error-CEGF6UZb_BSWyf8Gu.mjs";
import { r as requirePerm } from "./authorize-WxsiePzy_C95XGFDu.mjs";
//#region node_modules/emdash/dist/astro/routes/api/revisions/_revisionId_/index.mjs
var _revisionId__exports = /* @__PURE__ */ __exportAll({
	GET: () => GET,
	prerender: () => false
});
var GET = async ({ params, locals }) => {
	const { emdash, user } = locals;
	const revisionId = params.revisionId;
	const denied = requirePerm(user, "content:read_drafts");
	if (denied) return denied;
	if (!emdash?.handleRevisionGet) return apiError("NOT_CONFIGURED", "EmDash not configured", 500);
	return unwrapResult(await emdash.handleRevisionGet(revisionId));
};
//#endregion
//#region \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/revisions/_revisionId_/index@_@mjs
var page = () => _revisionId__exports;
//#endregion
export { page };

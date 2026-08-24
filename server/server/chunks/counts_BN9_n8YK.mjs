import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import "./after-B1IIdH3Y_B4Q-P28s.mjs";
import "./object-cache-Bok5j2ae_wXe_7GEG.mjs";
import "./base64-B-PsqheR_BCqhUefc.mjs";
import "./types-D1iJ3DpO_B-DMySoc.mjs";
import "./comment-DPT0WKyd_BkkyuYSh.mjs";
import { a as unwrapResult, i as requireDb, r as handleError } from "./error-CEGF6UZb_BSWyf8Gu.mjs";
import { r as requirePerm } from "./authorize-WxsiePzy_C95XGFDu.mjs";
import { r as handleCommentCounts } from "./comments-Bz6sCbgD_a9Wp7cyE.mjs";
//#region node_modules/emdash/dist/astro/routes/api/admin/comments/counts.mjs
var counts_exports = /* @__PURE__ */ __exportAll({
	GET: () => GET,
	prerender: () => false
});
var GET = async ({ locals }) => {
	const { emdash, user } = locals;
	const dbErr = requireDb(emdash?.db);
	if (dbErr) return dbErr;
	const denied = requirePerm(user, "comments:moderate");
	if (denied) return denied;
	try {
		return unwrapResult(await handleCommentCounts(emdash.db));
	} catch (error) {
		return handleError(error, "Failed to get comment counts", "COMMENT_COUNTS_ERROR");
	}
};
//#endregion
//#region \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/comments/counts@_@mjs
var page = () => counts_exports;
//#endregion
export { page };

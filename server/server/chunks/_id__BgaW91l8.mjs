import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import "./after-B1IIdH3Y_B4Q-P28s.mjs";
import "./object-cache-Bok5j2ae_wXe_7GEG.mjs";
import "./base64-B-PsqheR_BCqhUefc.mjs";
import "./types-D1iJ3DpO_B-DMySoc.mjs";
import "./comment-DPT0WKyd_BkkyuYSh.mjs";
import { a as unwrapResult, i as requireDb, r as handleError, t as apiError } from "./error-CEGF6UZb_BSWyf8Gu.mjs";
import { r as requirePerm } from "./authorize-WxsiePzy_C95XGFDu.mjs";
import { a as handleCommentGet, i as handleCommentDelete } from "./comments-Bz6sCbgD_a9Wp7cyE.mjs";
//#region node_modules/emdash/dist/astro/routes/api/admin/comments/_id_.mjs
var _id__exports = /* @__PURE__ */ __exportAll({
	DELETE: () => DELETE,
	GET: () => GET,
	prerender: () => false
});
/**
* Get single comment detail (includes moderation_metadata)
*/
var GET = async ({ params, locals }) => {
	const { emdash, user } = locals;
	const { id } = params;
	if (!id) return apiError("VALIDATION_ERROR", "Comment ID required", 400);
	const dbErr = requireDb(emdash?.db);
	if (dbErr) return dbErr;
	const denied = requirePerm(user, "comments:moderate");
	if (denied) return denied;
	try {
		return unwrapResult(await handleCommentGet(emdash.db, id));
	} catch (error) {
		return handleError(error, "Failed to get comment", "COMMENT_GET_ERROR");
	}
};
/**
* Hard delete a comment (ADMIN only)
*/
var DELETE = async ({ params, locals }) => {
	const { emdash, user } = locals;
	const { id } = params;
	if (!id) return apiError("VALIDATION_ERROR", "Comment ID required", 400);
	const dbErr = requireDb(emdash?.db);
	if (dbErr) return dbErr;
	const denied = requirePerm(user, "comments:delete");
	if (denied) return denied;
	try {
		return unwrapResult(await handleCommentDelete(emdash.db, id));
	} catch (error) {
		return handleError(error, "Failed to delete comment", "COMMENT_DELETE_ERROR");
	}
};
//#endregion
//#region \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/comments/_id_@_@mjs
var page = () => _id__exports;
//#endregion
export { page };

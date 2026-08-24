import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import "./after-B1IIdH3Y_B4Q-P28s.mjs";
import "./object-cache-Bok5j2ae_wXe_7GEG.mjs";
import "./base64-B-PsqheR_BCqhUefc.mjs";
import "./types-D1iJ3DpO_B-DMySoc.mjs";
import "./comment-DPT0WKyd_BkkyuYSh.mjs";
import "./media-kIV1IxFf_BRR3CdsF.mjs";
import { P as commentStatusBody } from "./relations-5_avdrN__CvbT7cha.mjs";
import { a as unwrapResult, i as requireDb, n as apiSuccess, r as handleError, t as apiError } from "./error-CEGF6UZb_BSWyf8Gu.mjs";
import { n as parseBody, t as isParseError } from "./parse-C_-6klII_DXl37F4C.mjs";
import "./schemas_9zeCee0X.mjs";
import { r as requirePerm } from "./authorize-WxsiePzy_C95XGFDu.mjs";
import { a as handleCommentGet } from "./comments-Bz6sCbgD_a9Wp7cyE.mjs";
import { t as getSiteBaseUrl } from "./site-url-NGJT6NTU_BPGA4DzO.mjs";
import { i as sendCommentNotification, n as lookupContentAuthor, r as moderateComment } from "./service-DkGTWGIi_BHLskMLf.mjs";
//#region node_modules/emdash/dist/astro/routes/api/admin/comments/_id_/status.mjs
var status_exports = /* @__PURE__ */ __exportAll({
	PUT: () => PUT,
	prerender: () => false
});
var PUT = async ({ params, request, locals }) => {
	const { emdash, user } = locals;
	const { id } = params;
	if (!id) return apiError("VALIDATION_ERROR", "Comment ID required", 400);
	const dbErr = requireDb(emdash?.db);
	if (dbErr) return dbErr;
	const denied = requirePerm(user, "comments:moderate");
	if (denied) return denied;
	try {
		const body = await parseBody(request, commentStatusBody);
		if (isParseError(body)) return body;
		const newStatus = body.status;
		const hookRunner = {
			async runBeforeCreate(event) {
				return emdash.hooks.runCommentBeforeCreate(event);
			},
			async runModerate(event) {
				const result = await emdash.hooks.invokeExclusiveHook("comment:moderate", event);
				if (!result) return {
					status: "pending",
					reason: "No moderator configured"
				};
				if (result.error) return {
					status: "pending",
					reason: "Moderation error"
				};
				return result.result;
			},
			fireAfterCreate(event) {
				emdash.hooks.runCommentAfterCreate(event).catch((err) => console.error("[comments] afterCreate error:", err instanceof Error ? err.message : err));
			},
			fireAfterModerate(event) {
				emdash.hooks.runCommentAfterModerate(event).catch((err) => console.error("[comments] afterModerate error:", err instanceof Error ? err.message : err));
			}
		};
		const existing = await handleCommentGet(emdash.db, id);
		if (!existing.success) return unwrapResult(existing);
		const previousStatus = existing.data.status;
		const updated = await moderateComment(emdash.db, id, newStatus, {
			id: user.id,
			name: user.name ?? null
		}, hookRunner);
		if (!updated) return apiError("NOT_FOUND", "Comment not found", 404);
		if (newStatus === "approved" && previousStatus !== "approved" && emdash.email) try {
			const adminBaseUrl = await getSiteBaseUrl(emdash.db, request);
			const content = await lookupContentAuthor(emdash.db, updated.collection, updated.contentId);
			if (content?.author) await sendCommentNotification({
				email: emdash.email,
				comment: updated,
				contentAuthor: content.author,
				adminBaseUrl
			});
		} catch (err) {
			console.error("[comments] notification error:", err instanceof Error ? err.message : err);
		}
		return apiSuccess(updated);
	} catch (error) {
		return handleError(error, "Failed to update comment status", "COMMENT_STATUS_ERROR");
	}
};
//#endregion
//#region \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/comments/_id_/status@_@mjs
var page = () => status_exports;
//#endregion
export { page };

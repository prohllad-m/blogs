import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import "./base64-B-PsqheR_BCqhUefc.mjs";
import "./types-D1iJ3DpO_B-DMySoc.mjs";
import { n as mapErrorStatus } from "./errors-DtEXIQQV_BEW37qyr.mjs";
import { a as unwrapResult, t as apiError } from "./error-CEGF6UZb_BSWyf8Gu.mjs";
import { n as requireOwnerPerm } from "./authorize-WxsiePzy_C95XGFDu.mjs";
//#region node_modules/emdash/dist/astro/routes/api/revisions/_revisionId_/restore.mjs
var restore_exports = /* @__PURE__ */ __exportAll({
	POST: () => POST,
	prerender: () => false
});
var POST = async ({ params, locals }) => {
	const { emdash, user } = locals;
	const revisionId = params.revisionId;
	if (!emdash?.handleRevisionRestore || !emdash?.handleRevisionGet || !emdash?.handleContentGet) return apiError("NOT_CONFIGURED", "EmDash not configured", 500);
	const revision = await emdash.handleRevisionGet(revisionId);
	if (!revision.success) return apiError(revision.error?.code ?? "UNKNOWN_ERROR", revision.error?.message ?? "Revision not found", mapErrorStatus(revision.error?.code));
	const collection = revision.data?.item?.collection;
	const entryId = revision.data?.item?.entryId;
	if (!collection || !entryId) return apiError("INVALID_REVISION", "Revision is missing collection or entry reference", 400);
	const existing = await emdash.handleContentGet(collection, entryId);
	if (!existing.success) return apiError(existing.error?.code ?? "UNKNOWN_ERROR", existing.error?.message ?? "Content not found", mapErrorStatus(existing.error?.code));
	const denied = requireOwnerPerm(user, existing.data?.item?.authorId ?? "", "content:edit_own", "content:edit_any");
	if (denied) return denied;
	return unwrapResult(await emdash.handleRevisionRestore(revisionId, user.id));
};
//#endregion
//#region \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/revisions/_revisionId_/restore@_@mjs
var page = () => restore_exports;
//#endregion
export { page };
